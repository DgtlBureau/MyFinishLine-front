import Xarrow, { Xwrapper } from "react-xarrows";
import { useLottie } from "lottie-react";
import crown from "./crown.json";
import ProgressArrow from "@/app/components/Shared/ProgressArrow/ProgressArrow";

interface StepProps {
  id: number;
  title: string;
  stepsAmount: number;
  completed: boolean;
  isActive?: boolean;
  progress: number;
}

const Step = ({
  id,
  title,
  stepsAmount,
  completed,
  progress,
  isActive = false,
}: StepProps) => {
  const isLast = id === stepsAmount;

  const options = {
    animationData: crown,
    loop: true,
  };
  const { View } = useLottie(options);

  const getStepColor = () => {
    if (completed) {
      return "bg-gradient-to-br from-green-500 to-emerald-600 ring-2 ring-green-300/30";
    }
    if (isActive) {
      return "bg-gradient-to-br from-blue-500 to-purple-600 ring-4 ring-blue-300/50";
    }
    return "bg-gradient-to-br from-gray-300 to-gray-400 ring-2 ring-gray-200/20";
  };

  return (
    <div
      id={`step-${id}`}
      className="relative flex items-center justify-center"
    >
      {isLast && (
        <div className="absolute bottom-[25%] w-22 h-22 z-100">{View}</div>
      )}
      {!completed && isActive && (
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-30" />
      )}

      <div
        className={`
          ${getStepColor()}
          rounded-full flex w-12 h-12 text-sm items-center justify-center
          text-white font-bold shadow-xl
          transition-all duration-300
          ${completed ? "cursor-pointer" : "cursor-default"}
        `}
      >
        {id}
      </div>

      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
        <div
          className={`
          text-xs font-medium whitespace-nowrap px-2 py-1 rounded
          ${
            completed
              ? "bg-green-100 text-green-400"
              : isActive
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-600"
          }
          transition-all duration-300
        `}
        >
          {title}
        </div>
      </div>

      {id + 1 <= stepsAmount && (
        <>
          <div className="relative z-10">
            <Xarrow
              dashness
              color="gray"
              start={"step-" + id}
              end={"step-" + (id + 1)}
              showHead={false}
              strokeWidth={4}
            />
          </div>
          <div className="relative z-20">
            <ProgressArrow
              dashness
              color={completed ? "oklch(72.3% 0.219 149.579)" : "#6d63ff"}
              start={"step-" + id}
              end={"step-" + (id + 1)}
              showHead={false}
              progress={progress}
              strokeWidth={4}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Step;
