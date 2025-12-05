"use client";

import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";

interface StatsBlockProps {
  steps: Array<{ completed: boolean }>;
  isAnimating: boolean;
  onCompleteNextStep: () => void;
}

const MapStats = ({
  steps,
  isAnimating,
  onCompleteNextStep,
}: StatsBlockProps) => {
  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="sticky bottom-4 right-4 z-30 float-right">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-3 min-w-[200px] border border-gray-200/50">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Distance</span>
            <span className="text-xs font-semibold text-gray-800">
              31/100 km
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">On track</span>
            <span className="text-xs font-semibold text-green-600">1 day</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-800">
              {completedSteps}/{steps.length} steps
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
        </div>

        <Button
          onClick={onCompleteNextStep}
          disabled={isAnimating}
          className="w-full text-xs py-2 rounded-lg transition-all duration-300 bg-linear-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900"
        >
          {isAnimating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Completing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Complete Next Step
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MapStats;
