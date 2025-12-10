"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import Image from "next/image";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import AwardModal from "./AwardModal/AwardModal";
import MapStats from "./MapStats/MapStats";
import { Xwrapper } from "react-xarrows";
import StoryModal, { IStory } from "../Shared/StoryList/StoryList";

interface IStep {
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

const challenge: { steps: IStep[] } = {
  steps: [
    {
      id: 1,
      title: "🏁 The Starting Line",
      description: "Begin your journey",
      index: 1,
      active: true,
      completed: false,
      progress: 20,
      stories: [
        {
          id: 1,
          description: "So you decided to travel here? Good.",
          image: "/images/application/stories/1.jpg",
        },
        {
          id: 2,
          description: "You'll encounter many interesting things along the way",
          image: "/images/application/stories/2.jpg",
        },
        {
          id: 3,
          description: "Don't be scared.",
          image: "/images/application/stories/3.jpg",
        },
        {
          id: 4,
          description: "They will help you on your way to the top",
          image: "/images/application/stories/4.jpg",
        },
      ] as IStory[],
      x: 50,
      y: 115,
    },
    {
      id: 2,
      title: "🔥 First Spark",
      description: "Complete 3 workouts",
      index: 1,
      active: false,
      completed: false,
      progress: 0,
      stories: [
        {
          id: 1,
          description: "Finally! You are here!",
          image: "/images/application/stories/8.jpg",
        },
        {
          id: 2,
          description: "I don't want to ask right away but... I need your help",
          image: "/images/application/stories/6.jpg",
        },
        {
          id: 3,
          description:
            "Do you see that castle? I need you to get on top of it. I'll meet you there",
          image: "/images/application/stories/5.jpg",
        },
      ] as IStory[],
      x: 30,
      y: 110,
    },
    {
      id: 3,
      title: "📈 Building Rhythm",
      description: "5 consecutive days",
      index: 1,
      active: false,
      completed: false,
      progress: 0,
      x: 70,
      y: 105,
    },
    {
      id: 4,
      title: "🏃‍♂️ Runner's High",
      description: "First 10km run",
      index: 1,
      active: false,
      completed: false,
      progress: 0,
      x: 40,
      y: 95,
    },
    {
      id: 5,
      title: "⛰️ Hill Conqueror",
      description: "100m elevation gain",
      index: 1,
      active: false,
      completed: false,
      progress: 0,
      x: 60,
      y: 90,
    },
    {
      id: 6,
      title: "⚡ Speed Surge",
      description: "Set a new 5k PR",
      index: 2,
      active: false,
      completed: false,
      progress: 0,
      x: 35,
      y: 85,
    },
    {
      id: 7,
      title: "🌅 Morning Warrior",
      description: "7 AM runs for a week",
      index: 2,
      active: false,
      completed: false,
      progress: 0,
      x: 65,
      y: 80,
    },
    {
      id: 8,
      title: "🛤️ Trail Explorer",
      description: "Complete trail run",
      index: 2,
      active: false,
      completed: false,
      progress: 0,
      x: 25,
      y: 70,
    },
    {
      id: 9,
      title: "💪 Endurance Test",
      description: "First half marathon",
      index: 2,
      active: false,
      completed: false,
      progress: 0,
      x: 75,
      y: 65,
    },
    {
      id: 10,
      title: "🌧️ Rain Runner",
      description: "Run in any weather",
      index: 2,
      active: false,
      completed: false,
      progress: 0,
      x: 45,
      y: 60,
    },
    {
      id: 11,
      title: "🎯 Consistency King",
      description: "30-day streak",
      index: 3,
      active: false,
      completed: false,
      progress: 0,
      x: 55,
      y: 50,
    },
    {
      id: 12,
      title: "🏃‍♀️ Distance Master",
      description: "100km total distance",
      index: 3,
      active: false,
      completed: false,
      progress: 0,
      x: 20,
      y: 40,
    },
    {
      id: 13,
      title: "⏱️ Pace Setter",
      description: "Sub 5:00/km average",
      index: 3,
      active: false,
      completed: false,
      progress: 0,
      x: 80,
      y: 35,
    },
    {
      id: 14,
      title: "🌙 Night Owl",
      description: "Complete night run",
      index: 3,
      active: false,
      completed: false,
      progress: 0,
      x: 40,
      y: 30,
    },
    {
      id: 15,
      title: "🧗 Mountain Goat",
      description: "500m total elevation",
      index: 3,
      active: false,
      completed: false,
      progress: 0,
      x: 60,
      y: 25,
    },
    {
      id: 16,
      title: "🏆 Marathon Ready",
      description: "Complete 30km run",
      index: 4,
      active: false,
      completed: false,
      progress: 0,
      x: 50,
      y: 20,
    },
    {
      id: 17,
      title: "💨 Speed Demon",
      description: "Sub 4:30/km pace",
      index: 4,
      active: false,
      completed: false,
      progress: 0,
      x: 30,
      y: 15,
    },
    {
      id: 18,
      title: "🏔️ Summit Seeker",
      description: "1000m elevation gain",
      index: 4,
      active: false,
      completed: false,
      progress: 0,
      x: 70,
      y: 12,
    },
    {
      id: 19,
      title: "🏃 Ultra Mindset",
      description: "50km milestone",
      index: 4,
      active: false,
      completed: false,
      progress: 0,
      x: 45,
      y: 10,
    },
    {
      id: 20,
      title: "⭐ Legend Forged",
      description: "100 days of running",
      index: 4,
      active: false,
      completed: false,
      progress: 0,
      x: 55,
      y: 2,
    },
  ],
};

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

  useEffect(() => {
    setIsMounted(true);

    // Load saved challenge from localStorage
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

    // Check if there's an active step
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

  const maxY = Math.max(...steps.map((step) => step.y));
  const mapHeight = maxY * 60;

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
          <div
            className="relative max-w-5xl mx-auto pt-4 pb-20"
            style={{ minHeight: `${mapHeight + 200}px` }}
          >
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

            <div
              className="relative z-30 w-full px-4 sm:px-8"
              style={{ minHeight: `${mapHeight}px` }}
            >
              <div className="relative w-full">
                <Xwrapper>
                  {currentChallenge.steps.map((step) => {
                    const topPosition = step.y * 60;

                    return (
                      <div
                        key={step.id}
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
