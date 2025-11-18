"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const stories = [
  { id: 1, title: "Story 1", image: "/images/story1.jpg" },
  { id: 2, title: "Story 2", image: "/images/story2.jpg" },
  { id: 3, title: "Story 3", image: "/images/story3.jpg" },
  { id: 4, title: "Story 1", image: "/images/story1.jpg" },
  { id: 5, title: "Story 2", image: "/images/story2.jpg" },
  { id: 6, title: "Story 3", image: "/images/story3.jpg" },
];

const Stories = () => {
  return (
    <div className="mx-auto w-full relative">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        className="w-full"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {stories.map((story) => (
          <SwiperSlide className="w-full h-30" key={story.id}>
            <div className="w-full h-30 rounded-lg border-2 border-blue-500 overflow-hidden relative">
              <Image
                src={story.image}
                alt={story.title}
                quality={50}
                fill
                className="w-full h-full object-cover scale-[0.97] rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stories;
