"use client";

import { memo, useMemo } from "react";
import { IStep } from "@/app/types";

interface FogOfWarProps {
  steps: IStep[];
  mapHeight: number;
  isCompleted: boolean;
}

/**
 * Optimized fog of war overlay
 * Uses CSS gradients (GPU-accelerated)
 * Mystical effect without heavy blur filters
 */
const FogOfWar = memo(({ steps, mapHeight, isCompleted }: FogOfWarProps) => {
  const fogPosition = useMemo(() => {
    const sortedSteps = [...steps].sort((a, b) => a.index - b.index);

    if (isCompleted) {
      return sortedSteps.length > 0
        ? Number(sortedSteps[sortedSteps.length - 1].y_coordinate) + 200
        : mapHeight;
    }

    const activeStep = sortedSteps.find((s) => s.active);
    const nextStep = sortedSteps.find((s) => s.next);

    let currentY: number;

    if (activeStep) {
      const activeY = Number(activeStep.y_coordinate);
      const progress = activeStep.user_distance_percent || 0;
      currentY = activeY;

      if (nextStep && progress > 0) {
        const nextY = Number(nextStep.y_coordinate);
        currentY = activeY + ((nextY - activeY) * progress) / 100;
      }

      // Negative buffer - fog closer to user
      currentY -= 20;
    } else {
      const firstIncomplete = sortedSteps.find((s) => !s.completed);
      if (firstIncomplete) {
        currentY = Number(firstIncomplete.y_coordinate);
      } else {
        return sortedSteps.length > 0
          ? Number(sortedSteps[sortedSteps.length - 1].y_coordinate) + 200
          : mapHeight;
      }
    }

    return currentY;
  }, [steps, mapHeight, isCompleted]);

  const fogStartFromTop = mapHeight - fogPosition;
  const fogStartPercent = Math.max(0, Math.min(100, (fogStartFromTop / mapHeight) * 100));

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 25 }}
      aria-hidden="true"
    >
      {/* Main fog gradient - smooth rounded edge */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgb(15, 23, 42) 0%,
            rgb(15, 23, 42) ${Math.max(0, fogStartPercent - 12)}%,
            rgba(20, 30, 47, 0.97) ${Math.max(0, fogStartPercent - 10)}%,
            rgba(25, 35, 52, 0.9) ${Math.max(0, fogStartPercent - 8)}%,
            rgba(35, 45, 62, 0.75) ${Math.max(0, fogStartPercent - 6)}%,
            rgba(45, 55, 72, 0.5) ${Math.max(0, fogStartPercent - 4)}%,
            rgba(55, 65, 82, 0.25) ${Math.max(0, fogStartPercent - 2)}%,
            rgba(65, 75, 92, 0.1) ${Math.max(0, fogStartPercent - 1)}%,
            transparent ${fogStartPercent}%,
            transparent 100%
          )`,
        }}
      />

      {/* Cloud layer - visible inside fog area */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 3)}%, transparent ${fogStartPercent}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 3)}%, transparent ${fogStartPercent}%)`,
          background: `
            radial-gradient(ellipse 200px 80px at 10% 15%, rgba(100, 116, 139, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 250px 100px at 50% 25%, rgba(100, 116, 139, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 180px 70px at 85% 20%, rgba(100, 116, 139, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 220px 90px at 25% 40%, rgba(100, 116, 139, 0.35) 0%, transparent 60%),
            radial-gradient(ellipse 200px 80px at 70% 45%, rgba(100, 116, 139, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 160px 60px at 40% 60%, rgba(100, 116, 139, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse 190px 75px at 80% 70%, rgba(100, 116, 139, 0.35) 0%, transparent 60%)
          `,
        }}
      />

      {/* Stars layer */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent}%)`,
          background: `
            radial-gradient(circle 3px at 8% 12%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
            radial-gradient(circle 2px at 22% 8%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
            radial-gradient(circle 3px at 35% 18%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
            radial-gradient(circle 2px at 48% 6%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
            radial-gradient(circle 4px at 62% 14%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
            radial-gradient(circle 2px at 75% 10%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
            radial-gradient(circle 3px at 88% 16%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
            radial-gradient(circle 2px at 15% 28%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
            radial-gradient(circle 3px at 42% 32%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
            radial-gradient(circle 2px at 68% 26%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
            radial-gradient(circle 4px at 92% 30%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
            radial-gradient(circle 2px at 5% 45%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
            radial-gradient(circle 3px at 30% 48%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
            radial-gradient(circle 2px at 55% 42%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
            radial-gradient(circle 3px at 78% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 100%)
          `,
        }}
      />

    </div>
  );
});

FogOfWar.displayName = "FogOfWar";

export default FogOfWar;
