import { motion, useMotionValue } from "motion/react";
import { createPortal } from "react-dom";
import { useRef, useMemo } from "react";
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

  // Generate particles for sparkle effect
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      angle: (360 / 30) * i,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 0.5,
      distance: 150 + Math.random() * 100,
    }));
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen fixed top-0 left-0 bg-black/70 backdrop-blur-md z-100 flex items-center justify-center overflow-hidden"
      onClick={onCloseClick}
    >
      {/* Radial light rays */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
        animate={{ opacity: [0, 0.3, 0.3], scale: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 0.8, times: [0, 0.5, 1] },
          scale: { duration: 0.8 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute w-[600px] h-[600px]"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,215,0,0.3) 5%, transparent 10%, transparent 15%, rgba(255,215,0,0.2) 20%, transparent 25%, transparent 30%, rgba(255,215,0,0.3) 35%, transparent 40%, transparent 45%, rgba(255,215,0,0.2) 50%, transparent 55%, transparent 60%, rgba(255,215,0,0.3) 65%, transparent 70%, transparent 75%, rgba(255,215,0,0.2) 80%, transparent 85%, transparent 90%, rgba(255,215,0,0.3) 95%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Glowing circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: [0.5, 0.8, 0.5] }}
        transition={{
          scale: { duration: 0.6, ease: "backOut" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0.1) 50%, transparent 70%)',
        }}
      />

      {/* Sparkle particles */}
      {particles.map((particle) => {
        const x = Math.cos((particle.angle * Math.PI) / 180) * particle.distance;
        const y = Math.sin((particle.angle * Math.PI) / 180) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: [0, x],
              y: [0, y],
              opacity: [0, 1, 0]
            }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 rounded-full bg-yellow-300"
            style={{
              boxShadow: '0 0 8px 2px rgba(255,215,0,0.8)',
            }}
          />
        );
      })}

      {/* Medal container with 3D effect */}
      <motion.div
        ref={containerRef}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
        className="relative cursor-grab active:cursor-grabbing z-10"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => e.stopPropagation()}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {/* Pulsing glow behind medal */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 -z-10"
          style={{
            filter: 'blur(30px)',
            background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)',
          }}
        />

        {medalImage ? (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={medalImage}
              width={300}
              height={300}
              alt="Medal"
              className="drop-shadow-2xl"
              draggable={false}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <span className="text-6xl">🏅</span>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-20 text-white/60 text-sm"
      >
        Tap anywhere to continue
      </motion.p>
    </motion.div>,
    document.body
  );
};

export default AwardModal;
