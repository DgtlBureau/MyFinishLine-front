"use client";

import { motion } from "motion/react";
import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import Image from "next/image";
import content from "@/app/lib/content/challenge-page/content";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface IChallengeProps {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
}

const ChallengeContent = ({
  id,
  title,
  description,
  image,
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

  return (
    <>
      <motion.div
        className="z-1 max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
      >
        <motion.div className="flex gap-16" variants={itemVariants}>
          <Image
            className="rounded-xl max-h-160 object-contain w-fit"
            src="/images/challenge-page/challenge1.jpg"
            alt={image.alt}
            width={1350}
            height={1688}
          />
          <section className="text-left">
            <motion.h2
              variants={itemVariants}
              className="text-2xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              {content.description_block.title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl"
            >
              {content.description_block.description}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl"
            >
              {content.description_block.description2}
            </motion.p>
            <Link
              href="/payment"
              className="uppercase text-2xl mx-auto w-fit mt-2 px-24 py-6 bg-foreground flex items-center gap-2 rounded text-background"
            >
              {content.description_block.button_label} <ChevronRight />
            </Link>
          </section>
        </motion.div>

        <section className="h-100"></section>
      </motion.div>
    </>
  );
};

export default ChallengeContent;
