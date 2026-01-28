"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface SwipeToUnlockProps {
  onUnlock: () => void;
  onDisconnect?: () => void;
  label: string;
  disconnectLabel?: string;
  icon?: React.ReactNode;
  isConnected?: boolean;
  serviceName?: string;
}

const SwipeToUnlock = ({
  onUnlock,
  onDisconnect,
  label,
  disconnectLabel,
  icon,
  isConnected = false,
  serviceName = "",
}: SwipeToUnlockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const SLIDER_WIDTH = 72;
  const UNLOCK_THRESHOLD = 0.85;

  // Progress fill that follows the slider
  const progressWidth = useTransform(x, [0, containerWidth], ["0%", "100%"]);
  const progressOpacity = useTransform(x, [0, containerWidth * 0.3, containerWidth], [0, 0.3, 0.5]);

  // Text opacity fades as slider moves
  const textOpacity = useTransform(x, [0, containerWidth * 0.5], [1, 0]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - SLIDER_WIDTH);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    const timer = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, []);

  const handleDragEnd = async () => {
    if (containerWidth <= 0 || isProcessing) return;

    const currentX = x.get();
    const progress = currentX / containerWidth;

    if (progress >= UNLOCK_THRESHOLD) {
      // Snap to end with spring animation
      animate(x, containerWidth, {
        type: "spring",
        stiffness: 400,
        damping: 25
      });

      setIsProcessing(true);
      setShowSuccess(true);

      // Small delay to show success state, then trigger action
      setTimeout(() => {
        if (isConnected && onDisconnect) {
          onDisconnect();
        } else {
          onUnlock();
        }
      }, 300);

      // Reset after a longer delay to allow redirect to happen
      setTimeout(() => {
        animate(x, 0, { duration: 0.4, ease: "easeOut" });
        setIsProcessing(false);
        setShowSuccess(false);
      }, 2000);
    } else {
      // Spring back with bounce
      animate(x, 0, {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8
      });
    }
  };

  const displayLabel = isConnected
    ? (disconnectLabel || `Swipe to disconnect ${serviceName}`)
    : label;

  const processingLabel = isConnected ? "Disconnecting..." : "Connecting...";

  return (
    <div className="pb-2">
      <div className="rounded-2xl bg-white/60 backdrop-blur-xl p-2 border border-white/60">
        <div
          ref={containerRef}
          className="relative h-[72px] rounded-xl overflow-hidden bg-gray-100/50"
        >
          {/* Progress fill background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#5170D5]/30 to-[#66af69]/30 rounded-xl"
            style={{
              width: progressWidth,
              opacity: progressOpacity
            }}
          />

          {/* Shimmer effect when processing */}
          {isProcessing && (
            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}

          {/* Label text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: isProcessing ? 1 : textOpacity }}
          >
            {isProcessing ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="w-4 h-4 text-[#5170D5] animate-spin" />
                <span className="text-[#5170D5] text-[11px] font-medium select-none">
                  {processingLabel}
                </span>
              </motion.div>
            ) : (
              <>
                <span className="text-gray-500 text-[11px] font-medium select-none ml-16 whitespace-nowrap">
                  {displayLabel}
                </span>
                <motion.span
                  className="ml-1 text-gray-400 text-[11px]"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  &gt;
                </motion.span>
              </>
            )}
          </motion.div>

          {/* Draggable slider */}
          <motion.div
            className="absolute top-0 left-0 h-[72px] w-[72px] rounded-xl z-10 overflow-hidden"
            style={{
              x,
              touchAction: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            drag={isProcessing ? false : "x"}
            dragConstraints={{ left: 0, right: containerWidth }}
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
            onDragEnd={handleDragEnd}
          >
            {/* Icon wrapper with pulse animation when not connected */}
            <motion.div
              className="w-[72px] h-[72px] relative"
              animate={!isConnected && !isProcessing ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(99, 102, 241, 0)",
                  "0 0 0 8px rgba(99, 102, 241, 0.2)",
                  "0 0 0 0 rgba(99, 102, 241, 0)"
                ]
              } : {}}
              transition={!isConnected && !isProcessing ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
              style={{ borderRadius: "12px" }}
            >
              {/* Success/Processing overlay */}
              {showSuccess && (
                <motion.div
                  className="absolute inset-0 bg-[#5170D5]/20 rounded-xl z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-full h-full rounded-xl border-2 border-[#5170D5]"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}

              {icon || (
                <div className="w-[72px] h-[72px] bg-white rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SwipeToUnlock;
