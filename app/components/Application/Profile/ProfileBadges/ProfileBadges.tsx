"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { IBadge } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

const ProfileBadges = () => {
  const { completedContracts } = useAppSelector((state) => state.user);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Collect all badges from completed contracts
  const badges = useMemo(() => {
    const allBadges: IBadge[] = [];
    completedContracts.forEach((contract) => {
      if (contract.badges?.length) {
        allBadges.push(...contract.badges);
      }
    });
    return allBadges;
  }, [completedContracts]);

  if (badges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-4 relative z-10"
    >
      <span className="text-[10px] text-white/70 font-medium tracking-wider block text-center mb-2">
        BADGES
      </span>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-2 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
            className="flex-shrink-0 snap-center"
          >
            <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-1 shadow-lg">
              {badge.image_url ? (
                <Image
                  src={badge.image_url}
                  alt={badge.name}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-xl">🏅</span>
                </div>
              )}
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
      {/* Fade edges for scroll indication */}
      {badges.length > 5 && (
        <>
          <div className="absolute left-0 top-6 bottom-0 w-8 bg-gradient-to-r from-[#1a2a4a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-6 bottom-0 w-8 bg-gradient-to-l from-[#1a2a4a] to-transparent pointer-events-none" />
        </>
      )}
    </motion.div>
  );
};

export default ProfileBadges;
