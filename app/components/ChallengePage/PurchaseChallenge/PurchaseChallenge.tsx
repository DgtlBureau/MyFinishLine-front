"use client";

import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { CurrencieSymbols, IPrice } from "@/app/types";
import amazoniaImage from "@/public/images/landing/level-amazonia.webp";

interface IPurchaseChallengeProps {
  id: string | number;
  imageSrc: string;
  title: string;
  description?: string;
  distance?: string;
  distanceMile?: number;
  price: IPrice | null;
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
  description,
  distance,
  distanceMile,
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

  const priceDisplay =
    price && Number(price.amount) > 0
      ? `${CurrencieSymbols[price.currency]}${(Number(price.amount) / 100).toFixed(Number(price.amount) % 100 === 0 ? 0 : 2)}`
      : null;

  return (
    <motion.div
      id="challenge-pricing"
      className="mx-auto w-full max-w-md overflow-hidden md:max-w-4xl md:flex md:flex-row-reverse md:items-center md:gap-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden md:aspect-[3/4] md:w-[45%] md:min-h-[400px]">
        <Image
          src={
            title.toLocaleLowerCase() === "amazonia route"
              ? amazoniaImage
              : imageSrc
          }
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-l md:from-black/20 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 px-2 py-7 md:w-[55%] md:gap-6 md:px-0 md:py-0 md:justify-center">
        <h4 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] tracking-tight">
          {title}
        </h4>

        {description && (
          <p className="text-sm md:text-base text-white/60 leading-relaxed">
            {description}
          </p>
        )}

        {distance && (
          <p className="text-sm md:text-base text-white/70 font-medium">
            {(Number(distance) / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} km{distanceMile ? ` / ${distanceMile >= 100 ? distanceMile.toLocaleString('en-US', { maximumFractionDigits: 0 }) : distanceMile.toFixed(2)} mi` : ""}
          </p>
        )}

        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-sm text-white/70 md:text-base"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4DA67A]/80">
                <Check className="size-3 text-white" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 pt-2">
          {priceDisplay && (
            <span className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] md:text-5xl">
              {priceDisplay}
            </span>
          )}

          <Link
            href={"/payment?challenge_id=" + id}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl overflow-hidden bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full md:w-auto"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Sign up now</span>
            <ArrowRight className="relative z-10 size-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PurchaseChallenge;
