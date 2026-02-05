"use client";

import { Route } from "lucide-react";
import { motion } from "motion/react";
import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import Image from "next/image";
import challengeImage from "@/public/images/landing/quest.webp";

interface IChallengeProps {
  title: string;
  description: string;
  distance?: string | undefined;
  distanceMile?: number;
  image: string;
}

function useIsImperial() {
  if (typeof navigator === "undefined") return false;
  const lang = navigator.language || "";
  return ["en-US", "en-GB", "en-MM", "en-LR"].some((l) => lang.startsWith(l));
}

const ChallengeHero = ({
  title,
  description,
  image,
  distance,
  distanceMile,
}: IChallengeProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        mass: 1,
        duration: 0.7,
      },
    },
  };

  return (
    <motion.div
      className="relative px-6 md:px-12 lg:px-16 pt-28 pb-12 flex flex-col gap-4 items-start z-1 text-left rounded-sm overflow-hidden aspect-[3/4] sm:aspect-[16/9] md:aspect-[2.5/1] w-full"
      variants={containerVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
    >
      <Image src={title.toLocaleLowerCase() === 'amazonia route' ? challengeImage : image} width={1000} height={800} alt="challenge" className="absolute top-0 left-0 object-cover w-full h-full object-[center_35%]" />

      {/* Edge blur overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a4a]/70 via-transparent to-[#1a2a4a]/50" />
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#1a2a4a]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#1a2a4a] via-[#1a2a4a]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 mt-auto max-w-2xl">
        {distance && <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-1.5 text-sm text-white/80 w-fit"
        >
          <Route className="size-4" />
          <span>{useIsImperial() && distanceMile ? `${distanceMile >= 100 ? distanceMile.toLocaleString('en-US', { maximumFractionDigits: 0 }) : distanceMile.toFixed(2)} mi` : `${(Number(distance) / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} km`}</span>
        </motion.div>}

        <motion.h1
          variants={itemVariants}
          className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-sm md:text-base lg:text-lg text-white/80 leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ChallengeHero;
