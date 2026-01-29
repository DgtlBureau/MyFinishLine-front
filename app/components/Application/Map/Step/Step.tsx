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
  }: StepProps) => {
    const isLast = id === stepsAmount;
    const { user } = useAppSelector((state) => state.user);
    const distanceUnit = getDistanceUnit(user.measure);
    const isMiles = user.measure === "mile";
    const displayUserDistanceReached = isMiles ? userDistanceReachedMile : userDistanceReached;

    const getStepColor = () => {
      if (isNext) {
        return "bg-white text-[#5170D5] border-3 border-[#5170D5]";
      }
      if (completed) {
        return `animate-gradient-shift bg-[length:200%_200%] bg-gradient-to-br from-[#5170D5] via-[#CEE9D8] to-[#5170D5] text-white ${
          isViewed ? "" : "ring-[#BFC0CC] ring-2"
        }`;
      }
      if (isActive) {
        return `animate-gradient-shift bg-[length:200%_200%] bg-gradient-to-br from-[#5170D5] via-[#CEE9D8] to-[#5170D5] text-white ${
          isViewed ? "" : "ring-[#BFC0CC] ring-2"
        }`;
      }
      return "bg-[#F4F4F5] text-[#DADADA]";
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
              className="absolute w-40 h-40 rounded-full -z-10"
              style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.4) 0%, rgba(251,191,36,0.1) 50%, transparent 70%)' }}
            />
            {/* Sunburst rays */}
            <div
              className="absolute w-36 h-36 -z-10 animate-spin-slow opacity-60"
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
              className="absolute w-24 h-24 rounded-full -z-10 blur-sm"
              style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.5) 0%, rgba(251,191,36,0.2) 50%, transparent 70%)' }}
            />
          </>
        )}
        <div className="relative">
          <div
            className={`
            ${getStepColor()}
            rounded-full flex w-20 h-20 items-center justify-center
            font-bold text-5xl
            transition-all duration-300
            ${completed ? "cursor-pointer" : "cursor-default"}
          `}
          >
            {index}
          </div>
          {/* Viewed overlay */}
          {isViewed && (completed || isActive) && (
            <div className="absolute inset-0 rounded-full bg-gray-500/40 pointer-events-none" />
          )}
        </div>

        {(completed || isActive) && (
          <div
            style={
              +x > 336
                ? { right: "100%", transform: "translateX(-8px)" }
                : { left: "100%", transform: "translateX(8px)" }
            }
            className="absolute z-30"
          >
            <div className="relative">
              <div
                className={`
            text-base font-semibold whitespace-nowrap px-6 py-4 rounded-full
            ${
              completed
                ? "bg-gradient-to-r from-[#5170D5] to-[#CEE9D8] text-white"
                : isActive
                  ? "bg-gradient-to-r from-[#5170D5] to-[#CEE9D8] text-white"
                  : "bg-[#F4F4F5] text-[#DADADA]"
            }
            transition-all duration-300
          `}
              >
                {title}
                {!!userDistanceReached && (
                  <div className="text-white/50 text-center">
                    {userDistanceReached} km
                  </div>
                )}
              </div>
              {/* Viewed overlay */}
              {isViewed && (
                <div className="absolute inset-0 rounded-full bg-gray-500/40 pointer-events-none" />
              )}
            </div>
          </div>
        )}

        {isNext && (
          <div
            style={
              +x > 312
                ? { right: "100%", transform: "translateX(-8px)" }
                : { left: "100%", transform: "translateX(8px)" }
            }
            className="absolute z-30"
          >
            <div
              className={`
          text-base font-semibold whitespace-nowrap px-6 py-4 rounded-full bg-gradient-to-r from-[#5170D5] to-[#CEE9D8]
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
                dashness
                color="gray"
                start={"step-" + index}
                end={"step-" + (index + 1)}
                showHead={false}
                strokeWidth={4}
              />
            </div>
            <div className="relative z-20">
              <ProgressArrow
                dashness
                color={completed ? "#5170D5" : "#5170D5"}
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
