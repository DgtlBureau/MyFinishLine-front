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

  const handleViewStories = async () => {
    if (isViewed || !stepId) {
      return;
    }

    try {
      await axios.post("/api/user/view-story", { step_id: stepId });
      dispatch(setViewedStory(stepId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToNextStory = () => {
    setActiveStoryIndex((prevIndex) => {
      if (stories[prevIndex + 1]) {
        return prevIndex + 1;
      } else {
        handleViewStories();
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
    <div
      onPointerDown={handlePauseAnimation}
      onPointerUp={handleResumeAnimation}
      onPointerLeave={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center bg-black select-none"
    >
      <AnimatePresence>{showShadow && <StoryShadow />}</AnimatePresence>
      {currentStory && (
        <Image
          className="fixed object-cover z-50 w-full h-full blur-xl opacity-50"
          src={currentStory?.image_url}
          quality={40}
          fill
          sizes="100vw"
          alt="Story background"
          priority
        />
      )}

      <div className="top-0 h-screen z-100 max-w-270 w-full mx-auto relative">
        <Button
          className="text-white z-200 absolute top-2 right-2"
          onClick={onClose}
        >
          Skip
        </Button>
        <div className="absolute top-0 left-0 w-full z-50 flex gap-1">
          {stories.map((story, index) => {
            const isActive = index === activeStoryIndex;
            const isCompleted = index < activeStoryIndex;
            console.log(story);
            return (
              <div
                key={story.id}
                data-story-progress
                className="h-0.5 bg-gray-500/70 w-full z-50 overflow-hidden backdrop-blur-sm"
              >
                {isCompleted && (
                  <div className="h-full w-full bg-white transition-all duration-300" />
                )}
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={controls}
                    onAnimationComplete={handleGoToNextStory}
                    className="h-full bg-white progress-fill"
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

      {/* {currentStory && currentStory.content && (
        <StoryDescription
          currentStoryNumber={activeStoryIndex + 1}
          storiesAmount={stories.length}
          text={currentStory.content}
        />
      )} */}
    </div>
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
