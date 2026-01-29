"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
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
import { sendGTMEvent } from "@next/third-parties/google";

const Map = ({
  background_images,
  steps,
  is_completed,
  route_data,
  reward,
}: IActiveChallenge) => {
  const [activeStep, setActiveStep] = useState<IStep | null>(null);
  const [isAwardOpen, setIsAwardOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [onboardingSlides, setOnboardingSlides] = useState<IStory[]>([]);
  const [awardQueue, setAwardQueue] = useState<IStep[]>([]);
  const [scale, setScale] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.min(1, window.innerWidth / 672);
    }
    return 1;
  });
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
      // handleLoadOnboarding();
    }
  }, []);

  // Track previous steps to detect newly completed ones
  const previousStepsRef = useRef<IStep[]>([]);
  const isInitialLoadRef = useRef(true);
  const CELEBRATED_STEPS_KEY = "celebrated_steps";

  // Detect when steps are newly completed and queue award modals
  useEffect(() => {
    if (steps.length === 0) return;

    // Get already celebrated steps from sessionStorage
    let celebratedSteps: number[] = [];
    try {
      const stored = sessionStorage.getItem(CELEBRATED_STEPS_KEY);
      if (stored) {
        celebratedSteps = JSON.parse(stored);
      }
    } catch (e) {
      // Ignore parse errors
    }

    const previousSteps = previousStepsRef.current;
    const newlyCompletedSteps: IStep[] = [];

    // On initial load, find steps completed since last session
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;

      for (const step of steps) {
        if (step.completed && !celebratedSteps.includes(step.id)) {
          newlyCompletedSteps.push(step);
          celebratedSteps.push(step.id);
        }
      }
    } else {
      // For subsequent updates, detect steps that just became completed
      for (const step of steps) {
        if (step.completed && !celebratedSteps.includes(step.id)) {
          const prevStep = previousSteps.find((s) => s.id === step.id);
          const wasNotCompletedBefore = prevStep && !prevStep.completed;

          if (wasNotCompletedBefore) {
            newlyCompletedSteps.push(step);
            celebratedSteps.push(step.id);
          }
        }
      }
    }

    // If there are newly completed steps, queue them for celebration
    if (newlyCompletedSteps.length > 0) {
      sessionStorage.setItem(CELEBRATED_STEPS_KEY, JSON.stringify(celebratedSteps));

      // Sort by index (lowest first) so user sees them in order
      const sortedSteps = newlyCompletedSteps.sort((a, b) => a.index - b.index);

      // Send GTM events for each completed step
      sortedSteps.forEach((step) => {
        sendGTMEvent({
          event: "step_completed",
          step_number: step.index,
          step_id: step.id,
          step_title: step.title,
          challenge_id: step.challenge_id,
          page_location: window.location.href,
          page_path: window.location.pathname,
          page_title: document.title,
        });
      });

      // Show the first one immediately, queue the rest
      const [firstStep, ...remainingSteps] = sortedSteps;
      setActiveStep(firstStep);
      setIsAwardOpen(true);
      if (remainingSteps.length > 0) {
        setAwardQueue(remainingSteps);
      }
    }

    // Update previous steps ref
    previousStepsRef.current = steps;
  }, [steps]);

  const stepsAmount = steps.length;

  const MAP_WIDTH = 672;
  const DEFAULT_MAP_HEIGHT = 5354;
  const CONTENT_WIDTH = MAP_WIDTH - 64;
  const maxYCoordinate =
    steps.length > 0
      ? Math.max(...steps.map((s) => Number(s.y_coordinate)))
      : 0;
  const MAP_HEIGHT = Math.max(maxYCoordinate + 200, DEFAULT_MAP_HEIGHT);

  // Calculate scale to fit map in viewport
  useLayoutEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth;
      // Scale based on width (fit horizontally)
      const widthScale = Math.min(1, viewportWidth / MAP_WIDTH);
      setScale(widthScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  const hasRouteData =
    route_data &&
    route_data.routes &&
    route_data.routes.length > 0 &&
    route_data.routes.some((r) => r.points && r.points.length >= 2);

  const findVisibleUserCircle = (): Element | null => {
    const userCircles = document.querySelectorAll("#user-progress-icon");

    for (const circle of userCircles) {
      const style = window.getComputedStyle(circle);
      const isVisible =
        style.display !== "none" &&
        style.opacity !== "0" &&
        style.visibility !== "hidden";

      // Also check if parent is visible (ProgressArrow might hide the container)
      let parent = circle.parentElement;
      let parentVisible = true;

      while (parent && parent !== document.body) {
        const parentStyle = window.getComputedStyle(parent);
        if (
          parentStyle.display === "none" ||
          parentStyle.opacity === "0" ||
          parentStyle.visibility === "hidden"
        ) {
          parentVisible = false;
          break;
        }
        parent = parent.parentElement;
      }

      if (isVisible && parentVisible) {
        return circle;
      }
    }
    return null;
  };

  const handleScrollToActiveStep = (animate: boolean = true, retryCount: number = 0) => {
    const behavior = animate ? "smooth" : "instant";
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 100;

    const visibleCircle = findVisibleUserCircle();

    if (visibleCircle) {
      visibleCircle.scrollIntoView({
        behavior,
        block: "center",
        inline: "center",
      });
      return;
    }

    // Retry a few times to wait for RouteRenderer avatar to become visible
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        handleScrollToActiveStep(animate, retryCount + 1);
      }, RETRY_DELAY);
      return;
    }

    // If still no visible circle after retries, fallback to active step
    const activeStep = steps.find((step) => step.active);
    if (activeStep) {
      const stepElement = document.getElementById(`step-${activeStep.index}`);
      if (stepElement) {
        stepElement.scrollIntoView({
          behavior,
          block: "center",
          inline: "center",
        });
      }
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

    // If clicking the same step while zoomed, zoom out
    if (isZooming && activeStep?.id === clickedStep.id) {
      setZoomScale(1);
      setIsZooming(false);
      return;
    }

    setActiveStep(clickedStep);

    // First scroll to center the step smoothly
    const stepElement = document.getElementById(`step-${clickedStep.index}`);
    if (stepElement) {
      stepElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }

    // Calculate zoom origin based on step position
    const xPercent = (Number(clickedStep.x_coordinate) / MAP_WIDTH) * 100;
    const yPercent = 100 - (Number(clickedStep.y_coordinate) / MAP_HEIGHT) * 100;

    // Delay zoom to let scroll complete first
    setTimeout(() => {
      setZoomOrigin({ x: xPercent, y: yPercent });
      setZoomScale(1.8);
      setIsZooming(true);
    }, 300);

    // Open stories after zoom animation
    if (clickedStep.story?.length) {
      setTimeout(() => {
        setIsStoriesOpen(true);
      }, 1000);
    }
  };

  const handleContinueAwards = () => {
    setIsAwardOpen(false);
    if (activeStep?.story?.length) {
      setIsStoriesOpen(true);
    } else {
      // No stories, check if there are more steps in queue
      showNextQueuedAward();
    }
  };

  const showNextQueuedAward = () => {
    if (awardQueue.length > 0) {
      const [nextStep, ...remainingSteps] = awardQueue;
      setActiveStep(nextStep);
      setAwardQueue(remainingSteps);
      setIsAwardOpen(true);
    } else {
      setActiveStep(null);
    }
  };

  const handleCloseStories = () => {
    setIsStoriesOpen(false);
    setZoomScale(1);
    setIsZooming(false);
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-slate-900 overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          {background_images.map((image, index) => (
            <div
              key={`blur-bg-${index}`}
              className="w-full h-auto blur-2xl opacity-40"
            >
              <img
                src={background_images[0].image_url}
                className="w-full h-full object-cover blur-2xl opacity-40 scale-125"
                alt=""
              />
            </div>
          ))}
          {/* Color overlay to blend with map theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-purple-900/30" />
          {/* Soft vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(15, 15, 30, 0.5) 100%)'
            }}
          />
        </div>

        <div
          ref={mapContainerRef}
          className="relative w-full overflow-hidden"
        >
          <div
            style={{
              width: `${MAP_WIDTH * scale}px`,
              height: `${MAP_HEIGHT * scale}px`,
              margin: "0 auto",
            }}
          >
            <div
              className="relative"
              style={{
                width: `${MAP_WIDTH}px`,
                height: `${MAP_HEIGHT}px`,
                transform: `scale(${scale * zoomScale})`,
                transformOrigin: isZooming ? `${zoomOrigin.x}% ${zoomOrigin.y}%` : "top left",
                transition: isZooming
                  ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
            {background_images[0] && (
              <img
                src={background_images[0].image_url}
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "fill" }}
                draggable={false}
              />
            )}

            <FogOfWar
              steps={steps}
              mapHeight={MAP_HEIGHT}
              isCompleted={is_completed}
            />

            <div className="absolute left-0 top-40" style={{ zIndex: 30 }}>
              <div className="fixed flex gap-2 items-start">
                <Image
                  src="/images/application/map-racoon.png"
                  width={100}
                  height={100}
                  alt="Map racoon"
                />
                {(!user.has_fitbit_connect || !user.has_fitbit_connect) && (
                  <div className="relative bg-white p-2 px-4 rounded-xl shadow-lg max-w-xs ml-2">
                    <div className="text-sm font-medium text-gray-800 italic">
                      Connect your Strava or FitBit account to track your
                      progress!
                    </div>
                    <div
                      className="absolute -left-1 bottom-0 w-0 h-0 
                      border-t-8 border-t-transparent
                      border-r-12 border-r-white
                      border-b-8 border-b-transparent
                      rotate-95"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="absolute inset-0 z-10 px-4 sm:px-8">
              {hasRouteData && route_data && (
                <RouteRenderer
                  routeData={route_data}
                  steps={steps}
                  mapWidth={CONTENT_WIDTH}
                  mapHeight={MAP_HEIGHT}
                />
              )}

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
                        userDistanceReachedMile={
                          step.distance_to_reach_step_mile && step.user_distance_reach_mile
                            ? +step.distance_to_reach_step_mile - +step.user_distance_reach_mile
                            : undefined
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
        {isAwardOpen && (
          <AwardModal
            onCloseClick={handleContinueAwards}
            medalImage={reward?.image_url || undefined}
          />
        )}
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
