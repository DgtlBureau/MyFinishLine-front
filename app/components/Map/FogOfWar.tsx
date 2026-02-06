"use client";

import { memo, useMemo } from "react";
import { IStep } from "@/app/types";

interface FogOfWarProps {
  steps: IStep[];
  mapHeight: number;
  isCompleted: boolean;
  yOffset?: number;
}

const FogOfWar = memo(({ steps, mapHeight, isCompleted, yOffset = 0 }: FogOfWarProps) => {
  // Detect challenge direction early so it's available in useMemo
  const sortedForDir = [...steps].sort((a, b) => a.index - b.index);
  const goesUpward = sortedForDir.length >= 2
    ? Number(sortedForDir[sortedForDir.length - 1].y_coordinate) > Number(sortedForDir[0].y_coordinate)
    : true;
  const fogPosition = useMemo(() => {
    const sortedSteps = [...steps].sort((a, b) => a.index - b.index);

    if (isCompleted) {
      return sortedSteps.length > 0
        ? Number(sortedSteps[sortedSteps.length - 1].y_coordinate) + yOffset + 200
        : mapHeight;
    }

    const activeStep = sortedSteps.find((s) => s.active);
    const nextStep = sortedSteps.find((s) => s.next);

    let currentY: number;

    if (activeStep) {
      const activeY = Number(activeStep.y_coordinate) + yOffset;
      const progress = activeStep.user_distance_percent || 0;
      currentY = activeY;

      if (nextStep && progress > 0) {
        const nextY = Number(nextStep.y_coordinate) + yOffset;
        currentY = activeY + ((nextY - activeY) * progress) / 100;
      }

      currentY -= 50;
    } else {
      const firstIncomplete = sortedSteps.find((s) => !s.completed);
      if (firstIncomplete) {
        currentY = Number(firstIncomplete.y_coordinate) + yOffset;
      } else {
        return sortedSteps.length > 0
          ? Number(sortedSteps[sortedSteps.length - 1].y_coordinate) + yOffset + 200
          : mapHeight;
      }
    }

    return currentY;
  }, [steps, mapHeight, isCompleted, yOffset]);

  // fogPosition = y coordinate from bottom of the active step
  // Convert to percentage from top where the fog edge is
  const fogEdgeFromTop = Math.max(0, Math.min(100, ((mapHeight - fogPosition) / mapHeight) * 100));
  // For upward challenges: fog covers top (0%) → fogEdgeFromTop%
  // For downward challenges: fog covers fogEdgeFromTop% → bottom (100%)
  const fogStartPercent = fogEdgeFromTop;

  // Helper: generates mask gradient based on direction
  const fogMask = (offsetBefore: number, offsetAfter: number) => {
    if (goesUpward) {
      return `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - offsetBefore)}%, transparent ${fogStartPercent + offsetAfter}%)`;
    }
    return `linear-gradient(to bottom, transparent ${Math.max(0, fogStartPercent - offsetAfter)}%, black ${fogStartPercent + offsetBefore}%, black 100%)`;
  };

  const dir = goesUpward ? '180deg' : '0deg';

  // Edge transition mask for the fluffy border
  const edgeMask = goesUpward
    ? `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, fogStartPercent - 15)}%, black ${Math.max(0, fogStartPercent - 8)}%, black ${Math.max(0, fogStartPercent - 3)}%, transparent ${fogStartPercent + 2}%)`
    : `linear-gradient(to bottom, transparent ${Math.max(0, fogStartPercent - 2)}%, black ${fogStartPercent + 3}%, black ${fogStartPercent + 8}%, transparent ${Math.min(100, fogStartPercent + 15)}%, transparent 100%)`;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 25 }}
      aria-hidden="true"
    >
      {/* Layer 1: Solid lavender base with purple shadows merged - DEBUG: increased opacity */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: fogMask(5, 2),
          WebkitMaskImage: fogMask(5, 2),
          background: `
            linear-gradient(
              ${dir},
              rgba(185, 175, 220, 1) 0%,
              rgba(192, 183, 228, 1) 40%,
              rgba(200, 192, 232, 1) 65%,
              rgba(210, 203, 240, 0.95) 82%,
              rgba(225, 220, 250, 0.8) 93%,
              rgba(235, 230, 255, 0.5) 100%
            ),
            radial-gradient(ellipse 50% 20% at 25% 20%, rgba(160,150,195,0.5) 0%, transparent 70%),
            radial-gradient(ellipse 55% 22% at 65% 35%, rgba(155,145,190,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 52% 20% at 50% 55%, rgba(158,148,193,0.42) 0%, transparent 70%)
          `,
        }}
      />

      {/* Layer 2: Cloud volume — white highlights + warmth tint merged */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: fogMask(5, 0),
          WebkitMaskImage: fogMask(5, 0),
          background: `
            radial-gradient(ellipse 100% 60% at 0% 0%, rgba(255,255,255,0.9) 0%, rgba(245,240,255,0.6) 35%, transparent 75%),
            radial-gradient(ellipse 100% 55% at 50% 5%, rgba(255,255,255,0.85) 0%, rgba(248,245,255,0.55) 35%, transparent 75%),
            radial-gradient(ellipse 100% 58% at 100% 0%, rgba(255,255,255,0.88) 0%, rgba(246,242,255,0.58) 35%, transparent 75%),
            radial-gradient(ellipse 85% 48% at 30% 35%, rgba(255,255,255,0.8) 0%, rgba(248,245,255,0.45) 40%, transparent 80%),
            radial-gradient(ellipse 80% 45% at 70% 50%, rgba(255,255,255,0.8) 0%, rgba(248,245,255,0.45) 40%, transparent 80%),
            radial-gradient(ellipse 75% 42% at 20% 70%, rgba(255,255,255,0.75) 0%, rgba(246,243,255,0.4) 40%, transparent 80%),
            radial-gradient(ellipse 75% 40% at 55% 80%, rgba(255,255,255,0.72) 0%, rgba(244,241,255,0.38) 40%, transparent 80%),
            radial-gradient(ellipse 60% 35% at 20% 20%, rgba(255,235,250,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 55% 32% at 70% 50%, rgba(250,238,255,0.16) 0%, transparent 70%)
          `,
        }}
      />

      {/* Layer 3: Soft fluffy edge transition */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
          background: `
            radial-gradient(ellipse 30% 80% at 0% 50%, rgba(255,255,255,0.9) 0%, rgba(248,245,255,0.5) 50%, transparent 85%),
            radial-gradient(ellipse 32% 85% at 35% 55%, rgba(255,255,255,0.88) 0%, rgba(250,248,255,0.48) 50%, transparent 85%),
            radial-gradient(ellipse 30% 78% at 68% 52%, rgba(255,255,255,0.86) 0%, rgba(247,244,255,0.46) 50%, transparent 85%),
            radial-gradient(ellipse 25% 68% at 100% 50%, rgba(255,255,255,0.87) 0%, rgba(246,243,255,0.47) 50%, transparent 85%)
          `,
        }}
      />
    </div>
  );
});

FogOfWar.displayName = "FogOfWar";

export default FogOfWar;
