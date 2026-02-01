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
  yOffset?: number;
}

interface RouteSegmentProps {
  points: { x: number; y: number }[];
  mapHeight: number;
  progress: number;
  isCompleted: boolean;
  isActive: boolean;
  segmentIndex: number;
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
  ({ points, mapHeight, progress, isCompleted, isActive, segmentIndex }: RouteSegmentProps) => {
    const progressPathRef = useRef<SVGPathElement>(null);
    const glowPathRef = useRef<SVGPathElement>(null);

    // Build smooth SVG path
    const pathD = useMemo(() => {
      return pointsToSmoothPath(points, mapHeight);
    }, [points, mapHeight]);

    // Apply progress animation using stroke-dashoffset
    useLayoutEffect(() => {
      const applyProgress = (pathElement: SVGPathElement | null) => {
        if (pathElement && pathD) {
          const length = pathElement.getTotalLength();
          const validatedProgress = Math.max(0, Math.min(100, progress));

          pathElement.style.strokeDasharray = `${length} ${length}`;
          const offset = length * (1 - validatedProgress / 100);
          pathElement.style.strokeDashoffset = offset.toString();
          pathElement.style.transition = "stroke-dashoffset 0.8s ease-out";
        }
      };

      applyProgress(progressPathRef.current);
      applyProgress(glowPathRef.current);
    }, [progress, pathD]);

    if (!pathD) return null;

    const filterId = `glow-${segmentIndex}`;
    const gradientId = `progress-gradient-${segmentIndex}`;

    return (
      <g>
        {/* Filter for glow effect */}
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Background path - uncompleted (dimmed, dashed) */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pathD}
          fill="none"
          stroke="rgba(139, 92, 246, 0.25)"
          strokeWidth={4}
          strokeDasharray="12 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Progress glow effect (behind the main line) */}
        {(isActive || isCompleted) && (
          <path
            ref={glowPathRef}
            d={pathD}
            fill="none"
            stroke={isCompleted ? "#8B5CF6" : "#06B6D4"}
            strokeWidth={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
            opacity={0.5}
          />
        )}

        {/* Progress colored line - completed/in-progress portion */}
        <path
          ref={progressPathRef}
          d={pathD}
          fill="none"
          stroke={isCompleted ? `url(#${gradientId})` : "#06B6D4"}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Highlight line on top for extra shine */}
        {(isActive || isCompleted) && progress > 0 && (
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: progressPathRef.current ? `${progressPathRef.current.getTotalLength()} ${progressPathRef.current.getTotalLength()}` : undefined,
              strokeDashoffset: progressPathRef.current ? (progressPathRef.current.getTotalLength() * (1 - progress / 100)).toString() : undefined,
            }}
          />
        )}
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
  yOffset = 0,
}: RouteRendererProps) => {
  const { user } = useAppSelector((state) => state.user);
  const svgRef = useRef<SVGSVGElement>(null);
  const activePathRef = useRef<SVGPathElement | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [svgReady, setSvgReady] = useState(false);
  const previousProgressRef = useRef<number | null>(null);

  // Scale factors based on base dimensions (not mapHeight which includes yOffset)
  const scaleX = mapWidth / routeData.base_width;
  const scaleY = mapWidth / routeData.base_width; // uniform scale based on width

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
    return routeData.routes.map((route, index) => {
      // Find the step for this route to get progress info
      const step = steps.find((s) => s.index === route.from_step_index);
      const scaledPoints = route.points.map((point) => ({
        x: point.x * scaleX,
        y: (point.y + yOffset) * scaleY,
      }));

      const segmentId = `route-${route.from_step_index}-${route.to_step_index}`;
      const isActive = activeRouteInfo?.segmentId === segmentId;

      return {
        ...route,
        scaledPoints,
        progress: step?.user_distance_percent || 0,
        isCompleted: step?.completed || false,
        isActive: step?.active || false,
        segmentIndex: index,
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
    <svg
      className="absolute inset-0 pointer-events-none"
      width={mapWidth}
      height={mapHeight}
      style={{ overflow: "visible", zIndex: 5 }}
    >
      {scaledRoutes.map((route) => (
        <RouteSegment
          key={`route-${route.from_step_index}-${route.to_step_index}`}
          points={route.scaledPoints}
          mapHeight={mapHeight}
          progress={route.progress}
          isCompleted={route.isCompleted}
          isActive={route.isActive}
          segmentIndex={route.segmentIndex}
        />
      ))}
    </svg>
  );
};

export default memo(RouteRenderer);
