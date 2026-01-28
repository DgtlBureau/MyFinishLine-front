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
        return "bg-white text-[#A88BFA] border-3 border-[#A88BFA]";
      }
      if (completed) {
        return `bg-[#8D5DF8] text-white ${
          isViewed ? "" : "ring-[#BFC0CC] ring-2"
        }`;
      }
      if (isActive) {
        return `bg-gradient-to-br bg-[#8D5DF8] text-white  ${
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
        <div
          className={`
          ${getStepColor()}
          ${isLast ? "w-16 h-16 ring-4 ring-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.6)]" : "w-12 h-12"}
          rounded-full flex items-center justify-center
          text-[#5B20B5] font-bold text-3xl
          transition-all duration-300
          ${completed ? "cursor-pointer" : "cursor-default"}
        `}
        >
          {isLast ? "🏆" : index}
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
            <div
              className={`
          text-xs font-medium whitespace-nowrap px-4 py-2 rounded-full
          ${
            completed
              ? "bg-[#A88BFA] text-white"
              : isActive
                ? "bg-[#A88BFA] text-white"
                : "bg-[#F4F4F5] text-[#DADADA]"
          }
          transition-all duration-300
        `}
            >
              {title}
              {!!displayUserDistanceReached && (
                <div className="text-white/50 text-center">
                  {displayUserDistanceReached} {distanceUnit}
                </div>
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
          text-xs font-medium whitespace-nowrap px-4 py-2 rounded-full bg-[#A88BFA]
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
                color={completed ? "#8D5DF8" : "#6d63ff"}
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
