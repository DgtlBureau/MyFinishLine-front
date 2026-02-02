"use client";

import LeaderboardSwiper from "@/app/components/LeaderboardSwiper/LeaderboardSwiper";
import { setUserChallenges } from "@/app/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getUserChallenges } from "@/app/lib/utils/userService";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LeaderboardSkeleton from "@/app/components/LeaderboardSwiper/LeaderboardItem/LeaderboardSkeleton";
import { initialState } from "@/app/lib/features/challenge/challengeSlice";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";
import Link from "next/link";
import { logger } from "@/app/lib/logger";

const generalChallengeInfo = { ...initialState, name: "General" };

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { challenges } = useAppSelector((state) => state.user);
  const challenge = useAppSelector((state) => state.challenge);
  const questStarted = useMemo(() => {
    if (!challenge?.id || challenge.id <= 0) return false;
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`quest_started_${challenge.id}`) === "true";
  }, [challenge?.id]);
  const hasActiveChallenge = challenge?.id > 0 && questStarted;
  const dispatch = useAppDispatch();

  const handleLoadChallenges = async () => {
    setIsLoading(true);
    try {
      const data = await getUserChallenges();
      dispatch(setUserChallenges([generalChallengeInfo, ...data.data]));
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadChallenges();
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <PageContainer title="Leaderboard" description="Keep up the great work!">
        <div className="px-4 mt-8">
          <LeaderboardSkeleton count={7} />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Leaderboard" description="Keep up the great work!">
      {!hasActiveChallenge ? (
        <motion.div
          key="no-challenge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-4 min-h-[50vh]"
        >
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">No active challenge</h3>
          <p className="text-sm text-white/60 text-center max-w-[280px]">
            Start a challenge to compete on the leaderboard
          </p>
          <Link
            href="/app/homepage"
            className="mt-2 inline-block px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold hover:bg-white/40 shadow-lg transition-all"
          >
            Start a Quest →
          </Link>
        </motion.div>
      ) : (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 mt-8"
          >
            <LeaderboardSkeleton count={7} />
          </motion.div>
        ) : challenges.length > 0 ? (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LeaderboardSwiper challenges={challenges} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-5 min-h-[50vh]"
          >
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <p className="text-base text-white/60 text-center max-w-[280px]">No challenges found</p>
          </motion.div>
        )}
      </AnimatePresence>
      )}
    </PageContainer>
  );
};

export default page;
