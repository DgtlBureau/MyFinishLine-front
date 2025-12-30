import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/hooks";

import "swiper/css";

const FrameSwiper = ({
  items,
  onChange,
}: {
  items: { id: number; contract_id: number; image_url: string }[];
  onChange: (value: { id: number; image_url: string }) => void;
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
    if (items.length > 0 && user.selected_frame) {
      const index = items.findIndex(
        (frame) => frame.id === user.selected_frame?.id
      );
      swiperRef.current?.slideTo(index);
    }
  }, [items.length]);

  console.log("personalization", personalization);

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
        slidesPerView={2.6}
        centerInsufficientSlides
        centeredSlides={true}
        wrapperTag="ul"
        onSlideChange={(swiper) => {
          onChange(items[swiper.activeIndex]);
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
      >
        <div className="absolute top-0.5 left-0 w-full flex items-center justify-center z-100 pointer-events-none">
          {user.full_avatar_url ? (
            <Image
              className="p-0.5 shrink-0 rounded-full h-15 15 object-cover"
              src={user.full_avatar_url}
              width={62}
              height={62}
              alt="User image"
            />
          ) : (
            <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
              <Camera />
            </div>
          )}
        </div>
        {items.map((frame) => (
          <SwiperSlide key={frame.id} tag="li">
            <div className="w-16 h-16 mx-auto relative rounded-full flex items-center justify-center">
              <Image
                className="object-contain"
                src={frame.image_url}
                width={64}
                height={64}
                alt="Frame"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FrameSwiper;
