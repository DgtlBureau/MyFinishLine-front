"use client";

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
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 25,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.li
      className={`flex flex-col overflow-hidden rounded-2xl border border-[#B7B9E2] bg-white md:flex-row md:rounded-3xl ${reversed ? "md:flex-row-reverse" : ""
        }`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative aspect-[4/3] w-full md:aspect-[37/32] md:w-1/2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col justify-center gap-4 px-5 py-6 md:w-1/2 md:gap-6 md:p-8 lg:p-12">
        <h2 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-[#3B559D] to-[#66AF69] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        <div className="space-y-3 md:space-y-4">
          {paragraphs.map((p) => (
            <p
              key={p.id}
              className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg"
            >
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </motion.li>
  );
};

export default ImageTextBlock;
