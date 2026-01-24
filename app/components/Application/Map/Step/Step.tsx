import Xarrow from "react-xarrows";
import { useLottie } from "lottie-react";
import crown from "./crown.json";
import ProgressArrow from "@/app/components/Shared/ProgressArrow/ProgressArrow";
import { memo } from "react";

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
    isActive = false,
    isNext,
    isViewed,
    x,
    hideArrows = false,
  }: StepProps) => {
    const isLast = id === stepsAmount;

    const options = {
      animationData: crown,
      loop: true,
    };
    const { View } = useLottie(options);

    const getStepColor = () => {
      if (isNext) {
        return "bg-white text-[#A88BFA] border-3 border-[#A88BFA]";
      }
      if (completed) {
        return `bg-[#8D5DF8] text-white outline-2 outline-offset-2 ${
          isViewed ? "outline-[#8D5DF8]" : "outline-white"
        }`;
      }
      if (isActive) {
        return `bg-gradient-to-br bg-[#8D5DF8] text-white outline-2 outline-offset-2  ${
          isViewed ? "outline-[#8D5DF8]" : "outline-white"
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
          <div className="absolute bottom-[25%] w-22 h-22 z-100">{View}</div>
        )}
        <div
          className={`
          ${getStepColor()}
          rounded-full flex w-12 h-12 items-center justify-center
          text-[#5B20B5] font-bold text-3xl
          transition-all duration-300
          ${completed ? "cursor-pointer" : "cursor-default"}
        `}
        >
          {index}
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
              {!!userDistanceReached && (
                <div className="text-white/50 text-center">
                  {userDistanceReached} km
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
                {userDistanceReached} km to reach
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
