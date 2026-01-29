"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";

interface IProgressLineProps {
  progress: number;
}

const ProgressLine = ({ progress }: IProgressLineProps) => {
  const [showGold, setShowGold] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const lastProgress = useRef<number | null>(null);

  // Ensure progress is a valid number
  const safeProgress = isNaN(progress) || progress === null || progress === undefined ? 0 : progress;
  const isFullProgress = safeProgress >= 100;

  // Spring animation for smooth progress
  const motionProgress = useMotionValue(0);
  const smoothProgress = useSpring(motionProgress, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  // Transform for width percentage
  const progressWidth = useTransform(smoothProgress, (value) =>
    `calc(${Math.min(value, 100)}% - 4px)`
  );

  useEffect(() => {
    // Only animate if progress actually changed
    if (lastProgress.current === safeProgress) return;
    lastProgress.current = safeProgress;

    // Small delay before starting animation
    const startDelay = setTimeout(() => {
      motionProgress.set(safeProgress);
    }, 200);

    // Show gold effect when complete
    if (isFullProgress) {
      const goldDelay = setTimeout(() => setShowGold(true), 1800);
      return () => {
        clearTimeout(startDelay);
        clearTimeout(goldDelay);
      };
    }

    return () => clearTimeout(startDelay);
  }, [safeProgress, isFullProgress, motionProgress]);

  // Update display value from spring
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      setDisplayValue(value);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <div className="w-full h-7 flex items-center shadow-lg rounded-3xl relative bg-white border border-white/50 p-1 overflow-hidden">
      {/* Progress fill */}
      <motion.div
        className={`flex items-center text-white justify-end pr-1 absolute h-5 left-1 rounded-3xl overflow-hidden ${
          showGold
            ? "bg-gradient-to-r from-[#FFD700] via-[#DAA520] to-[#B8860B] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1)]"
            : "bg-gradient-to-r from-[#3a559b] to-[#66af69]"
        }`}
        style={{
          width: progressWidth,
          minWidth: displayValue > 0 ? '20px' : '0'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Shimmer effect for non-complete progress */}
        {!showGold && displayValue > 0 && (
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            }}
          />
        )}

        {/* Gold shine effect when complete */}
        {showGold && (
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
            }}
          />
        )}
      </motion.div>

      {/* Percentage text */}
      <motion.span
        className={`absolute text-[13px] font-bold leading-5 tabular-nums ${
          showGold
            ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
        }`}
        style={{
          left: "50%",
          x: "-50%",
        }}
        animate={{
          color: displayValue > 40 ? "white" : (showGold ? "#996515" : "#3a559b"),
        }}
        transition={{ duration: 0.3 }}
      >
        {(isNaN(displayValue) ? 0 : displayValue).toFixed(1)}%
      </motion.span>
    </div>
  );
};

export default ProgressLine;
