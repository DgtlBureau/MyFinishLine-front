"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import { useState, useRef, useLayoutEffect } from "react";
import { AnimatePresence } from "motion/react";
import AwardModal from "./AwardModal/AwardModal";
import { Xwrapper } from "react-xarrows";
import StoryModal from "../Shared/StoryList/StoryList";
import { IActiveChallenge, IStep } from "@/app/types";
import MapStats from "./MapStats/MapStats";
import { Crosshair } from "lucide-react";
import { motion } from "motion/react";

const Map = ({
  background_images,
  steps,
  total_distance,
  activate_date,
  user_distance,
  is_completed,
}: IActiveChallenge) => {
  const [activeStep, setActiveStep] = useState<IStep | null>(null);
  const [isAwardOpen, setIsAwardOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const backgroundListRef = useRef<HTMLUListElement>(null);

  const stepsAmount = steps.length;

  const handleScrollToActiveStep = () => {
    const activeStep = steps.find((step) => step.active);
    if (activeStep) {
      const element = document.getElementById("step-" + activeStep.index);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    } else {
      const element = document.getElementById("step-" + steps.length);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  useLayoutEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };

    const hasActiveStep = steps.some((step) => step.active && !step.completed);
    const isAllCompleted = is_completed;

    if (hasActiveStep || isAllCompleted) {
      timer = setTimeout(handleScrollToActiveStep, 100);
    } else {
      timer = setTimeout(scrollToBottom, 100);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [steps]);

  // const handleGoToNextStep = () => {
  //   if (isAnimating) return;
  //   setIsAnimating(true);

  //   const currentStepIndex = steps.findIndex(
  //     (step) => step.active && !step.completed
  //   );
  //   const nextStepIndex = steps.findIndex(
  //     (step) => !step.active && !step.completed
  //   );

  //   if (nextStepIndex !== -1) {
  //     const updatedSteps = [...challenge.steps];
  //     updatedSteps[currentStepIndex] = {
  //       ...updatedSteps[currentStepIndex],
  //       completed: true,
  //       progress: 100,
  //     };
  //     if (updatedSteps[nextStepIndex]) {
  //       updatedSteps[nextStepIndex] = {
  //         ...updatedSteps[nextStepIndex],
  //         active: true,
  //       };
  //     }
  //     dispatch(updateChallenge({ steps: updatedSteps }));

  //     const nextStep = document.getElementById("step-" + (nextStepIndex + 1));
  //     nextStep?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //     setActiveStep(steps[nextStepIndex]);
  //   }

  //   setTimeout(() => setIsAnimating(false), 1000);
  //   setIsAwardOpen(true);
  // };

  const handleStepClick = (clickedStep: IStep) => {
    if (!clickedStep.completed && !clickedStep.active) return;
    setActiveStep(clickedStep);

    if (clickedStep.story?.length) {
      setIsStoriesOpen(true);
    }
  };

  const handleContinueAwards = () => {
    setIsAwardOpen(false);
    if (activeStep?.story?.length) {
      setIsStoriesOpen(true);
    }
  };

  const handleCloseStories = () => {
    setActiveStep(null);
    setIsStoriesOpen(false);
  };

  console.log(steps);

  return (
    <>
      <div className="relative w-full min-h-screen bg-slate-900">
        <div className="fixed inset-0 -z-10">
          {background_images.map((image, index) => (
            <div
              key={`blur-bg-${index}`}
              className="w-full h-auto blur-2xl opacity-40"
            >
              <img
                src={image.image_url}
                className="w-full h-auto object-cover"
                alt=""
              />
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto overflow-x-auto">
          <ul ref={backgroundListRef} className="relative z-0 w-5xl">
            {background_images.map((image, index) => (
              <li key={`map-bg-${index}`} className="relative w-full">
                <img
                  src={image.image_url}
                  alt=""
                  className="object-cover w-full h-auto block"
                />
              </li>
            ))}
          </ul>

          <div className="absolute inset-0 z-10 px-4 sm:px-8 w-5xl">
            <div className="relative w-full h-full">
              <Xwrapper>
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    id={`step-${step.id}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${step.x_coordinate}px`,
                      bottom: `${step.y_coordinate}px`,
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <div className="bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-white/10">
                        <div className="font-bold flex items-center gap-2">
                          {step.completed && (
                            <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <div className="text-gray-300 text-xs mt-1 max-w-xs">
                          {step.title || "test"}
                        </div>
                        <div className="text-cyan-400 text-xs font-medium mt-2">
                          Step {step.index} of {stepsAmount}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900/90 rotate-45 border-r border-b border-white/10" />
                    </div>

                    <div
                      className="group cursor-pointer relative z-20"
                      onClick={() => handleStepClick(step)}
                    >
                      <Step
                        id={step.id}
                        title={step.title || "Test"}
                        stepsAmount={stepsAmount}
                        completed={step.completed}
                        isActive={step.active}
                        progress={step.user_distance_percent}
                        distance={step.distance_by_next_step}
                        userDistance={step.user_distance}
                        userDistanceReached={
                          +step.distance_to_reach_step -
                          +step.user_distance_reach
                        }
                        x={step.x_coordinate}
                        distanceLeft={1}
                        isNext={step.next}
                      />
                    </div>
                  </div>
                ))}
              </Xwrapper>
            </div>
          </div>
        </div>

        <div className="fixed bottom-18 left-2 z-30">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-white rounded-full p-2 shadow-lg"
            onClick={handleScrollToActiveStep}
          >
            <Crosshair />
          </motion.button>
        </div>
        <div className="fixed bottom-18 right-2 z-30">
          <MapStats
            distance={total_distance}
            completedDistance={user_distance}
            steps={steps}
            startDate={activate_date}
          />
        </div>
      </div>

      <AnimatePresence>
        {isAwardOpen && <AwardModal onCloseClick={handleContinueAwards} />}
      </AnimatePresence>
      <AnimatePresence>
        {isStoriesOpen && (
          <StoryModal
            stories={activeStep?.story || []}
            onClose={handleCloseStories}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Map;
