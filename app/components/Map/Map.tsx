"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import Image from "next/image";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import AwardModal from "./AwardModal/AwardModal";
import MapStats from "./MapStats/MapStats";
import { Xwrapper } from "react-xarrows";
import StoryModal, { IStory } from "../Shared/StoryList/StoryList";
import { challenge } from "@/app/data/challenges";

export interface IStep {
  id: number;
  title: string;
  description: string;
  index: number;
  completed: boolean;
  progress: number;
  active: boolean;
  stories?: IStory[];
  x: number;
  y: number;
}

const Map = () => {
  const [currentChallenge, setCurrentChallenge] = useState(challenge);
  const [activeStep, setActiveStep] = useState<IStep | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAwardOpen, setIsAwardOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = currentChallenge.steps;
  const stepsAmount = steps.length;

  // Находим минимальную и максимальную координату Y
  const maxY = Math.max(...steps.map((step) => step.y));
  const minY = Math.min(...steps.map((step) => step.y));

  // Высота карты = разница между максимальной и минимальной Y * множитель
  const multiplier = 60; // Множитель для преобразования координат в пиксели
  const mapHeight = (maxY - minY) * multiplier + 300; // 200 сверху + 100 снизу

  useEffect(() => {
    setIsMounted(true);

    try {
      const savedChallenge = localStorage.getItem("challengeProgress");
      if (savedChallenge) {
        const parsed = JSON.parse(savedChallenge);
        setCurrentChallenge(parsed);
      }
    } catch (error) {
      console.error("Error loading challenge from localStorage:", error);
    }
  }, []);

  const handleResetProgress = () => {
    setCurrentChallenge(challenge);
    localStorage.removeItem("challengeProgress");
  };

  useLayoutEffect(() => {
    if (!isMounted) return;

    let timer: ReturnType<typeof setTimeout>;

    const scrollToActiveStep = () => {
      const activeStep = currentChallenge.steps.find(
        (step) => step.active && !step.completed
      );
      if (activeStep) {
        const element = document.getElementById("step-" + activeStep.id);
        element?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    const hasActiveStep = currentChallenge.steps.some(
      (step) => step.active && !step.completed
    );

    if (hasActiveStep) {
      timer = setTimeout(scrollToActiveStep, 100);
    } else {
      timer = setTimeout(scrollToBottom, 100);
    }

    return () => clearTimeout(timer);
  }, [isMounted, currentChallenge]);

  const handleGoToNextStep = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentStepIndex = currentChallenge.steps.findIndex(
      (step) => step.active && !step.completed
    );
    const nextStepIndex = currentChallenge.steps.findIndex(
      (step) => !step.active && !step.completed
    );

    if (nextStepIndex !== -1) {
      setCurrentChallenge((prev) => {
        const updatedSteps = [...prev.steps];
        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          completed: true,
          progress: 100,
        };
        if (updatedSteps[nextStepIndex]) {
          updatedSteps[nextStepIndex] = {
            ...updatedSteps[nextStepIndex],
            active: true,
          };
        }
        return { ...prev, steps: updatedSteps };
      });

      const nextStep = document.getElementById("step-" + (nextStepIndex + 1));
      nextStep?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setActiveStep(currentChallenge.steps[nextStepIndex]);
    }

    setTimeout(() => setIsAnimating(false), 1000);
    setIsAwardOpen(true);
  };

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(
        "challengeProgress",
        JSON.stringify(currentChallenge)
      );
    }
  }, [currentChallenge, isMounted]);

  const handleStepClick = (clickedStep: IStep) => {
    if (!clickedStep.completed && !clickedStep.active) return;
    setActiveStep(clickedStep);

    if (clickedStep.stories?.length) {
      setIsStoriesOpen(true);
    }
  };

  const handleContinueAwards = () => {
    setIsAwardOpen(false);
    if (activeStep?.stories?.length) {
      setIsStoriesOpen(true);
    }
  };

  const handleCloseStories = () => {
    setActiveStep(null);
    setIsStoriesOpen(false);
  };

  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-linear-to-br from-slate-950 via-blue-950/30 to-purple-950/20" />
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-linear-to-br from-slate-950 via-blue-950/30 to-purple-950/20">
        <div ref={containerRef} className="h-full overflow-y-auto">
          {/* Контейнер для карты с рассчитанной высотой */}
          <div
            className="relative max-w-5xl mx-auto pt-20"
            style={{ minHeight: `${mapHeight}px` }}
          >
            {/* Создаем повторяющиеся фоновые изображения на всю высоту карты */}
            {Array.from({ length: Math.ceil(mapHeight / 800) }).map(
              (_, index) => (
                <div
                  key={`map-bg-${index}`}
                  className="absolute inset-x-0 z-0 opacity-20"
                  style={{
                    top: `${index * 800}px`,
                    height: "800px",
                  }}
                >
                  <Image
                    src="/images/application/map.png"
                    loading="eager"
                    fill
                    alt="Map background"
                    className="object-cover"
                    priority={index === 0}
                    sizes="100%"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/10 to-transparent" />
                </div>
              )
            )}

            {/* Контейнер для точек с относительным позиционированием */}
            <div className="relative z-30 w-full px-4 sm:px-8">
              <div
                className="relative w-full"
                style={{ height: `${mapHeight}px` }}
              >
                <Xwrapper>
                  {steps.map((step) => {
                    // Рассчитываем позицию точки относительно минимальной Y
                    // Добавляем 200px отступа сверху для первого шага
                    const topPosition = (step.y - minY) * multiplier + 200;

                    return (
                      <div
                        key={step.id}
                        id={`step-${step.id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${step.x}%`,
                          top: `${topPosition}px`,
                        }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                          <div className="bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-white/10">
                            <div className="font-bold flex items-center gap-2">
                              {step.title}
                              {step.completed && (
                                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
                                  ✓ Completed
                                </span>
                              )}
                            </div>
                            <div className="text-gray-300 text-xs mt-1 max-w-xs">
                              {step.description}
                            </div>
                            <div className="text-cyan-400 text-xs font-medium mt-2">
                              Step {step.id} of {stepsAmount}
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
                            title={step.title}
                            stepsAmount={stepsAmount}
                            completed={step.completed}
                            isActive={step.active}
                            progress={step.progress}
                          />
                        </div>
                      </div>
                    );
                  })}
                </Xwrapper>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-18 right-6 z-30">
          <MapStats
            steps={currentChallenge.steps}
            isAnimating={isAnimating}
            onCompleteNextStep={handleGoToNextStep}
            onResetClick={handleResetProgress}
          />
        </div>
      </div>

      <AnimatePresence>
        {isAwardOpen && <AwardModal onCloseClick={handleContinueAwards} />}
      </AnimatePresence>
      <AnimatePresence>
        {isStoriesOpen && (
          <StoryModal
            stories={activeStep?.stories || []}
            onClose={handleCloseStories}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Map;
