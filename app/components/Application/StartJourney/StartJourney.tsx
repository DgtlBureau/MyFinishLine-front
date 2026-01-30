"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

interface StartJourneyProps {
  mode?: "choose" | "start";
  onStart?: () => void;
}

export default function StartJourney({
  mode = "choose",
  onStart,
}: StartJourneyProps) {
  if (mode === "start") {
    return (
      <div className="fixed inset-x-0 top-0 bottom-[var(--spacing)*15.75] z-30 flex flex-col items-center justify-center px-6 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 max-w-md text-center"
        >
          <div className="flex flex-col gap-3">
            <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Your quest is ready
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              Tap the button to reveal your map and begin your adventure.
            </p>
          </div>

          <button
            onClick={onStart}
            className="flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Play size={16} fill="white" />
            Start Quest
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{
        backgroundImage: "url('/images/Prototype/Frame 2147224088.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 max-w-md text-center"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight">
            Let&apos;s start a journey
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Choose your adventure quest and track your progress on an
            interactive map as you walk, run, or cycle.
          </p>
        </div>

        <Link
          href="/payment"
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/20 backdrop-blur-xl border border-white/30 rounded-full hover:bg-white/30 transition-colors"
        >
          Choose a Quest
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
