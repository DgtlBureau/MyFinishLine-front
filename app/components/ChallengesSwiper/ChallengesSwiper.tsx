"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-creative";
import Link from "next/link";
import axios from "axios";

interface ChallengeItem {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  logo_url: string | null;
  price: number | null;
  currency: string | null;
  total_distance: number;
  status: { id: number; name: string; type: string };
}

const ChallengeCard = ({ challenge }: { challenge: ChallengeItem }) => {
  const isComingSoon = challenge.status?.type === "coming_soon";

  return (
    <div className="relative w-full h-full min-h-svh overflow-hidden">
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

      <div
        className="absolute inset-0"
        style={{
          background: isComingSoon
            ? "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {isComingSoon ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-lg shadow-white/10">
              <AnimatedClock size={44} />
            </div>
            <span className="text-white font-bold text-3xl lg:text-4xl tracking-tight drop-shadow-lg">
              Coming Soon
            </span>
            <span className="text-white/50 text-sm font-medium tracking-wide">
              New quests are on the way
            </span>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 rounded-t-3xl p-8 lg:p-10 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl lg:text-4xl text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {challenge.name}
            </h3>
            {challenge.description && (
              <p className="text-white/90 text-sm lg:text-base leading-relaxed line-clamp-2 font-medium">
                {challenge.description}
              </p>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              {challenge.price != null && challenge.price > 0 && (
                <span className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-white font-bold text-sm">
                  {challenge.currency === "EUR" ? "\u20AC" : "$"}{challenge.price}
                </span>
              )}
              {challenge.total_distance > 0 && (
                <span className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-white/80 font-medium text-sm">
                  {(challenge.total_distance / 1000).toFixed(0)} km
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/challenges/${challenge.id}`}
            className="group flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl w-full hover:bg-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 tracking-wide"
          >
            Explore
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

const AnimatedClock = ({ size = 28 }: { size?: number }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondAngle = (seconds % 60) * 6;
  const minuteAngle = ((seconds / 60) % 60) * 6;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/70"
    >
      <circle cx="12" cy="12" r="10" />
      <line
        x1="12"
        y1="12"
        x2={12 + 4 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={12 - 4 * Math.cos((minuteAngle * Math.PI) / 180)}
      />
      <line
        x1="12"
        y1="12"
        x2={12 + 5.5 * Math.sin((secondAngle * Math.PI) / 180)}
        y2={12 - 5.5 * Math.cos((secondAngle * Math.PI) / 180)}
        strokeWidth="1.5"
      />
    </svg>
  );
};


const ChallengesSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
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
          setChallenges(filtered);
        }
      })
      .catch(() => {});
  }, []);

  const hasChallenges = challenges.length > 0;

  return (
    <Swiper
      modules={[EffectCreative, Autoplay]}
      effect="creative"
      creativeEffect={{
        prev: {
          translate: ["-20%", 0, -200],
          opacity: 0,
        },
        next: {
          translate: ["20%", 0, -200],
          opacity: 0,
        },
        limitProgress: 2,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={challenges.length > 1}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="w-full h-full"
      spaceBetween={0}
      slidesPerView={1}
      speed={800}
      grabCursor
    >
      {hasChallenges &&
        challenges.map((challenge) => (
          <SwiperSlide key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ChallengesSwiper;
