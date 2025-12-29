"use client";

import LeaderboardItem from "./LeaderboardItem/LeaderboardItem";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { getLeaderboard } from "@/app/lib/utils/leaderboardService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setLeaderboard } from "@/app/lib/features/leaderboard/leaderboardSlice";
import { getUserChallenges } from "@/app/lib/utils/userService";
import { setUserChallenges } from "@/app/lib/features/user/userSlice";

const leaderboard = [
  {
    id: 1,
    title: "Marathoner",
    currentUser: {
      id: 127,
      total_distance: 413,
      total_hours: 1424,
    },
    users: [
      {
        id: 1,
        image_url: "",
        name: "Vasiliy Demchenko",
        total_distance: 102,
        total_hours: 2000,
      },
      {
        id: 2,
        image_url: "",
        name: "Vladislav Dogmut",
        total_distance: 93,
        total_hours: 1500,
      },
      {
        id: 3,
        image_url: "",
        name: "Evgeni Ivanov",
        total_distance: 87,
        total_hours: 1300,
      },
      {
        id: 4,
        image_url: "",
        name: "Vasiliy Demchenko",
        total_distance: 75,
        total_hours: 900,
      },
      {
        id: 5,
        image_url: "",
        name: "Vladislav Dogmut",
        total_distance: 60,
        total_hours: 700,
      },
      {
        id: 6,
        image_url: "",
        name: "Evgeni Ivanov",
        total_distance: 55,
        total_hours: 570,
      },
    ],
  },
  {
    id: 2,
    title: "Marathoner",
    currentUser: {
      id: 53,
      total_distance: 603,
      total_hours: 1224,
    },
    users: [
      {
        id: 1,
        image_url: "",
        name: "Vasiliy Demchenko",
        total_distance: 102,
        total_hours: 2000,
      },
      {
        id: 2,
        image_url: "",
        name: "Vladislav Dogmut",
        total_distance: 93,
        total_hours: 1500,
      },
      {
        id: 3,
        image_url: "",
        name: "Evgeni Ivanov",
        total_distance: 87,
        total_hours: 1300,
      },
    ],
  },
];

const LeaderboardSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const dispatch = useAppDispatch();
  const { challenges } = useAppSelector((state) => state.user);

  const handleLoadChallenges = async () => {
    try {
      const data = await getUserChallenges();
      dispatch(setUserChallenges(data.data));
    } catch (error) {
      console.log(error);
    }
  };

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
    handleLoadChallenges();
  }, []);

  return (
    <section className="">
      <h4 className="font-bold text-2xl leading-8 text-[#09090B]">
        Leaderboard
      </h4>
      <div className="relative mt-4">
        {challenges.length > 1 && (
          <div className="absolute top-0 right-0 bg-white">
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

        {!!challenges.length && (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mt-4 pb-4"
            spaceBetween={16}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setIsFirstSlide(swiper.isBeginning);
              setIsLastSlide(swiper.isEnd);
            }}
          >
            {challenges.map((item) => (
              <SwiperSlide key={item.id}>
                <h4 className="block font-medium text-xl leading-9 text-[#09090B] px-4 mb-4">
                  {item.name}
                </h4>
                <LeaderboardItem challengeId={item.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default LeaderboardSwiper;
