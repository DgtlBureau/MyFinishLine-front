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
  ({ points, mapHeight, progress, isCompleted }: RouteSegmentProps) => {
    const progressPathRef = useRef<SVGPathElement>(null);

    // Build smooth SVG path
    const pathD = useMemo(() => {
      return pointsToSmoothPath(points, mapHeight);
    }, [points, mapHeight]);

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
    return routeData.routes.map((route) => {
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
        />
      ))}
    </svg>
  );
};

export default memo(RouteRenderer);
