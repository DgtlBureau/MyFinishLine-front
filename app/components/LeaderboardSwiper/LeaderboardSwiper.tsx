"use client";

import LeaderboardItem from "./LeaderboardItem/LeaderboardItem";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef, useState } from "react";
import { IActiveChallenge } from "@/app/types";
import "swiper/css";

const LeaderboardSwiper = ({
  challenges,
}: {
  challenges: IActiveChallenge[];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleGoNext = () => {
    swiperRef?.current?.slideNext();
  };

  const handleGoPrev = () => {
    swiperRef?.current?.slidePrev();
  };

  return (
    <section className="">
      <div className="relative mt-4">
        {challenges.length > 1 && (
          <div className="absolute top-0 right-0 bg-white z-10">
            <button
              className="px-4 cursor-pointer"
              onClick={handleGoPrev}
              disabled={isFirstSlide}
            >
              <ArrowLeft color={isFirstSlide ? "#797979" : "black"} />
            </button>
            <button
              className="px-4 cursor-pointer"
              onClick={handleGoNext}
              disabled={isLastSlide}
            >
              <ArrowRight color={isLastSlide ? "#797979" : "black"} />
            </button>
          </div>
        )}

        {!!challenges.length && (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsFirstSlide(swiper.isBeginning);
              setIsLastSlide(swiper.isEnd);
            }}
            className="mt-4 pb-4"
            spaceBetween={16}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setIsFirstSlide(swiper.isBeginning);
              setIsLastSlide(swiper.isEnd);
            }}
          >
            {challenges.map((item) => (
              <SwiperSlide key={item.id}>
                <h4 className="block font-medium text-xl leading-9 text-[#09090B] px-4 mb-4">
                  {item.name}
                </h4>
                <LeaderboardItem challengeId={item.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default LeaderboardSwiper;
