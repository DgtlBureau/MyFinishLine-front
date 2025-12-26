import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";

import "swiper/css";

const frames = [
  {
    id: 1,
    color: "linear-gradient(180deg, #54E9D3 0%, #00766E 100%)",
  },
  {
    id: 2,
    color: "linear-gradient(180deg, #CBD5E1 0%, #47566C 100%)",
  },
  {
    id: 3,
    color: "linear-gradient(180deg, #88E3FF 0%, #007CC2 100%)",
  },
  {
    id: 4,
    color: "linear-gradient(180deg, #FBA7A6 0%, #DF2225 100%)",
  },
  {
    id: 5,
    color: "linear-gradient(180deg, #FFBA72 0%, #EA5B19 100%)",
  },
];

const FrameSwiper = ({
  onChange,
}: {
  onChange: (value: { id: number; color: string }) => void;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { user, personalization } = useAppSelector((state) => state.user);

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
      const index = frames.findIndex(
        (frame) => frame.id === personalization.frame?.id
      );
      swiperRef.current?.slideTo(index);
    }
  }, []);

  return (
    <section className="mt-8 pb-4">
      <div className="flex items-center justify-between mt-8 px-8">
        <h4 className="font-medium text-xl leading-9 text-[#09090B] tracking-[-4%]">
          Avatar frame
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
        slidesPerView={3.8}
        spaceBetween={10}
        centerInsufficientSlides
        centeredSlides={true}
        wrapperTag="ul"
        onSlideChange={(swiper) => {
          onChange(frames[swiper.activeIndex]);
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
      >
        <div className="absolute top-0.5 left-0 w-full flex items-center justify-center z-100 pointer-events-none">
          {user.full_avatar_url ? (
            <Image
              className="p-0.5 rounded-full max-h-15 max-w-15 object-cover"
              src={user.full_avatar_url}
              width={60}
              height={60}
              alt="User image"
            />
          ) : (
            <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
              <Camera />
            </div>
          )}
        </div>
        {frames.map((frame) => (
          <SwiperSlide key={frame.id} tag="li">
            <div
              style={{ background: frame.color }}
              className="w-16 h-16 mx-auto relative rounded-full flex items-center justify-center"
            >
              <div className="w-14 h-14 bg-[#F4F4F5] rounded-full"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FrameSwiper;
