import { motion, useMotionValue } from "motion/react";
import { createPortal } from "react-dom";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface IAwardModalProps {
  onCloseClick: () => void;
  medalImage?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

const AwardModal = ({ onCloseClick, medalImage }: IAwardModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate confetti particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#4169E1", "#9370DB", "#3CB371"];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: Math.random() * 2 + 1,
        },
      });
    }
    setParticles(newParticles);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    rotateY.set(deltaX * 0.2);
    rotateX.set(-deltaY * 0.2);
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
      transition={{ duration: 0.3 }}
      className="w-screen h-screen fixed top-0 left-0 bg-black/80 backdrop-blur-lg z-100 flex flex-col items-center justify-center overflow-hidden"
      onClick={onCloseClick}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Confetti particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{ x: `${particle.x}vw`, y: `${particle.y}vh` }}
          animate={{
            x: `${particle.x + particle.velocity.x * 50}vw`,
            y: "120vh",
            rotate: 360 * 3,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="mb-6 text-center relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3, delay: 0.3 }}
          className="inline-block"
        >
          <Sparkles className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Congratulations!
        </h2>
        <p className="text-lg text-white/80">Achievement Unlocked</p>
      </motion.div>

      {/* Medal container with glow effect */}
      <motion.div
        ref={containerRef}
        className="relative cursor-grab active:cursor-grabbing z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 150,
          damping: 12,
        }}
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
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)",
          }}
        />

        {/* Medal */}
        {medalImage ? (
          <div className="relative">
            <Image
              src={medalImage}
              width={280}
              height={280}
              alt="Medal"
              className="drop-shadow-2xl relative z-10"
              draggable={false}
            />
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                  "linear-gradient(225deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        ) : (
          <div className="relative">
            <div className="w-72 h-72 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-8 border-yellow-300/50">
              <span className="text-8xl">🏅</span>
            </div>
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-yellow-400/30"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transform: "scale(1.1)",
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-16 md:bottom-20 text-white/70 text-sm md:text-base z-10"
      >
        Tap anywhere to close
      </motion.p>
    </motion.div>,
    document.body
  );
};

export default AwardModal;
