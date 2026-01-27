"use client";

import { memo, useRef, useLayoutEffect, useMemo, useEffect, useState, useCallback } from "react";
import { IRouteData, IStep } from "@/app/types";
import { useAppSelector } from "@/app/lib/hooks";
import { User } from "lucide-react";
import Image from "next/image";

interface RouteRendererProps {
  routeData: IRouteData;
  steps: IStep[];
  mapWidth: number;
  mapHeight: number;
}

interface RouteSegmentProps {
  points: { x: number; y: number }[];
  mapHeight: number;
  progress: number;
  isCompleted: boolean;
  isActive: boolean;
  segmentId: string;
  onPathReady?: (path: SVGPathElement, segmentId: string) => void;
}

// Convert points to smooth SVG path using Catmull-Rom splines
function pointsToSmoothPath(
  points: { x: number; y: number }[],
  mapHeight: number
): string {
  if (points.length < 2) return "";

  // Convert Y coordinates (from bottom to top)
  const pts = points.map((p) => ({ x: p.x, y: mapHeight - p.y }));

  if (pts.length === 2) {
    return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;
  }

  let path = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[Math.min(i + 1, pts.length - 1)];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    // Catmull-Rom to Bezier conversion
    const tension = 0.5;
    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 3;
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 3;
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 3;
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 3;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

// Individual route segment with progress animation
const RouteSegment = memo(
  ({ points, mapHeight, progress, isCompleted, isActive, segmentId, onPathReady }: RouteSegmentProps) => {
    const progressPathRef = useRef<SVGPathElement>(null);

    // Build smooth SVG path
    const pathD = useMemo(() => {
      return pointsToSmoothPath(points, mapHeight);
    }, [points, mapHeight]);

    // Notify parent when path is ready (for active segment)
    useLayoutEffect(() => {
      if (isActive && progressPathRef.current && pathD && onPathReady) {
        onPathReady(progressPathRef.current, segmentId);
      }
    }, [isActive, pathD, onPathReady, segmentId]);

    // Apply progress animation using stroke-dashoffset
    useLayoutEffect(() => {
      if (progressPathRef.current && pathD) {
        const path = progressPathRef.current;
        const length = path.getTotalLength();
        const validatedProgress = Math.max(0, Math.min(100, progress));

        path.style.strokeDasharray = `${length} ${length}`;
        const offset = length * (1 - validatedProgress / 100);
        path.style.strokeDashoffset = offset.toString();
        path.style.transition = "stroke-dashoffset 0.5s ease-out";
      }
    }, [progress, pathD]);

    if (!pathD) return null;

    return (
      <g>
        {/* Background dashed line (gray) */}
        <path
          d={pathD}
          fill="none"
          stroke="gray"
          strokeWidth={4}
          strokeDasharray="8 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Progress colored line - no strokeDasharray here, it's set by JS for animation */}
        <path
          ref={progressPathRef}
          d={pathD}
          fill="none"
          stroke={isCompleted ? "#8D5DF8" : "#6d63ff"}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  }
);
RouteSegment.displayName = "RouteSegment";

const STORAGE_KEY = "route_renderer_progress";
const CIRCLE_RADIUS = 16;

const RouteRenderer = ({
  routeData,
  steps,
  mapWidth,
  mapHeight,
}: RouteRendererProps) => {
  const { user } = useAppSelector((state) => state.user);
  const svgRef = useRef<SVGSVGElement>(null);
  const activePathRef = useRef<SVGPathElement | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [svgReady, setSvgReady] = useState(false);
  const previousProgressRef = useRef<number | null>(null);

  // Calculate scale factors if map dimensions differ from base
  const scaleX = mapWidth / routeData.base_width;
  const scaleY = mapHeight / routeData.base_height;

  // Find active route (progress > 0 and < 100)
  const activeRouteInfo = useMemo(() => {
    for (const route of routeData.routes) {
      const step = steps.find((s) => s.index === route.from_step_index);
      if (step && step.user_distance_percent > 0 && step.user_distance_percent < 100 && !step.completed) {
        return {
          segmentId: `route-${route.from_step_index}-${route.to_step_index}`,
          progress: step.user_distance_percent,
          stepIndex: route.from_step_index,
        };
      }
    }
    return null;
  }, [routeData.routes, steps]);

  // Scale and render each route
  const scaledRoutes = useMemo(() => {
    return routeData.routes.map((route) => {
      const step = steps.find((s) => s.index === route.from_step_index);
      const scaledPoints = route.points.map((point) => ({
        x: point.x * scaleX,
        y: point.y * scaleY,
      }));

      const segmentId = `route-${route.from_step_index}-${route.to_step_index}`;
      const isActive = activeRouteInfo?.segmentId === segmentId;

      return {
        ...route,
        scaledPoints,
        progress: step?.user_distance_percent || 0,
        isCompleted: step?.completed || false,
        isActive,
        segmentId,
      };
    });
  }, [routeData.routes, steps, scaleX, scaleY, activeRouteInfo]);

  // Easing function
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  // Get position on path at given progress
  const getPositionOnPath = useCallback((path: SVGPathElement, progress: number) => {
    if (!path || !svgRef.current) return null;
    const totalLength = path.getTotalLength();
    if (totalLength === 0) return null;

    const point = path.getPointAtLength(totalLength * (progress / 100));
    return { x: point.x, y: point.y };
  }, []);

  // Handle path ready callback
  const handlePathReady = useCallback((path: SVGPathElement, segmentId: string) => {
    if (activeRouteInfo?.segmentId === segmentId) {
      activePathRef.current = path;
      setSvgReady(true);
    }
  }, [activeRouteInfo?.segmentId]);

  // Animate avatar from previous to current position
  const animateAvatar = useCallback((fromProgress: number, toProgress: number) => {
    if (!activePathRef.current || !avatarRef.current) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const duration = 1500;
    const startTime = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progressRatio);
      const currentProgress = fromProgress + (toProgress - fromProgress) * easedProgress;

      const position = getPositionOnPath(activePathRef.current!, currentProgress);
      if (position && avatarRef.current) {
        avatarRef.current.style.left = `${position.x}px`;
        avatarRef.current.style.top = `${position.y}px`;
        avatarRef.current.style.opacity = "1";
        avatarRef.current.style.display = "flex";
      }

      if (progressRatio < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        // Store final progress
        if (activeRouteInfo) {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            segmentId: activeRouteInfo.segmentId,
            progress: toProgress,
            timestamp: Date.now(),
          }));
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [getPositionOnPath, activeRouteInfo]);

  // Position avatar (with animation if needed)
  useEffect(() => {
    if (!svgReady || !activeRouteInfo || !activePathRef.current || !avatarRef.current) {
      if (avatarRef.current) {
        avatarRef.current.style.opacity = "0";
        avatarRef.current.style.display = "none";
      }
      return;
    }

    const currentProgress = activeRouteInfo.progress;

    // Check if progress changed while on page (real-time update)
    if (previousProgressRef.current !== null && previousProgressRef.current !== currentProgress) {
      animateAvatar(previousProgressRef.current, currentProgress);
      previousProgressRef.current = currentProgress;
      return;
    }

    // Check sessionStorage for previous progress (page navigation case)
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { segmentId, progress: storedProgress, timestamp } = JSON.parse(stored);

        // Clean up old entries (older than 5 minutes)
        if (Date.now() - timestamp > 5 * 60 * 1000) {
          sessionStorage.removeItem(STORAGE_KEY);
        } else if (segmentId === activeRouteInfo.segmentId && storedProgress !== currentProgress) {
          // Animate from stored progress to current
          animateAvatar(storedProgress, currentProgress);
          previousProgressRef.current = currentProgress;
          return;
        }
      }
    } catch (e) {
      // Ignore parse errors
    }

    // No animation needed, just position immediately
    const position = getPositionOnPath(activePathRef.current, currentProgress);
    if (position && avatarRef.current) {
      avatarRef.current.style.left = `${position.x}px`;
      avatarRef.current.style.top = `${position.y}px`;
      avatarRef.current.style.opacity = "1";
      avatarRef.current.style.display = "flex";
    }

    // Track current progress for real-time updates
    previousProgressRef.current = currentProgress;

    // Store current progress for page navigation
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      segmentId: activeRouteInfo.segmentId,
      progress: currentProgress,
      timestamp: Date.now(),
    }));
  }, [svgReady, activeRouteInfo, getPositionOnPath, animateAvatar]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0" style={{ zIndex: 5 }}>
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        width={mapWidth}
        height={mapHeight}
        style={{ overflow: "visible" }}
      >
        {scaledRoutes.map((route) => (
          <RouteSegment
            key={route.segmentId}
            points={route.scaledPoints}
            mapHeight={mapHeight}
            progress={route.progress}
            isCompleted={route.isCompleted}
            isActive={route.isActive}
            segmentId={route.segmentId}
            onPathReady={handlePathReady}
          />
        ))}
      </svg>

      {/* User Avatar */}
      {activeRouteInfo && (
        <div
          id="user-progress-icon"
          ref={avatarRef}
          className="absolute pr-2 flex items-center gap-2 bg-black/50 rounded-full pointer-events-none"
          style={{
            opacity: 0,
            display: "none",
            transform: `translate(-${CIRCLE_RADIUS}px, -${CIRCLE_RADIUS}px)`,
            willChange: "left, top, opacity",
            zIndex: 20,
          }}
        >
          <div
            className="border-white border-2 shrink-0"
            style={{
              width: CIRCLE_RADIUS * 2,
              height: CIRCLE_RADIUS * 2,
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {user.full_avatar_url ? (
              <Image
                className="w-full h-full rounded-full"
                src={user.full_avatar_url}
                width={30}
                height={30}
                alt="User"
              />
            ) : user.avatar_symbol ? (
              <div
                style={{ backgroundColor: user.avatar_color }}
                className="rounded-full w-full h-full flex items-center justify-center text-sm"
              >
                {user.avatar_symbol}
              </div>
            ) : (
              <div
                style={{ backgroundColor: user.avatar_color || "#6d63ff" }}
                className="rounded-full w-full h-full flex items-center justify-center text-sm"
              >
                <User width={14} />
              </div>
            )}
          </div>
          <span className="text-white text-sm">
            {user.username || user.first_name}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(RouteRenderer);
