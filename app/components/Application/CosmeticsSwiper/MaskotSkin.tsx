import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/app/lib/hooks";
import Image from "next/image";

import "swiper/css";

const mascots = [
  {
    id: 1,
    image_src: "/images/application/racoon.png",
  },
  {
    id: 2,
    image_src: "/images/application/racoon.png",
  },
  {
    id: 3,
    image_src: "/images/application/racoon.png",
  },
];

const MascotSwiper = ({
  onChange,
}: {
  onChange: (value: { id: number; image_src: string }) => void;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { personalization } = useAppSelector((state) => state.user);

  const handleGoNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleGoPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  useEffect(() => {
    if (personalization.frame) {
      const index = mascots.findIndex(
        (mascot) => mascot.id === personalization.mascot?.id
      );
      swiperRef.current?.slideTo(index);
    }
  }, []);

  return (
    <section className="mt-8 pb-4">
      <div className="flex items-center justify-between mt-8 px-8">
        <h4 className="font-medium text-xl leading-9 text-[#09090B] tracking-[-4%]">
          Maskot Skin
        </h4>
        <div>
          <button
            type="button"
            className="px-2 cursor-pointer"
            onClick={handleGoPrev}
            disabled={isFirstSlide}
          >
            <ArrowLeft color={isFirstSlide ? "#797979" : "black"} />
          </button>
          <button
            type="button"
            className="px-2 cursor-pointer"
            onClick={handleGoNext}
            disabled={isLastSlide}
          >
            <ArrowRight color={isLastSlide ? "#797979" : "black"} />
          </button>
        </div>
      </div>
      <Swiper
        className="mt-5 relative"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={2.3}
        centerInsufficientSlides
        centeredSlides={true}
        wrapperTag="ul"
        onSlideChange={(swiper) => {
          onChange(mascots[swiper.activeIndex]);
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
      >
        <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none">
          <div className="relative z-10 w-32 h-32 border-4 border-[#CBD5E1] rounded-xl"></div>
        </div>
        {mascots.map((mascot) => (
          <SwiperSlide key={mascot.id} tag="li">
            <div className="w-32 h-32 mx-auto bg-white relative rounded-xl">
              <Image
                src={mascot.image_src}
                alt="Mascot"
                width={120}
                height={120}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MascotSwiper;
