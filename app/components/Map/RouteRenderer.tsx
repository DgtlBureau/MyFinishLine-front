"use client";

import { memo, useRef, useLayoutEffect, useMemo } from "react";
import { IRouteData, IStep, IRoutePoint } from "@/app/types";

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

const RouteRenderer = ({
  routeData,
  steps,
  mapWidth,
  mapHeight,
}: RouteRendererProps) => {
  // Calculate scale factors if map dimensions differ from base
  const scaleX = mapWidth / routeData.base_width;
  const scaleY = mapHeight / routeData.base_height;

  // Scale and render each route
  const scaledRoutes = useMemo(() => {
    return routeData.routes.map((route, index) => {
      // Find the step for this route to get progress info
      const step = steps.find((s) => s.index === route.from_step_index);

      // Scale points
      const scaledPoints = route.points.map((point) => ({
        x: point.x * scaleX,
        y: point.y * scaleY,
      }));

      return {
        ...route,
        scaledPoints,
        progress: step?.user_distance_percent || 0,
        isCompleted: step?.completed || false,
        isActive: step?.active || false,
        segmentIndex: index,
      };
    });
  }, [routeData.routes, steps, scaleX, scaleY]);

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
