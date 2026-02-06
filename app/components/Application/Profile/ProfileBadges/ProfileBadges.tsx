"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { IBadge } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/app/components/ui/modal/Modal";

const ProfileBadges = () => {
  const { completedContracts } = useAppSelector((state) => state.user);
  const challenge = useAppSelector((state) => state.challenge);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<IBadge | null>(null);

  // Collect all badges from completed contracts AND claimed badges from challenge steps
  const badges = useMemo(() => {
    const allBadges: IBadge[] = [];

    // Badges from completed contracts
    completedContracts.forEach((contract) => {
      if (contract.badges?.length) {
        allBadges.push(...contract.badges);
      }
    });

    // Claimed badges from challenge steps
    if (challenge.steps?.length) {
      challenge.steps.forEach((step) => {
        if (step.badges?.length) {
          const claimedBadges = step.badges.filter(b => b.is_claimed === true);
          allBadges.push(...claimedBadges);
        }
      });
    }

    return allBadges;
  }, [completedContracts, challenge.steps]);

  if (badges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-4 relative z-10 -ml-4 pr-4 self-start w-full"
    >
      <div
        ref={scrollRef}
        className="flex justify-start gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setSelectedBadge(badge)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-36 h-36 rounded-full">
              {badge.image_url ? (
                <Image
                  src={badge.image_url}
                  alt={badge.title || badge.name || 'Badge'}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-6xl">🏅</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Fade edge for scroll indication */}
      {badges.length > 4 && (
        <div className="absolute right-0 top-8 bottom-0 w-6 bg-gradient-to-l from-[#1a2a4a] to-transparent pointer-events-none" />
      )}

      {/* Badge Detail Modal - Rendered via Portal */}
      {selectedBadge && typeof window !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-screen h-screen fixed top-0 left-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center overflow-hidden"
          onClick={() => setSelectedBadge(null)}
        >
          {/* Badge container */}
          <motion.div
            ref={containerRef}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="relative z-10 flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Badge Image */}
            {selectedBadge.image_url ? (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={selectedBadge.image_url}
                  width={300}
                  height={300}
                  alt={selectedBadge.title || selectedBadge.name || 'Badge'}
                  className="drop-shadow-2xl"
                  draggable={false}
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-[300px] h-[300px] bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <span className="text-8xl">🏅</span>
              </motion.div>
            )}

            {/* Badge Title */}
            {(selectedBadge.title || selectedBadge.name) && (
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-white text-center"
              >
                {selectedBadge.title || selectedBadge.name}
              </motion.h3>
            )}

            {/* Badge Description */}
            {selectedBadge.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base text-white/70 text-center max-w-md px-4"
              >
                {selectedBadge.description}
              </motion.p>
            )}
          </motion.div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-20 text-white/60 text-sm"
          >
            Tap anywhere to close
          </motion.p>
        </motion.div>,
        document.body
      )}
    </motion.div>
  );
};

export default ProfileBadges;
