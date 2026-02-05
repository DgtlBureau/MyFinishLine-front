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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a]"
    >
      <motion.div
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/loading/logo-splash.svg"
          width={240}
          height={80}
          alt="MyFinishLine"
          priority
          style={{ width: "auto", height: "auto" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
