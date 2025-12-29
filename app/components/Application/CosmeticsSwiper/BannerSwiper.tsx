import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/app/lib/hooks";

import "swiper/css";

const bannerColors = [
  {
    id: 1,
    color: "linear-gradient(180deg, #52E7D1 0%, #FFFFFF 100%)",
  },
  {
    id: 2,
    color: "linear-gradient(180deg, #C9D3DF 0%, #FFFFFF 100%)",
  },
  {
    id: 3,
    color: "linear-gradient(180deg, #007CC2, #88E3FF, #FFFFFF)",
  },
  {
    id: 4,
    color: "linear-gradient(180deg, #FBA7A6 0%, #FFFFFF 100%)",
  },
  {
    id: 5,
    color: "linear-gradient(180deg, #FFB971 0%, #FFFFFF 100%)",
  },
];

const BannerSwiper = ({
  onChange,
}: {
  onChange: (value: { id: number; color: string }) => void;
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
    if (personalization?.frame) {
      const index = bannerColors.findIndex(
        (banner) => banner.id === personalization.banner?.id
      );
      swiperRef.current?.slideTo(index);
    }
  }, []);

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
        slidesPerView={3.8}
        spaceBetween={10}
        centerInsufficientSlides
        centeredSlides={true}
        wrapperTag="ul"
        onSlideChange={(swiper) => {
          onChange(bannerColors[swiper.activeIndex]);
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
      >
        <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none">
          <div className="relative z-10 w-16 h-16 border-4 border-[#007CC2] rounded-xl"></div>
        </div>
        {bannerColors.map((banner) => (
          <SwiperSlide tag="li" key={banner.id}>
            <div
              style={{ background: banner.color }}
              className="w-16 h-16 mx-auto relative rounded-xl"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSwiper;
