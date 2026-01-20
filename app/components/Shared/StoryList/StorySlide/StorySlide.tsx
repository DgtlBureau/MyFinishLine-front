import { motion } from "motion/react";
import Image from "next/image";

interface IStorySlideProps {
  id: number;
  image_url: string;
}

const StorySlide = ({ id, image_url }: IStorySlideProps) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative w-full h-full"
    >
      <Image
        className="w-full h-full object-contain"
        src={image_url}
        fill
        alt="Story"
        priority
        sizes="(max-width: 1080px) 100vw, 1080px"
      />
    </motion.div>
  );
};

export default StorySlide;
