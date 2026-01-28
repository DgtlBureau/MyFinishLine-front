"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  skeleton?: ReactNode;
  isLoading?: boolean;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({
  children,
  skeleton,
  isLoading = false,
  delay = 0,
  className = "",
}: AnimatedSectionProps) => {
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
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLoading && skeleton) {
    return <div className={className}>{skeleton}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      ) : (
        skeleton || <div style={{ minHeight: "100px" }} />
      )}
    </div>
  );
};

export default AnimatedSection;
