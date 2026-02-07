"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Loader2 } from "lucide-react";

interface StartJourneyProps {
  mode?: "choose" | "start";
  onStart?: () => void | Promise<void>;
  isLoading?: boolean;
  challengeName?: string;
  challengeLogo?: string | null;
}

export default function StartJourney({
  mode = "choose",
  onStart,
  isLoading = false,
  challengeName,
  challengeLogo,
}: StartJourneyProps) {
  if (mode === "start") {
    return (
      <div className="fixed inset-0 z-30 flex flex-col items-center justify-center px-6 pb-[63px]" style={{ height: '100dvh' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 max-w-md text-center"
        >
          {challengeLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 mb-2"
            >
              <Image
                src={challengeLogo}
                alt={challengeName || "Challenge"}
                fill
                className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          )}
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
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Starting...
              </>
            ) : (
              <>
                <Play size={16} fill="white" />
                Start Quest
              </>
            )}
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
