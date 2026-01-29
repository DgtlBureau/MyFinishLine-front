"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PolicyFooter = ({ title }: { title: string }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border-t border-[#1a1a2e]/10 pt-8 mt-8 flex flex-col items-center gap-3"
    >
      {isInView ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <Image
              src="/images/logo-line.png"
              width={957}
              height={489}
              alt="MyFinishLine"
              className="h-6 w-auto"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#1a1a2e]/40 text-sm font-medium"
          >
            {title}
          </motion.p>
        </>
      ) : (
        <div className="h-16" />
      )}
    </div>
  );
};

export default PolicyFooter;
