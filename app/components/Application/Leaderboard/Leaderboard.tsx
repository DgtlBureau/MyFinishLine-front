"use client";

import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { IAthlete } from "@/app/types";
import { useEffect, useState } from "react";
import LeaderTable, { IUser } from "./LeaderTable/LeaderTable";
import CustomModal from "../../Shared/CustomModal/CustomModal";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

import "swiper/css";

const championships = [
  {
    id: 1,
    title: "Atlantic Run",
    users: [
      {
        id: 1,
        image:
          "https://static.wikia.nocookie.net/fallout/images/7/76/Caesar2.png/revision/latest?cb=20210110054724",
        name: "Edward Sallow",
        distance: 200,
        hours: 76,
        achievements: ["Marathon Finisher", "100km Club", "Early Bird Runner"],
      },
      {
        id: 2,
        image:
          "https://static.wikia.nocookie.net/fallout/images/0/02/Pan_house.png/revision/latest?cb=20110212204018&path-prefix=pl",
        name: "Edwin House",
        distance: 198,
        hours: 72,
        achievements: ["Marathon Finisher", "50km Club"],
      },
      {
        id: 3,
        image:
          "https://static.wikia.nocookie.net/fallout/images/3/3b/Craig_Boone.jpg/revision/latest?cb=20200601101856",
        name: "Craig Boone",
        distance: 197,
        hours: 79,
        achievements: ["Half Marathon Finisher", "10km Club"],
      },
      {
        id: 4,
        image:
          "https://static.wikia.nocookie.net/fallout/images/e/ef/Raul_Tejada.jpg/revision/latest?cb=20101224210151",
        name: "Raul Tejada",
        distance: 192,
        hours: 71,
        achievements: [],
      },
      {
        id: 5,
        image:
          "https://static.wikia.nocookie.net/fallout/images/3/3f/HH_Joshua_Graham.jpg/revision/latest?cb=20110607152803",
        name: "Joshua Graham",
        distance: 182,
        hours: 67,
        achievements: ["10km Club"],
      },
      {
        id: 6,
        image:
          "https://static.wikia.nocookie.net/fallout/images/1/17/DeanDomino.png/revision/latest?cb=20120613231132",
        name: "Dean Domino",
        distance: 182,
        hours: 67,
        achievements: [],
      },
    ],
  },
  {
    id: 2,
    title: "World Run Challenge",
    users: [
      {
        id: 1,
        image: "",
        name: "Edward Sallow",
        distance: 500,
        hours: 190,
      },
      {
        id: 2,
        image:
          "https://static.wikia.nocookie.net/fallout/images/0/02/Pan_house.png/revision/latest?cb=20110212204018&path-prefix=pl",
        name: "Edwin House",
        distance: 480,
        hours: 185,
      },
    ],
  },
];

const Leaderboard = () => {
  const [stravaData, setStravaData] = useState<{
    isConnected: boolean;
    athlete?: IAthlete | null;
  }>({
    athlete: null as IAthlete | null,
    isConnected: false,
  });
  const [clickedUserInfo, setClickedUserInfo] = useState<IUser | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleGetStravaUser = async () => {
    try {
      const response = await fetch("/api/strava/user");
      const data = await response.json();
      setStravaData(data);
    } catch (error) {
      console.error("Error fetching Strava user data:", error);
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

  const handleOpenUserModal = (user: IUser) => {
    setClickedUserInfo(user);
  };

  return (
    <>
      <ul className="min-h-screen h-full max-w-3xl mx-auto">
        <Swiper
          className="h-full"
          slidesPerView={1}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {championships.map((championship) => (
            <li className="h-full" key={championship.id}>
              <SwiperSlide key={championship.id} className="px-2 h-full">
                <section className="flex items-center justify-between">
                  <button onClick={handleGoToPrevSlide}>
                    <ChevronLeft />
                  </button>

                  <div>
                    <h4 className="text-center">{championship.title}</h4>
                    <p className="text-xs mt">
                      See the leaders and compare your achievements. Reach the
                      top!
                    </p>
                  </div>

                  <button onClick={handleGoToNextSlide}>
                    <ChevronRight />
                  </button>
                </section>
                <LeaderTable
                  users={championship.users}
                  currentUserInfo={stravaData.athlete!}
                  onUserClick={handleOpenUserModal}
                />
              </SwiperSlide>
            </li>
          ))}
        </Swiper>
      </ul>
      <CustomModal
        isOpen={!!clickedUserInfo}
        onClose={() => setClickedUserInfo(null)}
      >
        <div className="p-4">
          <div className="flex gap-2">
            {clickedUserInfo?.image ? (
              <Image
                className="object-cover rounded-full h-12 w-12"
                src={clickedUserInfo.image}
                alt={`User ${clickedUserInfo.name}`}
                width={48}
                height={48}
              />
            ) : (
              <div className="h-12 w-12 flex items-center justify-center border-background/50 border rounded-full">
                <User />
              </div>
            )}
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
                      {achievement}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default Leaderboard;
