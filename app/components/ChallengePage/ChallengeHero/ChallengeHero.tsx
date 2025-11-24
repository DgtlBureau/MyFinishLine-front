"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import Image from "next/image";
import { Button } from "../../ui/button";

interface IChallengeProps {
  id: number;
  title: string;
  description: string;
  distance: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
}

const ChallengeHero = ({
  id,
  title,
  description,
  image,
  distance,
}: IChallengeProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation variants
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

  const overlayVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        delay: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <motion.div
        className="z-1 container text-center"
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl"
        >
          {distance}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl"
        >
          {description}
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="mt-2 rounded-full pl-5.5! before:rounded-full"
          >
            Sign up now
            <div className="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-full border">
              <ChevronRight className="size-4" />
            </div>
          </Button>
        </motion.div>

        <motion.div
          variants={imageVariants}
          className="bg-background/45 border-background relative mt-10 justify-self-end overflow-hidden rounded-t-xl border p-2 md:mt-20 md:rounded-t-3xl md:p-4 lg:mt-25 mx-auto"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            className="border-background/45 rounded-t-sm md:rounded-t-xl w-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default ChallengeHero;
