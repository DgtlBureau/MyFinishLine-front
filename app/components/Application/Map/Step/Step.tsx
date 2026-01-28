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
          <div className="absolute bottom-[25%] w-22 h-22 z-100">{View}</div>
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
