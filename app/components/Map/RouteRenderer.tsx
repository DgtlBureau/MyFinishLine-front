"use client";

import { memo, useRef, useLayoutEffect, useMemo, useEffect, useState, useCallback } from "react";
import { IRouteData, IStep } from "@/app/types";
import { useAppSelector } from "@/app/lib/hooks";
import { User } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/app/hooks/useIsMobile";

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
  isMobile: boolean;
  scale: number;
  yOffset: number;
}

// Generate curved path between two points with S-curve
function generateCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  segmentIndex: number,
  curveIntensity: number = 0.25
): { x: number; y: number }[] {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 50) {
    // Too short, don't add curves
    return [start, end];
  }

  // Normal vector (perpendicular to the line)
  const nx = -dy / distance;
  const ny = dx / distance;

  // Offset for curve - alternate direction based on segment index
  const direction = segmentIndex % 2 === 0 ? 1 : -1;
  const offset = distance * curveIntensity * direction;

  // Intermediate points at 33% and 66% of the path
  const p1 = {
    x: start.x + dx * 0.33 + nx * offset,
    y: start.y + dy * 0.33 + ny * offset,
  };
  const p2 = {
    x: start.x + dx * 0.66 - nx * offset,
    y: start.y + dy * 0.66 - ny * offset,
  };

  return [start, p1, p2, end];
}

