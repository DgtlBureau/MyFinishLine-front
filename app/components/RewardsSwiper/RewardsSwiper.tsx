import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Reward from "../Application/Reward/Reward";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import { useAppSelector } from "@/app/lib/hooks";

const rewards = [
  {
    id: 1,
    title: "It's Raining Man",
    image: "/images/application/medal.png",
    description: "Run 45 km under the rain.",
  },
  {
    id: 2,
    title: "Marathoner",
    image: "/images/application/medal.png",
    description: "Complete a full marathon distance of 42.195 km.",
  },
  {
    id: 3,
    title: "Great Wall Runner",
    image: "/images/application/medal.png",
    description: "Conquer a run along the Great Wall of China.",
  },
  {
    id: 4,
    title: "Mountain Conqueror",
    image: "/images/application/medal.png",
    description: "Reach the summit of a mountain over 2000m.",
  },
];

const RewardsSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { completedContracts } = useAppSelector((state) => state.user);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

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

  return (
    <section className="bg-[#F4F4F5] py-10 mt-14">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-3xl leading-9 text-[#09090B] px-4">
          My Rewards
        </h4>
        {completedContracts.length > 2 && (
          <div>
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
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mt-8 pb-4"
        spaceBetween={16}
        slidesPerView={2}
        onSlideChange={(swiper) => {
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
      >
        {completedContracts.map((contract) => (
          <SwiperSlide key={contract.id} className="px-4">
            <Reward
              title={contract.name}
              description={contract.description}
              image={contract.image_url || ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RewardsSwiper;
