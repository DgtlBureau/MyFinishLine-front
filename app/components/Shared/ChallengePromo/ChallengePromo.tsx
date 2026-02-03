"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ArrowRight, Clock, Route } from "lucide-react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

interface ChallengeItem {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  currency: string | null;
  total_distance: number;
  total_distance_mile: number;
  status: { id: number; name: string; type: string };
}

function ChallengeCard({ challenge }: { challenge: ChallengeItem }) {
  const isActive = challenge.status?.type === "active";

  return (
    <Link
      href={isActive ? `/challenges/${challenge.id}` : "#"}
      className="group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-end"
    >
      {challenge.image_url ? (
        <Image
          src={challenge.image_url}
          alt={challenge.name}
          fill
          className={`object-cover object-top transition-transform duration-500 group-hover:scale-105 ${!isActive ? "blur-[6px] scale-105" : ""}`}
          quality={75}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B5CC6] to-[#4DA67A]" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2">
            <Clock className="size-4 text-white/80" />
            <span className="text-sm font-medium text-white/80">Coming Soon</span>
          </div>
        </div>
      )}
      <div className="relative z-10 p-3">
        <h4 className="text-sm font-semibold text-white leading-tight truncate">{challenge.name}</h4>
      </div>
    </Link>
  );
}

export default function ChallengePromo() {
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);

  useEffect(() => {
    axios
      .get("/api/challenges/list")
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setChallenges(data.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  if (challenges.length === 0) return null;

  // Ensure at least 3 slides for loop
  const slides = challenges.length >= 3
    ? challenges
    : [...challenges, ...challenges, ...challenges].slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-8 w-full lg:hidden"
    >
      <p className="text-center text-white text-xl font-semibold mb-4">Choose your adventure</p>
      <div className="w-full overflow-visible">
        <Swiper
          modules={[EffectCreative, Autoplay]}
          effect="creative"
          creativeEffect={{
            prev: {
              translate: ["-105%", 0, -80],
              scale: 0.85,
              opacity: 0.6,
            },
            next: {
              translate: ["105%", 0, -80],
              scale: 0.85,
              opacity: 0.6,
            },
            limitProgress: 3,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          slidesPerView={1}
          speed={600}
          grabCursor
          className="w-full !overflow-visible"
          style={{ maxWidth: "280px", margin: "0 auto" }}
        >
          {slides.map((challenge, idx) => (
            <SwiperSlide key={`${challenge.id}-${idx}`}>
              <ChallengeCard challenge={challenge} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}
