"use client";

import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { IProduct } from "@/app/types";
import Link from "next/link";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/effect-creative";

interface ChallengeItem {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  logo_url: string | null;
  price: number | null;
  currency: string | null;
  product_id: string | null;
  paddle_price_id: string | null;
  total_distance: number;
  total_distance_mile: number;
  status: { id: number; name: string; type: string };
}

function useIsImperial() {
  if (typeof navigator === "undefined") return false;
  const lang = navigator.language || "";
  return ["en-US", "en-GB", "en-MM", "en-LR"].some((l) => lang.startsWith(l));
}

function formatLandingDistance(meters: number, miles: number, imperial: boolean): string {
  if (imperial) return `${Math.round(miles)} mi`;
  return `${(meters / 1000).toFixed(0)} km`;
}

const formatPrice = (amount: string, currency: string) => {
  const num = Number(amount) / 100;
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "\u20AC" : currency;
  return `${symbol}${num.toFixed(num % 1 === 0 ? 0 : 2)}`;
};

const StatusBadge = ({ type }: { type: string }) => {
  if (type === "coming_soon") {
    return (
      <div className="absolute top-4 md:top-9 left-4 md:left-9 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
        <Clock size={14} className="text-white/80" />
        <span className="font-medium text-xs md:text-sm text-white">Coming Soon</span>
      </div>
    );
  }
  return (
    <div className="absolute top-4 md:top-9 left-4 md:left-9 flex items-center gap-1.5 bg-green-500/30 backdrop-blur-md rounded-full px-3 py-1.5 border border-green-400/40">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="font-medium text-xs md:text-sm text-white">Active</span>
    </div>
  );
};

