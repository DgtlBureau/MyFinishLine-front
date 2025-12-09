"use client";

import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface StatsBlockProps {
  steps: Array<{ completed: boolean }>;
  isAnimating: boolean;
  onCompleteNextStep: () => void;
}

const animationVariants = {
  expanded: {
    padding: 8,
  },
  collapsed: {
    padding: 0,
  },
};

const contentVariants = {
  expanded: {
    opacity: 1,
    width: "auto",
    height: "auto",
    scale: 1,
  },
  collapsed: {
    opacity: 0,
    width: 0,
    height: 0,
    scale: 0,
  },
};

const buttonVariants = {
  expanded: {
    transform: "rotate(180deg)",
  },
  collapsed: {
    transform: "rotate(0deg)",
  },
};

const MapStats = ({
  steps,
  isAnimating,
  onCompleteNextStep,
}: StatsBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleToggleIsExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <motion.div className="sticky bottom-4 right-4 z-30 float-right">
      <motion.div
        variants={animationVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-3 border border-gray-200/50 overflow-hidden"
      >
        <motion.div variants={contentVariants}>
          <motion.div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">
                Distance
              </span>
              <span className="text-xs font-semibold text-gray-800">
                31/100 km
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">
                On track
              </span>
              <span className="text-xs font-semibold text-green-600">
                1 day
              </span>
            </div>
          </motion.div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600">
                Progress
              </span>
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
        </motion.div>

        <div className="flex gap-1 w-fit">
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              variants={contentVariants}
            >
              <Button
                onClick={onCompleteNextStep}
                disabled={isAnimating}
                className="text-xs py-2 rounded-lg transition-all duration-300 bg-linear-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900"
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
                    Complete Step
                  </span>
                )}
              </Button>
            </motion.div>
          )}
          <button
            className="bg-linear-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 p-1.5 rounded-lg mr-0 ml-auto"
            onClick={handleToggleIsExpanded}
          >
            <motion.div variants={buttonVariants}>
              <ArrowUp color="#fff" />
            </motion.div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MapStats;
