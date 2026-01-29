"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/Prototype/Frame 2147224088.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center">
        <Image
          src="/images/loading/logo-state-1.png"
          width={220}
          height={70}
          alt="MyFinishLine"
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-[#CEE9D8] -ml-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0.3, 1, 0.3, 1],
            scale: [0, 1, 0.9, 1, 0.9, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
