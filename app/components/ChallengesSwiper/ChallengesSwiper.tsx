"use client";

import { useEffect, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-creative";
import Link from "next/link";
import axios from "axios";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { IProduct } from "@/app/types";

const ChallengeCard = ({ product }: { product: IProduct }) => {
  const price = product.prices;
  const challenge = product.challenge_info;

  if (!challenge) return null;

  return (
    <div className="relative w-full h-full min-h-svh overflow-hidden">
      {/* Background Image */}
      <Image
        src={product.main_image || ""}
        alt={challenge?.name || ""}
        fill
        className="object-cover"
        quality={85}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Challenge Logo */}
      {challenge.image_url && (
        <div className="absolute top-8 right-8 w-[140px] lg:w-[180px]">
          <Image
            src={challenge.image_url}
            alt={challenge.name}
            width={180}
            height={80}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Distance Badge */}
      <div className="absolute top-8 left-8 flex items-center gap-1.5 bg-white/20 backdrop-blur-xl rounded-full px-4 py-2.5 border border-white/30">
        <span className="font-bold text-sm text-white tracking-wide">
          {challenge.total_distance} km
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 flex flex-col gap-5">
        <div className="bg-white/15 backdrop-blur-2xl rounded-2xl border border-white/20 p-5 lg:p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="font-bold text-2xl lg:text-3xl text-white leading-tight tracking-tight">
                {challenge.name}
              </h3>
              <p className="text-white/70 text-sm lg:text-base leading-relaxed line-clamp-2 font-medium">
                {product.description}
              </p>
            </div>
            {price && (
              <span className="font-bold text-3xl lg:text-4xl text-white tracking-tight shrink-0">
                ${price.amount}
              </span>
            )}
          </div>
        </div>

        <Link
          href={"/challenges/" + challenge.id}
          className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/25 backdrop-blur-xl border border-white/30 rounded-2xl w-full hover:bg-white/35 transition-all tracking-wide"
        >
          Choose a Quest
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const ComingSoonCard = () => {
  return (
    <div className="relative w-full h-full min-h-svh overflow-hidden bg-gradient-to-br from-[#3B5CC6]/40 via-[#5C9BB8]/30 to-[#4DA67A]/40">
      <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
          <Clock className="w-7 h-7 text-white/70" />
        </div>
        <span className="text-white/80 font-bold text-xl tracking-tight">Coming Soon</span>
        <span className="text-white/50 text-sm font-medium">New quests are on the way</span>
      </div>
    </div>
  );
};

const ChallengesSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleLoadChallenges = async () => {
    try {
      const { data } = await axios.get("/api/payment/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadChallenges();
  }, []);

  const hasProducts = products.length > 0;

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
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="w-full h-full"
      spaceBetween={0}
      slidesPerView={1}
      speed={800}
      grabCursor
    >
      {hasProducts &&
        products.map((product) => (
          <SwiperSlide key={product.challenge_info?.id}>
            <ChallengeCard product={product} />
          </SwiperSlide>
        ))}
      {/* Coming Soon placeholders */}
      <SwiperSlide>
        <ComingSoonCard />
      </SwiperSlide>
      <SwiperSlide>
        <ComingSoonCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default ChallengesSwiper;
