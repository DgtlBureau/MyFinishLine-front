"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Extract base route for animation key (e.g., /app/contracts/all → contracts)
  // This prevents animation when switching tabs within the same section
  const pathParts = pathname.split("/").filter(Boolean);
  const baseRoute = pathParts.length >= 2 ? pathParts[1] : pathname;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={baseRoute}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
