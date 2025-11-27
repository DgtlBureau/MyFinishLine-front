import { motion } from "motion/react";
import Image from "next/image";

interface IImageTextBlockProps {
  reversed?: boolean;
  title: string;
  image: string;
  paragraphs: { id: number; text: string }[];
}

const ImageTextBlock = ({
  image,
  title,
  paragraphs,
  reversed,
}: IImageTextBlockProps) => {
  return (
    <li
      className={`flex flex-col gap-12 md:flex-row list-none ${
        reversed && "md:flex-row-reverse"
      }`}
    >
      <motion.div
        className="h-full relative max-h-140 flex-1"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{
          type: "spring" as const,
          stiffness: 100,
          damping: 25,
          mass: 1,
          duration: 0.6,
        }}
        viewport={{ once: true }}
      >
        <Image
          className="rounded-xl object-cover h-full max-h-140"
          src={image}
          alt={"Challenge " + title}
          width={1350}
          height={1688}
        />
      </motion.div>
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{
          type: "spring" as const,
          stiffness: 100,
          damping: 25,
          mass: 1,
          duration: 0.6,
        }}
        viewport={{ once: true }}
        className="text-left flex-1"
      >
        <h2 className="text-2xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {paragraphs.map((p) => (
          <p
            key={p.id}
            className="text-muted-foreground my-2 text-sm md:my-4 md:text-lg lg:my-6 lg:text-xl"
          >
            {p.text}
          </p>
        ))}
      </motion.section>
    </li>
  );
};

export default ImageTextBlock;
