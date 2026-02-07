import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface IStorySlideProps {
  id: number;
  image_url: string;
  onImageLoad?: () => void;
}

const StorySlide = ({ id, image_url, onImageLoad }: IStorySlideProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    onImageLoad?.();
  };

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative w-full h-full"
    >
      {/* Shimmer skeleton while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-shimmer"
             style={{
               backgroundSize: '200% 100%',
               animation: 'shimmer 2s infinite linear'
             }}>
          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      )}

      <Image
        className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        src={image_url}
        fill
        alt="Story"
        priority
        sizes="(max-width: 1080px) 100vw, 1080px"
        onLoad={handleImageLoad}
      />
    </motion.div>
  );
};

export default StorySlide;
