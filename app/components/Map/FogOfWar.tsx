"use client";

import { memo, useMemo } from "react";
import { IStep } from "@/app/types";

interface FogOfWarProps {
  steps: IStep[];
  mapHeight: number;
  isCompleted: boolean;
}

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

      currentY -= 50;
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
    <>
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(8px, -5px) scale(1.01); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 6px) scale(1.01); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(5px, -3px); }
          66% { transform: translate(-4px, 4px); }
        }
        .float-1 { animation: float1 30s ease-in-out infinite; }
        .float-2 { animation: float2 35s ease-in-out infinite; }
        .float-3 { animation: float3 40s ease-in-out infinite; }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 25 }}
        aria-hidden="true"
      >
        {/* Layer 1: Solid lavender base - main coverage */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent + 2}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent + 2}%)`,
            background: `linear-gradient(
              180deg,
              rgba(185, 175, 220, 1) 0%,
              rgba(190, 180, 225, 1) 30%,
              rgba(195, 185, 228, 0.98) 50%,
              rgba(200, 192, 232, 0.95) 70%,
              rgba(210, 203, 240, 0.85) 85%,
              rgba(225, 220, 250, 0.6) 95%,
              transparent 100%
            )`,
          }}
        />

        {/* Layer 2: Slightly lighter overlay for texture variation */}
        <div
          className="absolute inset-0 float-1"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 6)}%, transparent ${fogStartPercent + 1}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 6)}%, transparent ${fogStartPercent + 1}%)`,
            background: `linear-gradient(
              180deg,
              rgba(200, 192, 235, 0.95) 0%,
              rgba(205, 198, 238, 0.9) 40%,
              rgba(215, 208, 245, 0.8) 70%,
              rgba(230, 225, 252, 0.5) 90%,
              transparent 100%
            )`,
          }}
        />

        {/* Layer 3: Large white cloud forms - creates fluffy volume */}
        <div
          className="absolute inset-0 float-2"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 4)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 4)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 100% 60% at 0% 0%, rgba(255,255,255,0.95) 0%, rgba(245,240,255,0.7) 30%, rgba(220,215,245,0.3) 60%, transparent 85%),
              radial-gradient(ellipse 100% 55% at 50% 5%, rgba(255,255,255,0.9) 0%, rgba(248,245,255,0.65) 30%, rgba(225,220,248,0.25) 60%, transparent 85%),
              radial-gradient(ellipse 100% 58% at 100% 0%, rgba(255,255,255,0.92) 0%, rgba(246,242,255,0.68) 30%, rgba(222,217,246,0.28) 60%, transparent 85%)
            `,
          }}
        />

        {/* Layer 4: Mid-section cloud forms */}
        <div
          className="absolute inset-0 float-3"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 90% 50% at 15% 25%, rgba(255,255,255,0.88) 0%, rgba(250,247,255,0.6) 35%, rgba(230,225,250,0.2) 65%, transparent 90%),
              radial-gradient(ellipse 85% 48% at 60% 30%, rgba(255,255,255,0.85) 0%, rgba(248,245,255,0.55) 35%, rgba(228,223,248,0.18) 65%, transparent 90%),
              radial-gradient(ellipse 95% 52% at 90% 22%, rgba(255,255,255,0.87) 0%, rgba(249,246,255,0.58) 35%, rgba(229,224,249,0.2) 65%, transparent 90%)
            `,
          }}
        />

        {/* Layer 5: Lower cloud forms */}
        <div
          className="absolute inset-0 float-1"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 6)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 6)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 80% 45% at 5% 50%, rgba(255,255,255,0.85) 0%, rgba(248,245,255,0.55) 35%, rgba(225,220,248,0.18) 65%, transparent 90%),
              radial-gradient(ellipse 85% 47% at 40% 55%, rgba(255,255,255,0.82) 0%, rgba(246,243,255,0.52) 35%, rgba(223,218,246,0.15) 65%, transparent 90%),
              radial-gradient(ellipse 78% 43% at 75% 48%, rgba(255,255,255,0.86) 0%, rgba(249,246,255,0.56) 35%, rgba(226,221,249,0.19) 65%, transparent 90%),
              radial-gradient(ellipse 82% 46% at 100% 52%, rgba(255,255,255,0.83) 0%, rgba(247,244,255,0.53) 35%, rgba(224,219,247,0.16) 65%, transparent 90%)
            `,
          }}
        />

        {/* Layer 6: Even lower clouds */}
        <div
          className="absolute inset-0 float-2"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 7)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 7)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 75% 42% at 20% 70%, rgba(255,255,255,0.82) 0%, rgba(246,243,255,0.5) 35%, rgba(222,217,246,0.15) 65%, transparent 90%),
              radial-gradient(ellipse 80% 44% at 55% 75%, rgba(255,255,255,0.8) 0%, rgba(244,241,255,0.48) 35%, rgba(220,215,244,0.13) 65%, transparent 90%),
              radial-gradient(ellipse 72% 40% at 85% 68%, rgba(255,255,255,0.84) 0%, rgba(248,245,255,0.52) 35%, rgba(224,219,248,0.17) 65%, transparent 90%)
            `,
          }}
        />

        {/* Layer 7: Bottom section clouds */}
        <div
          className="absolute inset-0 float-3"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 8)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 8)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 70% 38% at 10% 85%, rgba(255,255,255,0.8) 0%, rgba(245,242,255,0.48) 35%, rgba(220,215,245,0.13) 65%, transparent 90%),
              radial-gradient(ellipse 75% 40% at 45% 88%, rgba(255,255,255,0.78) 0%, rgba(243,240,255,0.46) 35%, rgba(218,213,243,0.11) 65%, transparent 90%),
              radial-gradient(ellipse 68% 36% at 80% 82%, rgba(255,255,255,0.82) 0%, rgba(247,244,255,0.5) 35%, rgba(222,217,247,0.15) 65%, transparent 90%)
            `,
          }}
        />

        {/* Layer 8: Bright highlights - cotton candy tops */}
        <div
          className="absolute inset-0 float-1"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 5)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 40% 25% at 8% 10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 50%, transparent 80%),
              radial-gradient(ellipse 35% 22% at 35% 15%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 50%, transparent 80%),
              radial-gradient(ellipse 38% 24% at 62% 8%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.47) 50%, transparent 80%),
              radial-gradient(ellipse 42% 26% at 88% 12%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.43) 50%, transparent 80%),
              radial-gradient(ellipse 36% 23% at 20% 35%, rgba(255,255,255,0.87) 0%, rgba(255,255,255,0.42) 50%, transparent 80%),
              radial-gradient(ellipse 40% 25% at 50% 32%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 50%, transparent 80%),
              radial-gradient(ellipse 34% 21% at 78% 38%, rgba(255,255,255,0.89) 0%, rgba(255,255,255,0.44) 50%, transparent 80%),
              radial-gradient(ellipse 38% 24% at 12% 55%, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.41) 50%, transparent 80%),
              radial-gradient(ellipse 42% 26% at 42% 58%, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.39) 50%, transparent 80%),
              radial-gradient(ellipse 36% 22% at 70% 52%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.43) 50%, transparent 80%),
              radial-gradient(ellipse 40% 25% at 95% 55%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 50%, transparent 80%),
              radial-gradient(ellipse 35% 22% at 25% 75%, rgba(255,255,255,0.83) 0%, rgba(255,255,255,0.38) 50%, transparent 80%),
              radial-gradient(ellipse 38% 24% at 58% 78%, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.41) 50%, transparent 80%),
              radial-gradient(ellipse 34% 21% at 85% 72%, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.39) 50%, transparent 80%)
            `,
          }}
        />

        {/* Layer 9: Subtle purple shadows for depth */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 4)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 4)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 50% 20% at 25% 20%, rgba(160,150,195,0.35) 0%, transparent 70%),
              radial-gradient(ellipse 55% 22% at 65% 35%, rgba(155,145,190,0.3) 0%, transparent 70%),
              radial-gradient(ellipse 48% 18% at 15% 50%, rgba(162,152,197,0.32) 0%, transparent 70%),
              radial-gradient(ellipse 52% 20% at 50% 55%, rgba(158,148,193,0.28) 0%, transparent 70%),
              radial-gradient(ellipse 45% 17% at 80% 48%, rgba(165,155,200,0.33) 0%, transparent 70%),
              radial-gradient(ellipse 50% 19% at 35% 72%, rgba(160,150,195,0.3) 0%, transparent 70%),
              radial-gradient(ellipse 47% 18% at 70% 75%, rgba(157,147,192,0.27) 0%, transparent 70%)
            `,
          }}
        />

        {/* Layer 10: Pink-lavender warmth tint */}
        <div
          className="absolute inset-0 float-2"
          style={{
            maskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 6)}%, transparent ${fogStartPercent}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${Math.max(0, fogStartPercent - 6)}%, transparent ${fogStartPercent}%)`,
            background: `
              radial-gradient(ellipse 60% 35% at 20% 20%, rgba(255,235,250,0.2) 0%, transparent 70%),
              radial-gradient(ellipse 55% 32% at 70% 35%, rgba(250,238,255,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 50% 28% at 40% 55%, rgba(255,240,252,0.16) 0%, transparent 70%),
              radial-gradient(ellipse 58% 33% at 80% 70%, rgba(252,240,255,0.19) 0%, transparent 70%),
              radial-gradient(ellipse 45% 25% at 15% 80%, rgba(255,238,253,0.15) 0%, transparent 70%)
            `,
          }}
        />

        {/* Layer 11: Soft fluffy edge transition */}
        <div
          className="absolute inset-0 float-3"
          style={{
            maskImage: `linear-gradient(to bottom,
              transparent 0%,
              transparent ${Math.max(0, fogStartPercent - 15)}%,
              black ${Math.max(0, fogStartPercent - 8)}%,
              black ${Math.max(0, fogStartPercent - 3)}%,
              transparent ${fogStartPercent + 2}%
            )`,
            WebkitMaskImage: `linear-gradient(to bottom,
              transparent 0%,
              transparent ${Math.max(0, fogStartPercent - 15)}%,
              black ${Math.max(0, fogStartPercent - 8)}%,
              black ${Math.max(0, fogStartPercent - 3)}%,
              transparent ${fogStartPercent + 2}%
            )`,
            background: `
              radial-gradient(ellipse 30% 80% at 0% 50%, rgba(255,255,255,0.9) 0%, rgba(248,245,255,0.5) 50%, transparent 85%),
              radial-gradient(ellipse 28% 75% at 18% 45%, rgba(255,255,255,0.85) 0%, rgba(245,242,255,0.45) 50%, transparent 85%),
              radial-gradient(ellipse 32% 85% at 35% 55%, rgba(255,255,255,0.88) 0%, rgba(250,248,255,0.48) 50%, transparent 85%),
              radial-gradient(ellipse 26% 70% at 52% 48%, rgba(255,255,255,0.82) 0%, rgba(243,240,255,0.42) 50%, transparent 85%),
              radial-gradient(ellipse 30% 78% at 68% 52%, rgba(255,255,255,0.86) 0%, rgba(247,244,255,0.46) 50%, transparent 85%),
              radial-gradient(ellipse 28% 72% at 85% 47%, rgba(255,255,255,0.84) 0%, rgba(244,241,255,0.44) 50%, transparent 85%),
              radial-gradient(ellipse 25% 68% at 100% 50%, rgba(255,255,255,0.87) 0%, rgba(246,243,255,0.47) 50%, transparent 85%)
            `,
          }}
        />
      </div>
    </>
  );
});

FogOfWar.displayName = "FogOfWar";

export default FogOfWar;
