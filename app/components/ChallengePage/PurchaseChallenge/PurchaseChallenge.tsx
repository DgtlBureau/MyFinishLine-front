"use client";

import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { CurrencieSymbols, IPrice } from "@/app/types";
import { Button } from "../../ui/button";
import amazoniaImage from '@/public/images/landing/level-amazonia.webp'

interface IPurchaseChallengeProps {
  id: number;
  imageSrc: string;
  title: string;
  price: IPrice;
}

const features = [
  "1 year activation period",
  "Instant activation",
  "1 year warranty",
];

const PurchaseChallenge = ({
  title,
  id,
  price,
  imageSrc,
}: IPurchaseChallengeProps) => {
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
    <motion.div
      id="challenge-pricing"
      className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#B7B9E2] bg-white md:rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={title.toLocaleLowerCase() === 'amazonia route' ? amazoniaImage : imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[50%] backdrop-blur-sm"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      <div className="flex flex-col gap-4 px-5 py-6 md:gap-5 md:px-8 md:py-8">
        <h4 className="text-center text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
          <span className="bg-gradient-to-r from-[#3B559D] to-[#66AF69] bg-clip-text text-transparent">
            {title}
          </span>
        </h4>

        <ul className="space-y-2.5">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-sm text-muted-foreground md:text-base"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#65AE6A]">
                <Check className="size-3 text-white" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 pt-2">
          <span className="text-3xl font-semibold md:text-4xl">
            {CurrencieSymbols[price.currency]}
            {price.amount}
          </span>

          <Button
            asChild
            size="lg"
            className="w-full rounded-full before:rounded-full"
          >
            <Link href={"/payment?challenge_id=" + id}>
              Sign up now
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PurchaseChallenge;