function ChallengeCard({ challenge }: { challenge: ChallengeItem }) {
  const isComingSoon = challenge.status?.type === "coming_soon";
  const imperial = useIsImperial();

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden">
      {challenge.image_url ? (
        <Image
          src={challenge.image_url}
          alt={challenge.name}
          fill
          className={`object-cover object-top ${isComingSoon ? "blur-[12px] scale-105" : ""}`}
          quality={85}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B5CC6] to-[#4DA67A]" />
      )}

      {/* Gradient overlay - bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: isComingSoon
            ? "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      {/* Edge blur - left, right, top */}
      <div className="absolute -inset-1 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(26,42,74,1) 0%, rgba(26,42,74,0.6) 10%, transparent 25%),
          linear-gradient(to left, rgba(26,42,74,1) 0%, rgba(26,42,74,0.6) 10%, transparent 25%),
          linear-gradient(to bottom, rgba(26,42,74,0.8) 0%, transparent 15%)
        `,
      }} />

      {/* Status Badge */}
      <StatusBadge type={challenge.status?.type} />

      {/* Distance Badge */}
      {challenge.total_distance > 0 && (
        <div className="absolute top-14 md:top-20 left-4 md:left-9 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
          <span className="font-medium text-xs md:text-sm text-white">
            {formatLandingDistance(challenge.total_distance, challenge.total_distance_mile, imperial)}
          </span>
        </div>
      )}

      {/* Bottom Content */}
      <div className="absolute left-4 md:left-9 right-4 md:right-9 bottom-4 md:bottom-9 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full sm:max-w-[405px]">
          <div className="flex flex-col gap-1 md:gap-1.5 text-white">
            <h3 className="font-semibold text-lg sm:text-xl md:text-2xl leading-tight">
              {challenge.name}
            </h3>
            {challenge.description && (
              <p className="text-white/80 text-xs sm:text-sm leading-5 md:leading-6 line-clamp-2">
                {challenge.description}
              </p>
            )}
          </div>
          {!isComingSoon && (
            <Link
              href={`/challenges/${challenge.id}`}
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white bg-white/20 backdrop-blur-xl border border-white/30 rounded-md w-fit hover:bg-white/30 transition-colors"
            >
              Choose a Quest
              <ArrowRight size={14} className="md:w-4 md:h-4" />
            </Link>
          )}
          {isComingSoon && (
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white/60 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md w-fit">
              <Clock size={14} />
              Coming Soon
            </div>
          )}
        </div>
        {!isComingSoon && challenge.price != null && challenge.price > 0 && (
          <span className="font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-[-1.44px] leading-none">
            {challenge.currency === "EUR" ? "\u20AC" : "$"}{challenge.price}
          </span>
        )}
      </div>
    </div>
  );
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const price = product.prices;
  const challenge = product.challenge_info;
  const name = challenge?.name || product.name;
  const imageUrl = product.main_image || product.images || "";

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover object-top"
          quality={85}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B5CC6] to-[#4DA67A]" />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {challenge?.image_url && (
        <div className="absolute top-4 md:top-9 right-4 md:right-9 w-[120px] sm:w-[160px] md:w-[200px]">
          <Image
            src={challenge.image_url}
            alt={name}
            width={200}
            height={90}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {Number(challenge?.total_distance ?? 0) > 0 && (
        <div className="absolute top-4 md:top-9 left-4 md:left-9 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
          <span className="font-medium text-xs md:text-sm text-white">
            {formatLandingDistance(Number(challenge!.total_distance), Number(challenge!.total_distance_mile), useIsImperial())}
          </span>
        </div>
      )}

      <div className="absolute left-4 md:left-9 right-4 md:right-9 bottom-4 md:bottom-9 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full sm:max-w-[405px]">
          <div className="flex flex-col gap-1 md:gap-1.5 text-white">
            <h3 className="font-semibold text-lg sm:text-xl md:text-2xl leading-tight">
              {name}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-5 md:leading-6 line-clamp-2">
              {product.description}
            </p>
          </div>
          <Link
            href={"/challenges/" + (challenge?.id || 1)}
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white bg-white/20 backdrop-blur-xl border border-white/30 rounded-md w-fit hover:bg-white/30 transition-colors"
          >
            Choose a Quest
            <ArrowRight size={14} className="md:w-4 md:h-4" />
          </Link>
        </div>
        {price && (
          <span className="font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-[-1.44px] leading-none">
            {formatPrice(price.amount, price.currency)}
          </span>
        )}
      </div>
    </div>
  );
};

export default function QuestSelection() {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);


  useEffect(() => {
    axios
      .get("/api/challenges/list")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          const filtered = data.filter(
            (c: ChallengeItem) =>
              c.status?.type === "active" || c.status?.type === "coming_soon",
          );
          filtered.sort((a: ChallengeItem, b: ChallengeItem) => {
            if (a.status?.type === "active" && b.status?.type !== "active") return -1;
            if (a.status?.type !== "active" && b.status?.type === "active") return 1;
            return 0;
          });
          setChallenges(filtered);
        }
      })
      .catch(() => {});
  }, []);

  // Use challenges list as primary data source, fall back to products
  const hasChallenges = challenges.length > 0;
  const hasProducts = products.length > 0;

  if (!hasChallenges && !hasProducts) return null;

  return (
    <section
      className="flex flex-col items-center py-12 md:py-24 w-full"
      id="challenges"
    >
      <div className="flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4 md:gap-6 items-center px-4 md:px-24 py-6 md:py-10 w-full"
        >
          <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[500px] w-full">
            <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[60px] text-center tracking-[-1px] md:tracking-[-2.4px] leading-tight md:leading-none">
              <span className="text-white">Choose Your </span>
              <span
                className="bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(126deg, rgb(59, 85, 157) 0%, rgb(102, 175, 105) 101%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Adventure Quest
              </span>
            </h2>
            <p className="font-normal text-base md:text-[20px] text-center text-white/60 leading-relaxed md:leading-7">
              Become the protagonist of an amazing adventure. Reach the end and
              claim your reward.
            </p>
          </div>
        </motion.div>

        {/* Swiper with quest cards */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-[1100px] mx-auto px-4 overflow-visible"
        >
          <Swiper
            modules={[EffectCreative, Autoplay]}
            effect="creative"
            creativeEffect={{
              prev: {
                translate: ["-110%", 0, -200],
                scale: 0.8,
                opacity: 0.5,
              },
              next: {
                translate: ["110%", 0, -200],
                scale: 0.8,
                opacity: 0.5,
              },
              limitProgress: 3,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            initialSlide={0}
            slidesPerView={1}
            speed={600}
            grabCursor
            className="w-full !overflow-visible"
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            {hasChallenges
              ? (() => {
                  const slides = [...challenges];
                  while (slides.length < 3) {
                    slides.push(...challenges);
                  }
                  return slides.map((challenge, idx) => (
                    <SwiperSlide key={`${challenge.id}-${idx}`}>
                      <ChallengeCard challenge={challenge} />
                    </SwiperSlide>
                  ));
                })()
              : (() => {
                  const slides = [...products];
                  while (slides.length < 3) {
                    slides.push(...products);
                  }
                  return slides.map((product, index) => (
                    <SwiperSlide key={`${product.challenge_info?.id || product.paddle_product_id}-${index}`}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ));
                })()}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
