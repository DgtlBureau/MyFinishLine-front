"use client";

import { motion } from "motion/react";
import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import ImageTextBlock from "./ImageTextBlock/ImageTextBlock";

interface IChallengeProps {
  content: {
    id: number;
    title: string;
    image: string;
    paragraphs: { id: number; text: string }[];
  }[];
}

const ChallengeContent = ({ content = [] }: IChallengeProps) => {
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

  return (
    <motion.div
      className="z-1 max-w-6xl mx-auto text-center px-4 md:px-2"
      variants={containerVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
    >
      <motion.div className="flex flex-col gap-16">
        {content.map((item, index) => (
          <ImageTextBlock
            key={item.id}
            title={item.title}
            image={item.image}
            paragraphs={item.paragraphs}
            reversed={index % 2 === 0}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ChallengeContent;
