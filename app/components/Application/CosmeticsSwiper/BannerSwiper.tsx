import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/app/lib/hooks";
import Image from "next/image";

import "swiper/css";

const BannerSwiper = ({
  items,
  onChange,
}: {
  items: { id: number; contract_id: number; image_url: string }[];
  onChange: (value: { id: number; image_url: string }) => void;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { user } = useAppSelector((state) => state.user);

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
    if (items.length > 0 && user.selected_banner) {
      console.log("update");
      const index = items.findIndex(
        (banner) => banner.id === user.selected_banner?.id
      );
      swiperRef.current?.slideTo(index);
    }
  }, [items.length]);

  return (
    <section className="mt-8 pb-4">
      <div className="flex items-center justify-between mt-8 px-8">
        <h4 className="font-medium text-xl leading-9 text-[#09090B] tracking-[-4%]">
          Banner color
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
        <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none">
          <div className="relative z-10 w-16 h-16 border-4 border-[#007CC2] rounded-xl"></div>
        </div>
        {items.map((banner) => (
          <SwiperSlide tag="li" key={banner.id}>
            <div className="w-16 h-16 mx-auto relative rounded-xl">
              <Image
                className="object-contain"
                src={banner.image_url}
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

export default BannerSwiper;
