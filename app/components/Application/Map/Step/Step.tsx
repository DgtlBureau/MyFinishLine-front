import { CheckIcon } from "lucide-react";
import Xarrow from "react-xarrows";

interface StepProps {
  id: number;
  title: string;
  stepsAmount: number;
  completed: boolean;
  isActive?: boolean;
}

const Step = ({
  id,
  title,
  stepsAmount,
  completed,
  isActive = false,
}: StepProps) => {
  const getStepColor = () => {
    if (isActive) {
      return "bg-gradient-to-br from-blue-500 to-purple-600 ring-4 ring-blue-300/50";
    }
    if (completed) {
      return "bg-gradient-to-br from-green-500 to-emerald-600 ring-2 ring-green-300/30";
    }
    return "bg-gradient-to-br from-gray-300 to-gray-400 ring-2 ring-gray-200/20";
  };

  return (
    <div id={`step-${id}`} className="relative">
      {isActive && (
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-30" />
      )}

      <div
        className={`
          ${getStepColor()}
          rounded-full flex w-12 h-12 text-sm items-center justify-center
          text-white font-bold shadow-xl
          transition-all duration-300
          ${completed ? "cursor-pointer hover:scale-110" : "cursor-default"}
        `}
      >
        {id}
      </div>

      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
        <div
          className={`
          text-xs font-medium whitespace-nowrap px-2 py-1 rounded
          ${
            isActive
              ? "bg-blue-100 text-blue-800"
              : completed
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }
          transition-all duration-300
        `}
        >
          {title}
        </div>
      </div>

      {completed && !isActive && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow">
          <CheckIcon className="w-3 h-3 text-white" />
        </div>
      )}
      {id + 1 <= stepsAmount && (
        <Xarrow
          dashness
          color="white"
          start={"step-" + id}
          end={"step-" + (id + 1)}
          showHead={false}
        />
      )}
    </div>
  );
};

export default Step;
