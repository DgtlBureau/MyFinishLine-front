"use client";

import { challenges } from "@/app/data/challenges";
import { Swiper, SwiperSlide } from "swiper/react";
import Challenge from "./Challenge/Challenge";
import "swiper/css";

const Challenges = () => {
  return (
    <section className="mx-auto w-full relative">
      <Swiper slidesPerView={1}>
        {challenges.map((item) => (
          <SwiperSlide key={item.id} className="px-4">
            <Challenge {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Challenges;
