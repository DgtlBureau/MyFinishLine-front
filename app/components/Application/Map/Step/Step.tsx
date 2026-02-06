import Xarrow from "react-xarrows";
import ProgressArrow from "@/app/components/Shared/ProgressArrow/ProgressArrow";
import { memo } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { getDistanceUnit } from "@/app/lib/utils/convertData";

interface StepProps {
  id: number;
  title: string;
  stepsAmount: number;
  completed: boolean;
  isActive?: boolean;
  progress: number;
  distance: string;
  isNext: boolean;
  userDistance: number;
  distanceLeft: number | null;
  userDistanceReached: number;
  isViewed: boolean;
  x: string;
  index: number;
  hideArrows?: boolean;
  userDistanceReachedMile?: number;
  storiesCount?: number;
}

const Step = memo(
  ({
    id,
    index,
    title,
    stepsAmount,
    completed,
    progress,
    userDistanceReached,
    userDistanceReachedMile,
    isActive = false,
    isNext,
    isViewed,
    x,
    hideArrows = false,
    storiesCount = 0,
  }: StepProps) => {
    const isLast = id === stepsAmount;
    const { user } = useAppSelector((state) => state.user);
    const distanceUnit = getDistanceUnit(user.measure);
    const isMiles = user.measure === "mile";
    const displayUserDistanceReached = isMiles
      ? (userDistanceReachedMile ?? (userDistanceReached * 0.621371))
      : userDistanceReached;

    const getStepColor = () => {
      if (completed) {
        return `bg-gradient-to-br from-[#3B5CC6] to-[#4DA67A] text-white border-[3px] border-white/60 shadow-lg shadow-black/30 ${
          isViewed ? "" : "ring-[#BFC0CC] ring-2"
        }`;
      }
      if (isActive) {
        return `bg-gradient-to-br from-[#3B5CC6] to-[#4DA67A] text-white border-[3px] border-white/60 shadow-lg shadow-black/30 ${
          isViewed ? "" : "ring-[#BFC0CC] ring-2"
        }`;
      }
      if (isNext) {
        return "bg-white/30 text-white border-2 border-white/50 shadow-lg shadow-black/20";
      }
      return "bg-white/20 text-white/40 border-2 border-white/30 shadow-md shadow-black/15";
    };

    return (
      <div
        id={`step-${index}`}
        className="relative flex items-center z-20 justify-center"
      >
        {isLast && (
          <>
            {/* Outer soft glow */}
            <div
              className="absolute w-20 h-20 rounded-full -z-10"
              style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.4) 0%, rgba(251,191,36,0.1) 50%, transparent 70%)' }}
            />
            {/* Sunburst rays */}
            <div
              className="absolute w-16 h-16 -z-10 animate-spin-slow opacity-60"
              style={{
                background: `conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(251, 191, 36, 0.4) 5deg,
                  transparent 10deg,
                  transparent 15deg,
                  rgba(251, 191, 36, 0.3) 20deg,
                  transparent 25deg,
                  transparent 30deg,
                  rgba(251, 191, 36, 0.4) 35deg,
                  transparent 40deg,
                  transparent 45deg,
                  rgba(251, 191, 36, 0.3) 50deg,
                  transparent 55deg,
                  transparent 60deg,
                  rgba(251, 191, 36, 0.4) 65deg,
                  transparent 70deg,
                  transparent 75deg,
                  rgba(251, 191, 36, 0.3) 80deg,
                  transparent 85deg,
                  transparent 90deg,
                  rgba(251, 191, 36, 0.4) 95deg,
                  transparent 100deg,
                  transparent 105deg,
                  rgba(251, 191, 36, 0.3) 110deg,
                  transparent 115deg,
                  transparent 120deg,
                  rgba(251, 191, 36, 0.4) 125deg,
                  transparent 130deg,
                  transparent 135deg,
                  rgba(251, 191, 36, 0.3) 140deg,
                  transparent 145deg,
                  transparent 150deg,
                  rgba(251, 191, 36, 0.4) 155deg,
                  transparent 160deg,
                  transparent 165deg,
                  rgba(251, 191, 36, 0.3) 170deg,
                  transparent 175deg,
                  transparent 180deg,
                  rgba(251, 191, 36, 0.4) 185deg,
                  transparent 190deg,
                  transparent 195deg,
                  rgba(251, 191, 36, 0.3) 200deg,
                  transparent 205deg,
                  transparent 210deg,
                  rgba(251, 191, 36, 0.4) 215deg,
                  transparent 220deg,
                  transparent 225deg,
                  rgba(251, 191, 36, 0.3) 230deg,
                  transparent 235deg,
                  transparent 240deg,
                  rgba(251, 191, 36, 0.4) 245deg,
                  transparent 250deg,
                  transparent 255deg,
                  rgba(251, 191, 36, 0.3) 260deg,
                  transparent 265deg,
                  transparent 270deg,
                  rgba(251, 191, 36, 0.4) 275deg,
                  transparent 280deg,
                  transparent 285deg,
                  rgba(251, 191, 36, 0.3) 290deg,
                  transparent 295deg,
                  transparent 300deg,
                  rgba(251, 191, 36, 0.4) 305deg,
                  transparent 310deg,
                  transparent 315deg,
                  rgba(251, 191, 36, 0.3) 320deg,
                  transparent 325deg,
                  transparent 330deg,
                  rgba(251, 191, 36, 0.4) 335deg,
                  transparent 340deg,
                  transparent 345deg,
                  rgba(251, 191, 36, 0.3) 350deg,
                  transparent 355deg,
                  transparent 360deg
                )`,
                maskImage: 'radial-gradient(circle, transparent 25%, black 35%, black 70%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 25%, black 35%, black 70%, transparent 80%)',
              }}
            />
            {/* Inner warm glow */}
            <div
              className="absolute w-12 h-12 rounded-full -z-10 blur-sm"
              style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.5) 0%, rgba(251,191,36,0.2) 50%, transparent 70%)' }}
            />
          </>
        )}

        {/* Story indicators - Telegram-style ring with segments */}
        {storiesCount > 0 && (completed || isActive) && (
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ transform: 'rotate(-90deg)' }}
              viewBox="0 0 80 80"
            >
              <defs>
                {/* Gradient for unviewed stories */}
                <linearGradient id="story-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#0099ff" />
                  <stop offset="100%" stopColor="#0066ff" />
                </linearGradient>
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {Array.from({ length: storiesCount }).map((_, i) => {
                const circumference = 2 * Math.PI * 35; // radius = 35
                const segmentLength = (circumference / storiesCount) - 2; // -2 for gap
                const offset = (circumference / storiesCount) * i;

                return (
                  <circle
                    key={i}
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke={isViewed ? "#9ca3af" : "url(#story-gradient)"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                    strokeDashoffset={-offset}
                    opacity={isViewed ? "0.5" : "1"}
                    filter={isViewed ? "none" : "url(#glow)"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>
        )}

        <div className="relative">
          <div
            className={`
            ${getStepColor()}
            rounded-full flex w-14 h-14 items-center justify-center
            font-bold text-lg
            transition-all duration-300
            ${completed ? "cursor-pointer" : "cursor-default"}
          `}
          >
            {index > 0 && index}
            {/* Inner highlight for 3D effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" style={{ height: '50%' }} />
          </div>
          {/* Viewed overlay */}
          {isViewed && (completed || isActive) && (
            <div className="absolute inset-0 rounded-full bg-gray-500/40 pointer-events-none" />
          )}
        </div>

        {(completed || index === 0) && (
          <div
            style={
              +x > 336
                ? { right: "100%", transform: "translateX(-4px)" }
                : { left: "100%", transform: "translateX(4px)" }
            }
            className="absolute z-30"
          >
            <div className="relative">
              <div
                className={`
            text-sm font-semibold whitespace-nowrap px-4 py-2 rounded-full
            ${
              completed
                ? "bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white"
                : isActive
                  ? "bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white"
                  : "bg-white/10 text-white/30"
            }
            transition-all duration-300
          `}
              >
                {title}
              </div>
              {/* Viewed overlay */}
              {isViewed && (
                <div className="absolute inset-0 rounded-full bg-gray-500/40 pointer-events-none" />
              )}
            </div>
          </div>
        )}

        {(isNext || isActive) && index > 0 && (
          <div
            style={
              +x > 336
                ? { right: "100%", transform: "translateX(-4px)" }
                : { left: "100%", transform: "translateX(4px)" }
            }
            className="absolute z-30"
          >
            <div
              className={`
          text-sm font-semibold whitespace-nowrap px-4 py-2 rounded-full bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A]
        `}
            >
              <div className="text-white">
                {displayUserDistanceReached?.toFixed(2)} {distanceUnit} to reach
              </div>
            </div>
          </div>
        )}

        {!hideArrows && index + 1 <= stepsAmount && (
          <>
            <div className="relative z-10">
              <Xarrow
                color="gray"
                start={"step-" + index}
                end={"step-" + (index + 1)}
                showHead={false}
                strokeWidth={4}
              />
            </div>
            <div className="relative z-20">
              <ProgressArrow
                color={completed ? "#3B5CC6" : "#3B5CC6"}
                start={"step-" + index}
                end={"step-" + (index + 1)}
                showHead={false}
                progress={progress}
                strokeWidth={4}
              />
            </div>
          </>
        )}
      </div>
    );
  },
);

export default Step;
