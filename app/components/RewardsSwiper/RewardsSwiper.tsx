import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Reward from "../Application/Reward/Reward";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/app/lib/hooks";
import Link from "next/link";
import { useTranslation } from "@/app/lib/i18n";

import "swiper/css";

const RewardsSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { contracts } = useAppSelector((state) => state.user);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const t = useTranslation();

  const contractsStillToGet = contracts.filter(
    (contract) => !contract.is_completed,
  );

  if (!contractsStillToGet.length) {
    return null;
  }

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
    <section className="bg-[#F4F4F5] pt-10">
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-3xl leading-9 text-[#09090B] px-4">
            {t("profile.contractsInProgress")}
          </h4>
          {contractsStillToGet.length > 2 && (
            <div className="flex items-center flex-nowrap">
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
          {contractsStillToGet.map((contract) => (
            <SwiperSlide key={contract.id} className="px-4">
              <Reward
                title={contract.name}
                description={contract.description}
                isLegendary={contract.rare.type === "legendary"}
                rewards={[
                  ...contract.badges,
                  ...contract.banners,
                  ...contract.skins,
                  ...contract.frames,
                ]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Link
          href="/app/contracts/still-to-get"
          className="underline block p-4 text-right text-sm text-[#71717A]"
        >
          {t("common.seeAll")}
        </Link>
      </section>
    </section>
  );
};

export default RewardsSwiper;
