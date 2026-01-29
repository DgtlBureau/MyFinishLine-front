"use client";

import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { useEffect } from "react";
import axios from "axios";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { IProduct } from "@/app/types";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-creative";

const QuestCard = ({ product }: { product: IProduct }) => {
  const price = product.prices?.find((p) => p.currency === "USD");
  const challenge = product.challenge_info;

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden">
      <Image
        src={product.main_image}
        alt={challenge.name}
        fill
        className="object-cover"
        quality={85}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Challenge Logo */}
      {challenge.image_url && (
        <div className="absolute top-4 md:top-9 right-4 md:right-9 w-[120px] sm:w-[160px] md:w-[200px]">
          <Image
            src={challenge.image_url}
            alt={challenge.name}
            width={200}
            height={90}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Distance Badge */}
      <div className="absolute top-4 md:top-9 left-4 md:left-9 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
        <span className="font-medium text-xs md:text-sm text-white">
          {challenge.total_distance} km
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute left-4 md:left-9 right-4 md:right-9 bottom-4 md:bottom-9 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full sm:max-w-[405px]">
          <div className="flex flex-col gap-1 md:gap-1.5 text-white">
            <h3 className="font-semibold text-lg sm:text-xl md:text-2xl leading-tight">
              {challenge.name}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-5 md:leading-6 line-clamp-2">
              {product.description}
            </p>
          </div>
          <Link
            href={"/challenges/" + challenge.id}
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white bg-white/20 backdrop-blur-xl border border-white/30 rounded-md w-fit hover:bg-white/30 transition-colors"
          >
            Choose a Quest
            <ArrowRight size={14} className="md:w-4 md:h-4" />
          </Link>
        </div>
        {price && (
          <span className="font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-[-1.44px] leading-none">
            ${price.amount}
          </span>
        )}
      </div>
    </div>
  );
};

const ComingSoonCard = () => (
  <div className="relative w-full h-[350px] sm:h-[400px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <Clock className="w-8 h-8 text-gray-400" />
      <span className="text-gray-500 font-semibold text-lg">Coming Soon</span>
    </div>
  </div>
);

export default function QuestSelection() {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await axios.get("/api/payment/products");
        dispatch(setProducts(data));
      } catch (error) {
        console.log(error);
      }
    };
    if (!products.length) {
      loadProducts();
    }
  }, []);

  return (
    <section
      className="flex flex-col items-center py-12 md:py-24 w-full"
      style={{
        background:
          "linear-gradient(to bottom, white 35%, #b4c6ff 73%, white 100%)",
      }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-4 md:gap-6 items-center px-4 md:px-24 py-6 md:py-10 w-full">
          <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[500px] w-full">
            <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[60px] text-center tracking-[-1px] md:tracking-[-2.4px] leading-tight md:leading-none">
              <span className="text-black">Choose Your </span>
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
            <p className="font-normal text-base md:text-[20px] text-center text-[#333] opacity-96 leading-relaxed md:leading-7">
              Become the protagonist of an amazing adventure. Reach the end and
              claim your reward.
            </p>
          </div>
        </div>

        {/* Swiper with quest cards */}
        <div className="w-full max-w-[1020px] px-4 md:px-20">
          <Swiper
            modules={[EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: {
                translate: ["-105%", 0, -100],
                scale: 0.9,
                opacity: 0.5,
              },
              next: {
                translate: ["105%", 0, -100],
                scale: 0.9,
                opacity: 0.5,
              },
              limitProgress: 2,
            }}
            slidesPerView={1}
            speed={500}
            grabCursor
            className="w-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.challenge_info.id}>
                <QuestCard product={product} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <ComingSoonCard />
            </SwiperSlide>
            <SwiperSlide>
              <ComingSoonCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