// Convert points to smooth SVG path using Catmull-Rom splines
function pointsToSmoothPath(
  points: { x: number; y: number }[],
  mapHeight: number,
  scale: number,
  offset: number = 0
): string {
  if (points.length < 2) return "";

  // Convert Y coordinates (from bottom to top) - no scaling, viewBox handles it
  // This matches the admin panel implementation exactly
  const pts = points.map((p) => ({
    x: p.x,
    y: mapHeight - p.y
  }));

  if (pts.length === 2) {
    // Simple line for 2 points - but this shouldn't happen anymore
    // as we generate curved paths
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
  ({ points, mapHeight, progress, isCompleted, isActive, segmentIndex, isMobile, scale, yOffset }: RouteSegmentProps) => {
    const progressPathRef = useRef<SVGPathElement>(null);
    const glowPathRef = useRef<SVGPathElement>(null);

    // Build smooth SVG path
    const pathD = useMemo(() => {
      return pointsToSmoothPath(points, mapHeight, 1, 0);
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

    // Mobile: use thinner strokes and disable heavy blur filters
    const backgroundStrokeWidth = isMobile ? 4 : 6;
    const dashedStrokeWidth = isMobile ? 3 : 4;
    const glowStrokeWidth = isMobile ? 8 : 12;
    const progressStrokeWidth = isMobile ? 4 : 5;
    const highlightStrokeWidth = isMobile ? 1.5 : 2;

    return (
      <g>
        {/* Filter for glow effect - simplified on mobile */}
        <defs>
          {!isMobile && (
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Background path - uncompleted (dashed gray) */}
        <path
          d={pathD}
          fill="none"
          stroke="#9ca3af"
          strokeWidth={backgroundStrokeWidth}
          strokeDasharray="8 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Progress glow effect (behind the main line) - skip filter on mobile */}
        {(isActive || isCompleted) && (
          <path
            ref={glowPathRef}
            d={pathD}
            fill="none"
            stroke={isCompleted ? "#8B5CF6" : "#06B6D4"}
            strokeWidth={glowStrokeWidth}
            strokeDasharray="8 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={isMobile ? undefined : `url(#${filterId})`}
            opacity={0.5}
          />
        )}

        {/* Progress colored line - completed/in-progress portion (dashed) */}
        <path
          ref={progressPathRef}
          d={pathD}
          fill="none"
          stroke={isCompleted ? `url(#${gradientId})` : "#06B6D4"}
          strokeWidth={progressStrokeWidth}
          strokeDasharray="8 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Highlight line on top for extra shine */}
        {(isActive || isCompleted) && progress > 0 && (
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={highlightStrokeWidth}
            strokeDasharray="8 4"
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
  const isMobile = useIsMobile();
  const { user } = useAppSelector((state) => state.user);
  const svgRef = useRef<SVGSVGElement>(null);
  const activePathRef = useRef<SVGPathElement | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [svgReady, setSvgReady] = useState(false);
  const previousProgressRef = useRef<number | null>(null);

  // Scale factors based on base dimensions
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
    return routeData.routes.map((route, index) => {
      // Find the step for this route to get progress info
      const step = steps.find((s) => s.index === route.from_step_index);

      // Keep original points (scaling will happen in pointsToSmoothPath)
      let scaledPoints = route.points.map((point) => ({
        x: point.x,
        y: point.y,
      }));

      // If only 2 points, generate curved path
      if (scaledPoints.length === 2) {
        scaledPoints = generateCurvedPath(
          scaledPoints[0],
          scaledPoints[1],
          index, // use index to alternate curve direction
          0.2 // curve intensity
        );
      }

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
  }, [routeData.routes, steps, scaleX, scaleY, yOffset, activeRouteInfo]);

  // Easing function
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  // Get position on path at given progress
  const getPositionOnPath = useCallback((path: SVGPathElement, progress: number) => {
    if (!path || !svgRef.current) return null;
    const totalLength = path.getTotalLength();
    if (totalLength === 0) return null;

    const point = path.getPointAtLength(totalLength * (progress / 100));
    // Scale from viewBox coordinates to actual pixel coordinates
    return { x: point.x * scaleX, y: point.y * scaleY };
  }, [scaleX, scaleY]);

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
    <>
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        viewBox={`0 0 ${routeData.base_width} ${routeData.base_height}`}
        preserveAspectRatio="none"
        style={{ overflow: "visible", zIndex: 5 }}
      >
        {scaledRoutes.map((route) => {
          const segmentId = `route-${route.from_step_index}-${route.to_step_index}`;
          return (
            <RouteSegment
              key={segmentId}
              points={route.scaledPoints}
              mapHeight={routeData.base_height}
              progress={route.progress}
              isCompleted={route.isCompleted}
              isActive={route.isActive}
              segmentIndex={route.segmentIndex}
              isMobile={isMobile}
              scale={1}
              yOffset={0}
            />
          );
        })}

        {/* Hidden path for position calculation */}
        {activeRouteInfo && scaledRoutes.map((route) => {
          const segmentId = `route-${route.from_step_index}-${route.to_step_index}`;
          if (segmentId !== activeRouteInfo.segmentId) return null;
          const pathD = pointsToSmoothPath(route.scaledPoints, routeData.base_height, 1, 0);
          return (
            <path
              key={`hidden-${segmentId}`}
              ref={(el) => {
                if (el) handlePathReady(el, segmentId);
              }}
              d={pathD}
              fill="none"
              stroke="transparent"
              strokeWidth={0}
              pointerEvents="none"
            />
          );
        })}
      </svg>

      {/* User Avatar */}
      {activeRouteInfo && (
        <div
          ref={avatarRef}
          id="user-progress-icon"
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            transform: "translate(-50%, -50%)",
            zIndex: 30,
            opacity: 0,
            display: "none",
          }}
        >
          <div className="relative">
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75" style={{ width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2 }} />

            {/* Avatar container */}
            <div
              className="relative bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-white"
              style={{ width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2 }}
            >
              {user?.full_avatar_url ? (
                <Image
                  src={user.full_avatar_url}
                  alt="User avatar"
                  width={CIRCLE_RADIUS * 2 - 4}
                  height={CIRCLE_RADIUS * 2 - 4}
                  className="rounded-full object-cover"
                />
              ) : (
                <User size={CIRCLE_RADIUS} className="text-white" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(RouteRenderer);
