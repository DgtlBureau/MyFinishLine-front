"use client";

import { motion } from "motion/react";

const PersonalizationSkeletonItem = ({ index }: { index: number }) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.3 }}
    className="relative rounded-2xl p-3 overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg"
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 via-white/5 to-white/15 pointer-events-none" />
    <div className="relative z-10">
      <div className="rounded-xl bg-white/20 h-40 overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="mt-3 h-4 w-24 rounded-lg bg-white/20 overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
      <div className="mt-2 h-10 rounded-xl bg-white/10 overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>
    </div>
  </motion.li>
);

const PersonalizationSkeleton = ({ count = 6 }: { count?: number }) => (
  <ul className="grid grid-cols-2 gap-2 mt-2">
    {Array.from({ length: count }).map((_, i) => (
      <PersonalizationSkeletonItem key={i} index={i} />
    ))}
  </ul>
);

export default PersonalizationSkeleton;
