import { useEffect, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import "swiper/css";
import Link from "next/link";
import axios from "axios";
import { setProducts } from "@/app/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

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
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleLoadChallenges = async () => {
    try {
      const { data } = await axios.get("/api/payment/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleLoadChallenges();
  }, []);

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="mt-8 challenges-swiper w-full"
      spaceBetween={8}
      slidesPerView={1.3}
      speed={700}
      centeredSlides={true}
    >
      {products.map((product, idx) => (
        <SwiperSlide key={product.challenge_info?.id || idx} className="px-0 w-full">
          <motion.div className="w-full h-full bg-white/30 py-4 rounded-2xl">
            <Image
              className="object-cover w-full h-full h-130 rounded-4xl"
              src={product.main_image || product.images}
              alt={product.challenge_info?.name || product.name}
              width={400}
              height={700}
              loading="eager"
              quality={75}
            />
            <span className="block text-center mt-6 font-medium text-xl tracking-[-4%]">
              {product.challenge_info?.name || product.name}
            </span>
            {product.paddle_product_id ? (
              <Link
                href={"/challenges/" + product.paddle_product_id}
                className="mx-auto mt-7 flex items-center gap-2 rounded-full py-2 px-4 bg-primary font-medium text-sm leading-5 text-primary-foreground w-fit"
              >
                Go to challenge <ArrowUpRight />
              </Link>
            ) : (
              <button
                disabled
                className="mx-auto mt-7 flex items-center gap-2 rounded-full py-2 px-4 bg-gray-300 font-medium text-sm leading-5 text-gray-500 w-fit cursor-not-allowed"
              >
                Coming Soon
              </button>
            )}
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ChallengesSwiper;
