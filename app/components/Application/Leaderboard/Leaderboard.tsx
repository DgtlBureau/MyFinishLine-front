"use client";

import { ChevronLeft, ChevronRight, Medal, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IAthlete } from "@/app/types";
import Avatar from "../../Shared/Avatar/Avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import CustomModal from "../../Shared/CustomModal/CustomModal";
import { motion } from "motion/react";
import { useAppSelector } from "@/app/lib/hooks";
import { getDistanceUnit } from "@/app/lib/utils/convertData";

import { logger } from "@/app/lib/logger";
export interface IRunner {
  id: number;
  image?: string;
  name: string;
  distance: number;
  time?: string;
  achievements?: string[];
}

const leaderboardData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "",
    initials: "SJ",
    image:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/38/3869b54bd27a5ff56c8c01453794948782790261_full.jpg",
    distance: 1200,
    time: "12 hours",
    achievements: ["Marathon Runner", "Best of the best"],
  },
  {
    id: 2,
    name: "Mike Chen",
    image:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/bc/bc1aff4acf6b2263a63febc068c7752b8a96b674_full.jpg",
    initials: "MC",
    distance: 1158,
    time: "11 hours",
    achievements: ["Longrunner"],
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "",
    image:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/40/40265d8b098379efe642b5e223802b2ea501aa18_medium.jpg",
    initials: "EW",
    distance: 1112,
    time: "9 hours",
  },
  {
    id: 4,
    name: "James Miller",
    distance: 1002,
  },
  { id: 5, name: "Lisa Anderson", distance: 958 },
  {
    id: 6,
    name: "David Brown",
    image:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/7f/7fa9e76b90f91a0e5f887645f97dfcc6c5b05ed0_full.jpg",
    distance: 940,
  },
  {
    id: 7,
    name: "Amy Taylor",
    distance: 921,
    achievements: ["Last but not least"],
  },
];

const challenges = [
  {
    id: 1,
    title: "Monthly Challenge",
    description:
      "See the leaders and compare your achievements. Reach the top!",
    users: leaderboardData,
  },
  {
    id: 2,
    title: "World Run Challenge",
    description:
      "See the leaders and compare your achievements. Reach the top!",
    users: leaderboardData,
  },
];

const getMedalColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "#FFD700";
    case 2:
      return "#C0C0C0";
    case 3:
      return "#CD7F32";
    default:
      return undefined;
  }
};

const getRowStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-amber-900/30";
    case 2:
      return "bg-slate-700/30";
    case 3:
      return "bg-orange-900/20";
    default:
      return "bg-white/5 hover:bg-white/10";
  }
};

const Leaderboard = () => {
  const [stravaData, setStravaData] = useState<{
    isConnected: boolean;
    athlete?: IAthlete | null;
  }>({
    athlete: null as IAthlete | null,
    isConnected: false,
  });
  const [clickedUserInfo, setClickedUserInfo] = useState<IRunner | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const distanceUnit = getDistanceUnit(user.measure);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleGetStravaUser = async () => {
    try {
      const response = await fetch("/api/strava/user");
      const data = await response.json();
      setStravaData(data);
    } catch (error) {
      logger.error("Error fetching Strava user data:", error);
    }
  };

  useEffect(() => {
    handleGetStravaUser();
  }, []);

  const handleGoToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleGoToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto pt-2 pb-8">
        <Swiper
          className="h-full"
          slidesPerView={1}
          spaceBetween={2}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {challenges.map((challenge) => (
            <SwiperSlide key={challenge.id} className="px-4">
              <div className="flex items-center justify-between text-center">
                <button
                  className="p-1 text-white/60 hover:text-white transition-colors"
                  onClick={handleGoToPrevSlide}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-tight">
                    {challenge.title}
                  </h1>
                  <p className="text-sm text-white/60">
                    {challenge.description}
                  </p>
                </div>
                <button
                  className="p-1 text-white/60 hover:text-white transition-colors"
                  onClick={handleGoToNextSlide}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 mt-4">
                {challenge.users.map((runner) => {
                  const isTopThree = runner.id <= 3;
                  const medalColor = getMedalColor(runner.id);

                  return (
                    <div
                      key={runner.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${getRowStyle(
                        runner.id
                      )}`}
                      onClick={() => setClickedUserInfo(runner)}
                    >
                      <span
                        className={`w-6 text-sm font-medium ${
                          isTopThree
                            ? "text-white"
                            : "text-white/60"
                        }`}
                      >
                        {medalColor ? (
                          <Medal
                            className="h-5 w-5"
                            style={{ color: medalColor }}
                          />
                        ) : (
                          runner.id
                        )}
                      </span>

                      <div className="h-12 w-12">
                        <Avatar
                          imageSrc={runner.image}
                          fullName={runner.name}
                        />
                      </div>

                      <span className="text-sm font-medium text-white flex-1">
                        {runner.name}
                      </span>

                      <div className="text-right">
                        <span className="text-sm font-medium text-white">
                          {runner.distance.toLocaleString()} {distanceUnit}
                        </span>
                        {isTopThree && runner.time && (
                          <span className="text-sm text-white/60 ml-2">
                            {runner.time}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20">
                    <span className="w-6 text-sm font-medium text-white/60">
                      999
                    </span>

                    <div className="h-12 w-12">
                      {stravaData.athlete?.profile && (
                        <Avatar
                          imageSrc={stravaData.athlete?.profile}
                          fullName={
                            stravaData.athlete?.firstname +
                            " " +
                            stravaData.athlete?.lastname
                          }
                        />
                      )}
                    </div>

                    <span className="text-sm font-medium text-white flex-1">
                      {stravaData.athlete?.firstname}{" "}
                      {stravaData.athlete?.lastname}
                    </span>

                    <span className="text-sm font-medium text-white">
                      0 {distanceUnit}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <CustomModal
        isOpen={!!clickedUserInfo}
        onClose={() => setClickedUserInfo(null)}
      >
        <div className="p-4">
          <div className="flex gap-2">
            <Avatar
              imageSrc={clickedUserInfo?.image}
              fullName={clickedUserInfo?.name}
            />
            <h2 className="text-2xl font-bold">{clickedUserInfo?.name}</h2>
          </div>
          {!!clickedUserInfo?.achievements?.length && (
            <>
              <span className="mt-4 block text-xl font-semibold">
                Achievements
              </span>
              <ul className="mt-2 flex items-center gap-2 flex-wrap">
                {clickedUserInfo?.achievements?.map((achievement, index) => (
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    key={index}
                    className="min-w-20 flex-1 w-fit h-20 shadow-2xl overflow-hidden rounded bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat dark:bg-[url(/images/gradient-dark.webp)] flex flex-col items-center justify-center p-2"
                  >
                    <Trophy
                      className="mx-auto"
                      width={36}
                      height={36}
                      color="gold"
                    />
                    <span className="italic font-medium text-center">
                      {achievement}{" "}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default Leaderboard;
