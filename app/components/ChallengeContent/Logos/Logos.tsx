"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/app/lib/utils";
import Noise from "../../Shared/Noise/noise";
import content from "@/app/lib/content/landing/content";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const swiperBreakpoints = {
  0: { slidesPerView: 3 },
  1024: { slidesPerView: 5 },
};

export default function Logos() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const visibleCompanies = content.logos.filter((company) => {
    if (mounted && company.className.includes("dark:hidden")) {
      return false;
    }
    return true;
  });

  return (
    <section className="section-padding relative">
      <Noise />
      <p className="container text-center text-base text-[#71717A]">
        {content.hero.description}
      </p>

      <div className="container mt-10">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={swiperBreakpoints}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            reverseDirection: false,
            disableOnInteraction: false
          }}
        >
          {visibleCompanies.map((company, idx) => (
            <SwiperSlide key={idx} tag='div'>
              <Link
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-8 flex items-center justify-center w-24 transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className={cn("object-contain m-auto", company.className)}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
