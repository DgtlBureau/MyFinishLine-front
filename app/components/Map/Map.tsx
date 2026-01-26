"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import { useState, useLayoutEffect, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import AwardModal from "./AwardModal/AwardModal";
import { Xwrapper } from "react-xarrows";
import StoryModal from "../Shared/StoryList/StoryList";
import RouteRenderer from "./RouteRenderer";
import { IActiveChallenge, IStep, IStory } from "@/app/types";
import { Crosshair } from "lucide-react";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "@/app/lib/features/user/userSlice";
import Image from "next/image";
import FogOfWar from "./FogOfWar";

const Map = ({
  background_images,
  steps,
  is_completed,
  route_data,
}: IActiveChallenge) => {
  const [activeStep, setActiveStep] = useState<IStep | null>(null);
  const [isAwardOpen, setIsAwardOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [onboardingSlides, setOnboardingSlides] = useState<IStory[]>([]);
  const dispatch = useAppDispatch();

  const handleLoadOnboarding = async () => {
    try {
      const { data } = await axios.get("/api/user/onboarding");
      setOnboardingSlides(data);
      setIsStoriesOpen(true);
      dispatch(updateUser({ available_onboarding: false }));
    } catch (error) {
      toast.error("Error loading onboarding");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.available_onboarding) {
      handleLoadOnboarding();
    }
  }, []);

  const stepsAmount = steps.length;

  const MAP_WIDTH = 672;
  const DEFAULT_MAP_HEIGHT = 5354;
  const CONTENT_WIDTH = MAP_WIDTH - 64;
  const maxYCoordinate =
    steps.length > 0
      ? Math.max(...steps.map((s) => Number(s.y_coordinate)))
      : 0;
  const MAP_HEIGHT = Math.max(maxYCoordinate + 200, DEFAULT_MAP_HEIGHT);

  const hasRouteData =
    route_data &&
    route_data.routes &&
    route_data.routes.length > 0 &&
    route_data.routes.some((r) => r.points && r.points.length >= 2);

  const handleScrollToActiveStep = (animate: boolean = true) => {
    const behavior = animate ? "smooth" : "instant";
    const lastActiveStepId = steps.find((step) => step.active)?.id;
    const element = document.getElementById("user-progress-icon");
    if (element) {
      element?.scrollIntoView({
        behavior,
        block: "center",
        inline: "center",
      });
    } else if (lastActiveStepId) {
      const element = document.getElementById("step-" + lastActiveStepId);
      element?.scrollIntoView({
        behavior,
        block: "center",
        inline: "center",
      });
    } else {
      const element = document.getElementById("step-" + steps.length);
      element?.scrollIntoView({
        behavior,
        block: "center",
        inline: "center",
      });
    }
  };

  useLayoutEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const SESSION_KEY = "map_scroll_animated";
    const hasSeenAnimation = sessionStorage.getItem(SESSION_KEY) === "true";

    const scrollToBottom = (animate: boolean) => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: animate ? "smooth" : "instant",
      });
    };

    const hasActiveStep = steps.some((step) => step.active && !step.completed);
    const isAllCompleted = is_completed;

    if (hasActiveStep || isAllCompleted) {
      if (hasSeenAnimation) {
        timer = setTimeout(() => handleScrollToActiveStep(false), 10);
      } else {
        timer = setTimeout(() => {
          handleScrollToActiveStep(true);
          sessionStorage.setItem(SESSION_KEY, "true");
        }, 100);
      }
    } else {
      if (hasSeenAnimation) {
        timer = setTimeout(() => scrollToBottom(false), 10);
      } else {
        timer = setTimeout(() => {
          scrollToBottom(true);
          sessionStorage.setItem(SESSION_KEY, "true");
        }, 100);
      }
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

        {/* Map container - same structure as admin */}
        <div className="relative mx-auto overflow-x-auto">
          <div
            className="relative mx-auto"
            style={{ width: `${MAP_WIDTH}px`, height: `${MAP_HEIGHT}px` }}
          >
            {/* Background Image - same as admin */}
            {background_images[0] && (
              <img
                src={background_images[0].image_url}
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "fill" }}
                draggable={false}
              />
            )}

            {/* Fog of War overlay - optimized gradient */}
            <FogOfWar
              steps={steps}
              mapHeight={MAP_HEIGHT}
              isCompleted={is_completed}
            />

            {/* Racoon mascot - above fog of war */}
            <div className="absolute left-0 top-40" style={{ zIndex: 30 }}>
              <div className="fixed">
                <Image
                  src="/images/application/map-racoon.png"
                  width={100}
                  height={100}
                  alt="Map racoon"
                />
              </div>
            </div>

            {/* Content layer with padding - same as admin */}
            <div className="absolute inset-0 z-10 px-4 sm:px-8">
              {/* Render saved routes if available */}
              {hasRouteData && route_data && (
                <RouteRenderer
                  routeData={route_data}
                  steps={steps}
                  mapWidth={CONTENT_WIDTH}
                  mapHeight={MAP_HEIGHT}
                />
              )}

              {/* Steps */}
              <Xwrapper>
                {steps.map((step) => (
                  <div
                    key={step.id}
                    id={`step-${step.index}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${step.x_coordinate}px`,
                      bottom: `${step.y_coordinate}px`,
                      zIndex: 10,
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
                        title={step.title || "Step"}
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
                        index={step.index}
                        isViewed={step.is_viewed}
                        hideArrows={hasRouteData}
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
            onClick={() => handleScrollToActiveStep()}
          >
            <Crosshair />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isAwardOpen && <AwardModal onCloseClick={handleContinueAwards} />}
      </AnimatePresence>
      <AnimatePresence>
        {isStoriesOpen && (
          <StoryModal
            stepId={activeStep?.id || 0}
            isViewed={activeStep?.is_viewed || false}
            stories={activeStep?.story || onboardingSlides}
            onClose={handleCloseStories}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Map;
