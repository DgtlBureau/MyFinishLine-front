import { motion, useMotionValue, useTransform } from "motion/react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import Image from "next/image";

interface IAwardModalProps {
  onCloseClick: () => void;
  medalImage?: string;
}

const AwardModal = ({ onCloseClick, medalImage }: IAwardModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    rotateY.set(deltaX * 0.3);
    rotateX.set(-deltaY * 0.3);
  };

  const handlePointerLeave = () => {
    rotateY.set(0);
    rotateX.set(0);
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen fixed top-0 left-0 bg-black/70 backdrop-blur-md z-100 flex items-center justify-center"
      onClick={onCloseClick}
    >
      <motion.div
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => e.stopPropagation()}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {medalImage ? (
          <Image
            src={medalImage}
            width={300}
            height={300}
            alt="Medal"
            className="drop-shadow-2xl"
            draggable={false}
          />
        ) : (
          <div className="w-64 h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-6xl">🏅</span>
          </div>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 text-white/60 text-sm"
      >
        Tap anywhere to close
      </motion.p>
    </motion.div>,
    document.body
  );
};

export default AwardModal;
