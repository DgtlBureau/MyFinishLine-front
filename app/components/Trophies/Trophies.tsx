"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Trophy from "./Trophy/Trophy";

const trophies = [
  {
    id: 1,
    title: "Marathon Finisher",
    description: "Completed your first marathon",
    rating: 1,
  },
  {
    id: 2,
    title: "Century Ride",
    description: "Cycled 100 miles in a single ride",
    rating: 2,
  },
  {
    id: 3,
    title: "Triathlon Champion",
    description: "Finished your first triathlon",
    rating: 1,
  },
  {
    id: 4,
    title: "Mountain Climber",
    description: "Reached the summit of a major mountain",
    rating: 3,
  },
  {
    id: 5,
    title: "Ultra Marathoner",
    description: "Completed an ultra marathon",
    rating: 3,
  },
  {
    id: 6,
    title: "Swim Star",
    description: "Swam 10 miles in open water",
    rating: 2,
  },
];

const Trophies = () => {
  return (
    <section className="mx-auto w-full relative">
      <Swiper
        slidesPerView={3}
        spaceBetween={16}
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {trophies.map((trophy) => (
          <SwiperSlide key={trophy.id}>
            <Trophy title={trophy.title} rating={trophy.rating} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Trophies;
