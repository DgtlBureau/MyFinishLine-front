"use client";

import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard";
import RewardsSwiper from "@/app/components/RewardsSwiper/RewardsSwiper";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setUser, setUserChallenges } from "@/app/lib/features/user/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AnimatedSection from "@/app/components/Shared/AnimatedSection/AnimatedSection";
import SwipeToUnlock from "@/app/components/Shared/SwipeToUnlock/SwipeToUnlock";
import Integrations from "@/app/components/Application/Integrations/Integrations";
import ChallengeCardSkeleton from "@/app/components/Skeletons/ChallengeCardSkeleton";
import RewardsSwiperSkeleton from "@/app/components/Skeletons/RewardsSwiperSkeleton";
import ConnectButtonsSkeleton from "@/app/components/Skeletons/ConnectButtonsSkeleton";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { getUserChallenges } from "@/app/lib/utils/userService";

import { logger } from "@/app/lib/logger";
export const Journey = () => {
  const { completedContracts, challenges } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const hasActiveChallenge = challenges && challenges.length > 0;
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const dataParam = searchParams.get("data");
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Load challenges on mount
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await getUserChallenges();
        dispatch(setUserChallenges(data.data));
      } catch (error) {
        logger.error("Failed to load challenges", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadChallenges();
  }, [dispatch]);

  useEffect(() => {
    if (errorParam) {
      toast.error("Error linking Strava account " + errorParam);
    }
  }, []);

  useEffect(() => {
    if (dataParam) {
      let parsedData = null;
      try {
        parsedData = JSON.parse(decodeURIComponent(dataParam));
        dispatch(setUser(parsedData));
        router.replace("/app/profile");
      } catch (e) {
        logger.error("Failed to parse data param", e);
        return;
      }
    }
  }, []);

  // Show loading state while fetching challenges
  if (isLoading) {
    return (
      <main className="relative px-4 max-w-4xl mx-auto">
        <div className="mt-10">
          <h2 className="text-3xl text-center font-medium leading-9 text-white">
            My Journey
          </h2>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-white/70 animate-spin" />
        </div>
      </main>
    );
  }

  if (!hasActiveChallenge) {
    return (
      <main className="relative px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10"
        >
          <h2 className="text-3xl text-center font-medium leading-9 text-white">
            My Journey
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-white/70" />
          </div>
          <h3 className="text-xl font-bold text-white">No active challenge</h3>
          <p className="mt-2 text-sm text-white/70 max-w-xs">
            Start a challenge to track your journey and see your progress
          </p>
          <Link
            href="/payment"
            className="inline-block mt-5 px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold hover:bg-white/40 shadow-lg transition-all"
          >
            Choose a Quest →
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 font-medium text-3xl leading-9 text-white text-center px-4"
        >
          My Journey
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="my-8 px-4"
        >
          <ChallengeCard />
        </motion.div>
      </div>

      {hasActiveChallenge && (
        <>
          <AnimatedSection
            skeleton={<RewardsSwiperSkeleton />}
            delay={0.1}
          >
            {!!completedContracts?.length && <RewardsSwiper />}
          </AnimatedSection>

          <AnimatedSection
            skeleton={<ConnectButtonsSkeleton />}
            delay={0.2}
          >
            <section className="px-4 pb-4 w-full border-t border-white/20 pt-11">
              <div className="max-w-4xl mx-auto">
                <h4 className="font-medium leading-7 text-xl text-center text-white/70 mb-5">
                  Authorize your accounts to connect to MyFinishLine
                </h4>
                <div className="max-w-25 w-full bg-white/30 h-px mx-auto mb-5" />
                <Integrations />
              </div>
            </section>
          </AnimatedSection>
        </>
      )}
    </section>
  );
};

// Route page renders nothing — content is handled by the layout
const page = () => null;
export default page;
