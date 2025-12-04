"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { AnimatePresence } from "motion/react";
import AwardModal from "./AwardModal/AwardModal";

const challenge = {
  steps: [
    {
      id: 1,
      title: "Welcome to the MyFinishLine!",
      description: "Start your adventure here",
      index: 1,
      completed: true,
      progress: 1,
      x: 50,
      y: 90,
    },
    {
      id: 2,
      title: "First Victory",
      description: "Complete your first workout",
      index: 1,
      completed: false,
      progress: 0,
      x: 25,
      y: 75,
    },
    {
      id: 3,
      title: "Almost there!",
      description: "Halfway through the challenge",
      index: 1,
      completed: false,
      progress: 0,
      x: 80,
      y: 55,
    },
    {
      id: 4,
      title: "Champion's Path",
      description: "Complete 75% of the challenge",
      index: 1,
      completed: false,
      progress: 0,
      x: 30,
      y: 40,
    },
    {
      id: 5,
      title: "Best of the BEST!",
      description: "Final stretch of your journey",
      index: 2,
      completed: false,
      progress: 0,
      x: 70,
      y: 20,
    },
    {
      id: 6,
      title: "My Finish Line",
      description: "Complete the challenge",
      index: 2,
      completed: false,
      progress: 0,
      x: 20,
      y: 10,
    },
  ],
};

interface Step {
  id: number;
  title: string;
  description: string;
  index: number;
  completed: boolean;
  progress: number;
  x: number;
  y: number;
}

const Map = () => {
  const [currentChallenge, setCurrentChallenge] = useState(challenge);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAwardOpen, setisAwardOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = currentChallenge.steps;
  const stepsAmount = steps.length;
  console.log(isAwardOpen);
  const handleGoToNextStep = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    const nextStepIndex = currentChallenge.steps.findIndex(
      (step) => !step.completed
    );

    if (nextStepIndex !== -1) {
      setCurrentChallenge((prev) => {
        const updatedSteps = [...prev.steps];
        if (updatedSteps[nextStepIndex]) {
          updatedSteps[nextStepIndex] = {
            ...updatedSteps[nextStepIndex],
            completed: true,
            progress: 1,
          };
        }
        return { ...prev, steps: updatedSteps };
      });

      setSelectedStep(currentChallenge.steps[nextStepIndex].id);
    }

    setTimeout(() => setIsAnimating(false), 1000);
    setisAwardOpen(true);
  };

  const handleStepClick = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (step && step.completed) {
      setSelectedStep(selectedStep === stepId ? null : stepId);
    }
  };

  return (
    <>
      <main
        ref={containerRef}
        className="relative max-w-3xl mx-auto w-full h-full min-h-0 overflow-hidden rounded-2xl shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/application/map.png"
            fill
            alt="Map"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 to-purple-900/10" />
        </div>

        <div className="relative z-20 w-full h-full p-4">
          <div className="relative w-full h-full">
            {currentChallenge.steps.map((step) => (
              <div
                key={step.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${step.x}%`,
                  top: `${step.y}%`,
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                    <div className="font-semibold">{step.title}</div>
                    {step.completed && (
                      <div className="text-gray-300 text-[10px]">
                        {step.description}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45" />
                </div>

                <div
                  className="group cursor-pointer"
                  onClick={() => handleStepClick(step.id)}
                >
                  <Step
                    id={step.id}
                    title={step.title}
                    stepsAmount={stepsAmount}
                    completed={step.completed}
                    isActive={selectedStep === step.id}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-4 bottom-4 z-30">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-3 min-w-[200px]">
            <div className="mb-3">
              <div className="flex justify-between items-center">
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
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1"></div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (steps.filter((s) => s.completed).length / steps.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <Button
              onClick={handleGoToNextStep}
              disabled={isAnimating}
              className="w-full text-xs py-2 rounded-lg transition-all duration-300"
            >
              {isAnimating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Completing...
                </span>
              ) : (
                "Complete Next Step"
              )}
            </Button>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isAwardOpen && (
          <AwardModal onCloseClick={() => setisAwardOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Map;
