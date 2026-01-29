"use client";

import usePrefersReducedMotion from "@/app/hooks/usePrefersReducedMotion";
import { motion } from "motion/react";
import Noise from "../Noise/noise";
import { ReactNode } from "react";

interface ILumenBackgroundBlockProps {
  className?: string;
  children: ReactNode;
}

const LumenBackgroundBlock = ({
  children,
  className,
}: ILumenBackgroundBlockProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

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

  return (
    <section
      className={`section-padding relative border-none relative flex flex-col items-center bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat pb-0! dark:bg-[url(/images/gradient-dark.webp)] ${className}`}
    >
      <motion.div
        variants={overlayVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        className="from-background/30 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent"
      />
      <Noise />
      {children}
      <div className="from-background pointer-events-none absolute inset-0 bg-linear-to-t via-transparent via-25% to-transparent" />
    </section>
  );
};

export default LumenBackgroundBlock;
