"use client";

import LeaderboardSwiper from "@/app/components/LeaderboardSwiper/LeaderboardSwiper";
import { setUserChallenges } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserChallenges } from "@/app/lib/utils/userService";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Loader from "@/app/components/Shared/Loader/Loader";
import { initialState } from "@/app/lib/features/challenge/challengeSlice";

const generalChallengeInfo = { ...initialState, name: "General table" };

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { challenges } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLoadChallenges = async () => {
    setIsLoading(true);
    try {
      const data = await getUserChallenges();
      dispatch(setUserChallenges([generalChallengeInfo, ...data.data]));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadChallenges();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="font-bold text-2xl leading-8 text-[#09090B]">
        Leaderboard
      </h2>
      {challenges.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LeaderboardSwiper challenges={challenges} />
        </motion.div>
      ) : isLoading ? (
        <div className="flex justify-center p-8">
          <Loader />
        </div>
      ) : (
        <span>No challenges found</span>
      )}
    </section>
  );
};

export default page;
