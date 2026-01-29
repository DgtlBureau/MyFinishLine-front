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
  image: string;
}

const ChallengeHero = ({
  title,
  description,
  image,
  distance,
}: IChallengeProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 25,
        mass: 1,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="relative px-4 md:px-2 pt-30 flex flex-col gap-6 items-center z-1 text-center rounded-sm overflow-hidden aspect-[1/2] sm:aspect-[1/1] md:aspect-[16/9] w-full"
      variants={containerVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
    >
      <Image src={title.toLocaleLowerCase() === 'amazonia route' ? challengeImage : image} width={1000} height={800} alt="challenge" className="absolute top-0 left-0 object-cover w-full h-full" />
      <div className="absolute w-full h-full bg-gradient-to-b from-white/20 to-black/20" />
      {distance && <motion.div
        variants={itemVariants}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
      >
        <Route className="size-4" />
        <span>{distance}</span>
      </motion.div>}

      <motion.h1
        variants={itemVariants}
        className="text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mx-auto my-3 max-w-2xl text-md md:my-5 md:text-lg lg:my-6 lg:text-xl"
      >
        {description}
      </motion.p>

      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  );
};

export default ChallengeHero;
