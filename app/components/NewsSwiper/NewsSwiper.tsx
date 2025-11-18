"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import NewsItem from "./NewsItem/NewsItem";
import { news } from "@/app/data/news";
import "swiper/css";

const NewsSwiper = () => {
  return (
    <section className="mx-auto w-full relative">
      <Swiper slidesPerView={1}>
        {news.map((item) => (
          <SwiperSlide key={item.id} className="px-4">
            <NewsItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsSwiper;
