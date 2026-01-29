"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import ChallengesSwiper from "@/app/components/ChallengesSwiper/ChallengesSwiper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const authPages = ["/login", "/signup"];

const PolicyPageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  const isAuthPage = authPages.includes(pathname);
  const wasAuthPage = authPages.includes(prevPathRef.current);
  const isAuthTransition = isAuthPage && wasAuthPage;

  const direction =
    isAuthTransition && pathname === "/signup" ? -1 : isAuthTransition ? 1 : 0;

  if (prevPathRef.current !== pathname) {
    prevPathRef.current = pathname;
  }

  if (isAuthPage) {
    return (
      <section className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
        <div className="overflow-hidden relative">
          <Link
            href="/"
            className="hidden lg:flex absolute top-6 left-6 z-10 items-center gap-2 text-sm font-semibold text-white/90 hover:text-white hover:-translate-x-1 transition-all duration-300 active:scale-95 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Back
          </Link>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: direction * 150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -150 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          className="hidden lg:block relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.08, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <ChallengesSwiper />
        </motion.div>
      </section>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PolicyPageTransition;
