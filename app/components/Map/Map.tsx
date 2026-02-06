"use client";

import Step from "@/app/components/Application/Map/Step/Step";
import { useState, useLayoutEffect, useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "motion/react";
import AwardModal from "./AwardModal/AwardModal";
import { Xwrapper } from "react-xarrows";
import StoryModal from "../Shared/StoryList/StoryList";
import RouteRenderer from "./RouteRenderer";
import { IActiveChallenge, IStep, IStory } from "@/app/types";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import axios from "axios";
import instance from "@/app/lib/utils/instance";
import { toast } from "react-toastify";
import { updateUser } from "@/app/lib/features/user/userSlice";
import Image from "next/image";
import FogOfWar from "./FogOfWar";
import { sendGTMEvent } from "@next/third-parties/google";
import { logger } from "@/app/lib/logger";

const Map = ({
  background_images,
  steps,
  is_completed,
  route_data,
  reward,
  onMapReady,
  mapReady = false,
}: IActiveChallenge & { onMapReady?: () => void; mapReady?: boolean }) => {
  const [activeStep, setActiveStep] = useState<IStep | null>(null);
  const [isAwardOpen, setIsAwardOpen] = useState(false);
  const [canShowAwards, setCanShowAwards] = useState(false);
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0);
  const [allAwards, setAllAwards] = useState<Array<{ image_url: string; type: 'badge' | 'card'; id: number }>>([]);

  // If no background images, signal map ready immediately
  useEffect(() => {
    if (!background_images || background_images.length === 0) {
      onMapReady?.();
    }
  }, [background_images, onMapReady]);

  // Wait for map to be ready and splash screen to fade out before showing awards
  useEffect(() => {
    if (mapReady) {
      // Wait for LoadingScreen fade out animation (500ms) + small buffer
      const timer = setTimeout(() => {
        setCanShowAwards(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [mapReady]);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [onboardingSlides, setOnboardingSlides] = useState<IStory[]>([]);
  const [awardQueue, setAwardQueue] = useState<IStep[]>([]);
  const [scale, setScale] = useState(1);
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Responsive scale based on container width
  useEffect(() => {
    const updateScale = () => {
      const container = mapContainerRef.current;
      const width = container ? container.clientWidth : window.innerWidth;
      setScale(Math.min(1, width / 672));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleLoadOnboarding = async () => {
    try {
      const { data } = await axios.get("/api/user/onboarding");
      setOnboardingSlides(data);
      setIsStoriesOpen(true);
      dispatch(updateUser({ available_onboarding: false }));
    } catch (error) {
      toast.error("Error loading onboarding");
      logger.error(error);
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

  // Detect when steps are completed and have unclaimed awards
  useEffect(() => {
    if (steps.length === 0 || !canShowAwards) return;

    const previousSteps = previousStepsRef.current;
    const stepsWithUnclaimedAwards: IStep[] = [];

    // On initial load, find steps with unclaimed awards
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;

      for (const step of steps) {
        if (step.completed) {
          // Check if step has unclaimed badges or cards (before stories)
          const hasUnclaimedBeforeBadges = step.badges?.some(
            b => b.show_before_story !== false && !b.is_claimed
          );
          const hasUnclaimedBeforeCards = step.cards?.some(
            c => c.show_before_story !== false && !c.is_claimed
          );

          if (hasUnclaimedBeforeBadges || hasUnclaimedBeforeCards) {
            stepsWithUnclaimedAwards.push(step);
          }
        }
      }
    } else {
      // For subsequent updates, detect steps that just became completed
      for (const step of steps) {
        if (step.completed) {
          const prevStep = previousSteps.find((s) => s.id === step.id);
          const wasNotCompletedBefore = prevStep && !prevStep.completed;

          if (wasNotCompletedBefore) {
            // Check if has unclaimed awards
            const hasUnclaimedBeforeBadges = step.badges?.some(
              b => b.show_before_story !== false && !b.is_claimed
            );
            const hasUnclaimedBeforeCards = step.cards?.some(
              c => c.show_before_story !== false && !c.is_claimed
            );

            if (hasUnclaimedBeforeBadges || hasUnclaimedBeforeCards) {
              stepsWithUnclaimedAwards.push(step);
            }
          }
        }
      }
    }

    // If there are steps with unclaimed awards, show them
    if (stepsWithUnclaimedAwards.length > 0) {
      // Sort by index (lowest first) so user sees them in order
      const sortedSteps = stepsWithUnclaimedAwards.sort((a, b) => a.index - b.index);

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

      // Collect all UNCLAIMED awards (badges and cards) that should be shown before stories
      const awards: Array<{ image_url: string; type: 'badge' | 'card'; id: number }> = [];

      if (firstStep.badges) {
        firstStep.badges
          .filter(b => b.show_before_story !== false && !b.is_claimed)
          .forEach(badge => {
            awards.push({ image_url: badge.image_url, type: 'badge', id: badge.id });
          });
      }

      if (firstStep.cards) {
        firstStep.cards
          .filter(c => c.show_before_story !== false && !c.is_claimed)
          .forEach(card => {
            awards.push({ image_url: card.image_url, type: 'card', id: card.id });
          });
      }

      setActiveStep(firstStep);
      setAllAwards(awards);
      setCurrentAwardIndex(0);

      if (awards.length > 0) {
        setIsAwardOpen(true);
      }

      if (remainingSteps.length > 0) {
        setAwardQueue(remainingSteps);
      }
    }

    // Update previous steps ref
    previousStepsRef.current = steps;
  }, [steps, canShowAwards]);

  const stepsAmount = steps.length;

  const MAP_WIDTH = 672;
  const DEFAULT_MAP_HEIGHT = 5354;
  const CONTENT_WIDTH = MAP_WIDTH - 64;
  const maxYCoordinate =
    steps.length > 0
      ? Math.max(...steps.map((s) => Number(s.y_coordinate)))
      : 0;
  const minYCoordinate =
    steps.length > 0
      ? Math.min(...steps.map((s) => Number(s.y_coordinate)))
      : 0;
  // If any step has negative y, extend map downward and shift all steps up
  const yOffset = minYCoordinate < 0 ? Math.abs(minYCoordinate) + 100 : 0;
  const MAP_HEIGHT = Math.max(maxYCoordinate + yOffset + 200, DEFAULT_MAP_HEIGHT + yOffset);

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

    setActiveStep(clickedStep);

    // Scroll to step
    const stepElement = document.getElementById(`step-${clickedStep.index}`);
    if (stepElement) {
      stepElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }

    // Open stories
    if (clickedStep.story?.length) {
      setTimeout(() => {
        setIsStoriesOpen(true);
      }, 300);
    }
  };

  const handleContinueAwards = async () => {
    // Claim current award on backend
    const currentAward = allAwards[currentAwardIndex];
    if (currentAward && activeStep) {
      try {
        await axios.post('/api/challenges/claim-cosmetic', {
          challenge_step_id: activeStep.id,
          type: currentAward.type,
        });

        // Update local state to mark this award as claimed
        setActiveStep(prevStep => {
          if (!prevStep) return prevStep;

          const updatedStep = { ...prevStep };

          if (currentAward.type === 'badge' && updatedStep.badges) {
            updatedStep.badges = updatedStep.badges.map(b =>
              b.id === currentAward.id ? { ...b, is_claimed: true } : b
            );
          } else if (currentAward.type === 'card' && updatedStep.cards) {
            updatedStep.cards = updatedStep.cards.map(c =>
              c.id === currentAward.id ? { ...c, is_claimed: true } : c
            );
          }

          return updatedStep;
        });
      } catch (error) {
        logger.error('Failed to claim cosmetic:', error);
      }
    }

    setIsAwardOpen(false);

    // Check if there are more awards to show
    if (currentAwardIndex < allAwards.length - 1) {
      // Show next award
      setCurrentAwardIndex(prev => prev + 1);
      setTimeout(() => {
        setIsAwardOpen(true);
      }, 300);
    } else {
      // All awards shown, now show stories or next queued step
      if (activeStep?.story?.length) {
        setIsStoriesOpen(true);
      } else {
        // No stories, check if there are more steps in queue
        showNextQueuedAward();
      }
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

    // Check if there are awards to show AFTER stories
    if (activeStep) {
      const afterStoryAwards: Array<{ image_url: string; type: 'badge' | 'card'; id: number }> = [];

      if (activeStep.badges) {
        activeStep.badges
          .filter(b => b.show_before_story === false && !b.is_claimed)
          .forEach(badge => {
            afterStoryAwards.push({ image_url: badge.image_url, type: 'badge', id: badge.id });
          });
      }

      if (activeStep.cards) {
        activeStep.cards
          .filter(c => c.show_before_story === false && !c.is_claimed)
          .forEach(card => {
            afterStoryAwards.push({ image_url: card.image_url, type: 'card', id: card.id });
          });
      }

      if (afterStoryAwards.length > 0) {
        // Show after-story awards
        setAllAwards(afterStoryAwards);
        setCurrentAwardIndex(0);
        setTimeout(() => {
          setIsAwardOpen(true);
        }, 300);
        return;
      }
    }

    // No after-story awards, check if there are more steps in queue
    showNextQueuedAward();
  };

  return (
    <>
      <div className="relative w-full min-h-dvh bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a] overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          {background_images[0] && (
            <img
              src={background_images[0].image_url}
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110"
              alt=""
            />
          )}
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
                  ? "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform-origin 0.3s ease-out"
                  : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform-origin 0.3s ease-out",
              }}
            >
            {background_images[0] && (
              <img
                src={background_images[0].image_url}
                alt=""
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "fill" }}
                draggable={false}
                onLoad={onMapReady}
                onError={onMapReady}
              />
            )}

            <FogOfWar
              steps={steps}
              mapHeight={MAP_HEIGHT}
              isCompleted={is_completed}
              yOffset={yOffset}
            />

            <div className="absolute inset-0 z-10 px-4 sm:px-8">
              {hasRouteData && route_data && (
                <RouteRenderer
                  routeData={route_data}
                  steps={steps}
                  mapWidth={CONTENT_WIDTH}
                  mapHeight={MAP_HEIGHT}
                  yOffset={yOffset}
                />
              )}

              <Xwrapper>
                {steps
                  .filter(step =>
                    step.completed ||  // Показывать завершенные точки
                    step.active ||     // Показывать активную точку
                    step.next ||       // Показывать следующую точку
                    step.index === 0   // Показывать стартовую точку
                  )
                  .map((step) => (
                  <div
                    key={step.id}
                    id={`step-${step.index}`}
                    className="absolute"
                    style={{
                      left: `${step.x_coordinate}px`,
                      bottom: `${Number(step.y_coordinate) + yOffset}px`,
                      transform: 'translate(-50%, 50%)',
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
                        storiesCount={step.story?.length || 0}
                      />
                    </div>
                  </div>
                ))}
              </Xwrapper>
            </div>
          </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAwardOpen && (
          <AwardModal
            onCloseClick={handleContinueAwards}
            medalImage={allAwards[currentAwardIndex]?.image_url || reward?.image_url || undefined}
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
