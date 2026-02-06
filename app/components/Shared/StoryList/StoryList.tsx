import { setViewedStory } from "@/app/lib/features/challenge/challengeSlice";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useEffect, useState, useRef } from "react";
import StoryShadow from "./StoryShadow/StoryShadow";
import { useAppDispatch } from "@/app/lib/hooks";
import StorySlide from "./StorySlide/StorySlide";
import { Button } from "../../ui/button";
import { createPortal } from "react-dom";
import { IStory } from "@/app/types";
import Image from "next/image";
import axios from "axios";

import { logger } from "@/app/lib/logger";
const StoryList = ({
  stories,
  stepId,
  isViewed,
  onClose,
}: {
  stories: IStory[];
  stepId: number;
  isViewed: boolean;
  onClose: () => void;
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  const animationDuration = 10;
  const HOLD_DELAY = 150;
  const dispatch = useAppDispatch();

  const handleViewCurrentStory = async (storyId: number) => {
    try {
      await axios.post("/api/user/view-story", { story_id: storyId });
    } catch (error) {
      logger.log(error);
    }
  };

  const handleGoToNextStory = () => {
    const currentStoryId = stories[activeStoryIndex]?.id;

    // Mark current story as viewed
    if (currentStoryId) {
      handleViewCurrentStory(currentStoryId);
    }

    setActiveStoryIndex((prevIndex) => {
      if (stories[prevIndex + 1]) {
        return prevIndex + 1;
      } else {
        // Mark as viewed in Redux when all stories are completed
        dispatch(setViewedStory(stepId));
        onClose();
        return prevIndex;
      }
    });
  };

  const handleGoToPrevStory = () => {
    if (stories[activeStoryIndex - 1]) {
      setActiveStoryIndex((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
    return () => {
      document.body.classList.remove("overflow-y-hidden");
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    controls.stop();

    controls.set({ width: "0%" });

    setTimeout(() => {
      controls.start({
        width: "100%",
        transition: {
          duration: animationDuration,
          ease: "linear",
        },
      });
    }, 50);
  }, [activeStoryIndex, controls]);

  const currentStory =
    typeof activeStoryIndex === "number" ? stories[activeStoryIndex] : null;

  const handlePauseAnimation = () => {
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(true);
      setShowShadow(true);
      controls.stop();
    }, HOLD_DELAY);
  };

  const handleResumeAnimation = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }

    if (isPaused) {
      setIsPaused(false);
      setShowShadow(false);

      const progressBars = document.querySelectorAll("[data-story-progress]");
      const activeBar = progressBars[activeStoryIndex];

      if (activeBar) {
        const progressFill = activeBar.querySelector(
          ".progress-fill",
        ) as HTMLElement;
        if (progressFill) {
          const parentWidth = activeBar.clientWidth;
          const currentWidth = progressFill.clientWidth;
          const currentPercent = (currentWidth / parentWidth) * 100;

          const remainingPercent = 100 - currentPercent;
          const remainingDuration =
            (animationDuration * remainingPercent) / 100;

          controls.start({
            width: "100%",
            transition: {
              duration: remainingDuration,
              ease: "linear",
            },
          });
        }
      }
    }
  };

  const handlePointerLeave = () => {
    handleResumeAnimation();
  };

  useEffect(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    setShowShadow(false);
    setIsPaused(false);
  }, [activeStoryIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onPointerDown={handlePauseAnimation}
      onPointerUp={handleResumeAnimation}
      onPointerLeave={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center bg-gradient-to-b from-[#0a0f1c]/95 via-black/95 to-[#0f1419]/95 select-none"
    >
      <AnimatePresence>{showShadow && <StoryShadow />}</AnimatePresence>
      {currentStory && (
        <Image
          className="fixed object-cover z-50 w-full h-full blur-2xl opacity-40"
          src={currentStory?.image_url}
          quality={40}
          fill
          sizes="100vw"
          alt="Story background"
          priority
        />
      )}

      <div className="top-0 h-screen z-100 max-w-270 w-full mx-auto relative">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 z-200 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-black/60 transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={onClose}
        >
          Skip
        </motion.button>

        <div className="absolute top-2 left-2 right-2 z-50 flex gap-2 px-2">
          {stories.map((story, index) => {
            const isActive = index === activeStoryIndex;
            const isCompleted = index < activeStoryIndex;

            return (
              <div
                key={story.id}
                data-story-progress
                className="h-1 bg-white/20 w-full z-50 overflow-hidden rounded-full backdrop-blur-sm"
              >
                {isCompleted && (
                  <div className="h-full w-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                )}
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={controls}
                    onAnimationComplete={handleGoToNextStory}
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 progress-fill rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-30 flex">
          <button
            className="w-1/3 h-full flex-1"
            onClick={handleGoToPrevStory}
            aria-label="Previous story"
          />
          <div className="w-1/3" />
          <button
            className="w-1/3 h-full flex-1"
            onClick={handleGoToNextStory}
            aria-label="Next story"
          />
        </div>

        <AnimatePresence mode="wait">
          {currentStory && (
            <StorySlide
              id={currentStory.id}
              image_url={currentStory.image_url}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom instruction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 z-100"
      >
        <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span className="text-white/70 text-sm font-medium">
          Tap anywhere to continue
        </span>
      </motion.div>
    </motion.div>
  );
};

const StoryModal = ({
  stories,
  stepId,
  isViewed,
  onClose,
}: {
  stories: IStory[];
  stepId: number;
  isViewed: boolean;
  onClose: () => void;
}) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-100 relative"
    >
      <StoryList
        stepId={stepId}
        stories={stories}
        isViewed={isViewed}
        onClose={onClose}
      />
    </motion.div>,
    document.body,
  );
};

export default StoryModal;
