"use client";

import LeaderboardItem from "./LeaderboardItem/LeaderboardItem";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { EffectCreative } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { IActiveChallenge } from "@/app/types";
import { motion, AnimatePresence } from "motion/react";
import "swiper/css";
import "swiper/css/effect-creative";

const LeaderboardSwiper = ({
  challenges,
}: {
  challenges: IActiveChallenge[];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleGoNext = () => {
    swiperRef?.current?.slideNext();
  };

  const handleGoPrev = () => {
    swiperRef?.current?.slidePrev();
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.update();
    setIsFirstSlide(swiperRef.current.isBeginning);
    setIsLastSlide(swiperRef.current.isEnd);
  }, [challenges.length]);

  return (
    <section className="">
      <div className="relative mt-4">
        {!!challenges.length && (
          <>
            {/* Header with title and navigation */}
            <div className={`flex items-center justify-between px-8 mb-4 ${isEmpty ? "hidden" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.h4
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold text-xl text-white"
                >
                  {challenges[activeIndex]?.name || "Leaderboard"}
                </motion.h4>
              </AnimatePresence>
              {challenges.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isFirstSlide
                        ? "bg-white/20 text-white/30 cursor-not-allowed"
                        : "bg-white/40 backdrop-blur-xl border border-white/40 shadow-md hover:bg-white/60 hover:scale-105 active:scale-95 text-white cursor-pointer"
                    }`}
                    onClick={handleGoPrev}
                    disabled={isFirstSlide}
                  >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                  </button>
                  <button
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isLastSlide
                        ? "bg-white/20 text-white/30 cursor-not-allowed"
                        : "bg-white/40 backdrop-blur-xl border border-white/40 shadow-md hover:bg-white/60 hover:scale-105 active:scale-95 text-white cursor-pointer"
                    }`}
                    onClick={handleGoNext}
                    disabled={isLastSlide}
                  >
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>

            {/* Progress dots */}
            {challenges.length > 1 && !isEmpty && (
              <div className="flex items-center justify-center gap-2 mb-4">
                {challenges.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => swiperRef.current?.slideTo(index)}
                    className="relative h-2 rounded-full overflow-hidden cursor-pointer"
                    animate={{
                      width: index === activeIndex ? 24 : 8,
                      backgroundColor: index === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}

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
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsFirstSlide(swiper.isBeginning);
                setIsLastSlide(swiper.isEnd);
              }}
              className="pb-4 overflow-visible"
              spaceBetween={0}
              slidesPerView={1}
              speed={400}
              grabCursor={true}
              onSlideChange={(swiper) => {
                setIsFirstSlide(swiper.isBeginning);
                setIsLastSlide(swiper.isEnd);
                setActiveIndex(swiper.activeIndex);
              }}
              onProgress={(_, prog) => {
                setProgress(prog);
              }}
            >
              {challenges.map((item, index) => (
                <SwiperSlide className="px-4" key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <LeaderboardItem challengeId={item.id} onEmpty={setIsEmpty} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </section>
  );
};

export default LeaderboardSwiper;
