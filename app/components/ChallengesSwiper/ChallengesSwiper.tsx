import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import "swiper/css";

const challenges = [
  {
    id: 1,
    title: "Say Goodbye to Hollywood",
    image: "/images/application/challenge-bg-1.png",
  },
  {
    id: 2,
    title: "Marathoner",
    image: "/images/application/challenge-bg-2.jpg",
  },
  {
    id: 3,
    title: "Great Wall Runner",
    image: "/images/application/challenge-bg-3.jpg",
  },
  {
    id: 4,
    title: "Mountain Conqueror",
    image: "/images/application/challenge-bg-4.webp",
  },
];

const ChallengesSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="mt-8 challenges-swiper"
      spaceBetween={8}
      slidesPerView={1.3}
      speed={700}
      centeredSlides={true}
    >
      {challenges.map((challenge) => (
        <SwiperSlide key={challenge.id} className="px-0">
          <motion.div className="w-full h-full">
            <Image
              className="object-cover w-full h-130 rounded-4xl"
              src={challenge.image}
              alt={challenge.title}
              width={400}
              height={700}
              loading="eager"
              quality={75}
            />
            <span className="block text-center mt-6 font-medium text-xl tracking-[-4%]">
              {challenge.title}
            </span>
            <button className="mx-auto mt-7 flex items-center gap-2 rounded-full py-2 px-4 bg-primary font-medium text-sm leading-5 text-primary-foreground">
              Go to challenge <ArrowUpRight />
            </button>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ChallengesSwiper;
