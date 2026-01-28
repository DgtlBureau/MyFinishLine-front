"use client";

import LeaderboardSwiper from "@/app/components/LeaderboardSwiper/LeaderboardSwiper";
import { setUserChallenges } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserChallenges } from "@/app/lib/utils/userService";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import LeaderboardSkeleton from "@/app/components/LeaderboardSwiper/LeaderboardItem/LeaderboardSkeleton";
import { initialState } from "@/app/lib/features/challenge/challengeSlice";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const generalChallengeInfo = { ...initialState, name: "General" };

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
    <PageContainer title="Leaderboard" description="Keep up the great work!">
      {challenges.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LeaderboardSwiper challenges={challenges} />
        </motion.div>
      ) : isLoading ? (
        <div className="px-4 mt-8">
          <LeaderboardSkeleton count={7} />
        </div>
      ) : (
        <span className="block text-center text-gray-500 mt-8">No challenges found</span>
      )}
    </PageContainer>
  );
};

export default page;
