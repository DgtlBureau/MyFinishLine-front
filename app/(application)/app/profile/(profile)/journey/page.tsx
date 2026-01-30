"use client";

import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard";
import RewardsSwiper from "@/app/components/RewardsSwiper/RewardsSwiper";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import { linkStrava } from "@/app/lib/utils/authWithStrava";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { linkFitbit } from "@/app/lib/utils/authWithFitbit";
import AnimatedSection from "@/app/components/Shared/AnimatedSection/AnimatedSection";
import SwipeToUnlock from "@/app/components/Shared/SwipeToUnlock/SwipeToUnlock";
import ChallengeCardSkeleton from "@/app/components/Skeletons/ChallengeCardSkeleton";
import RewardsSwiperSkeleton from "@/app/components/Skeletons/RewardsSwiperSkeleton";
import ConnectButtonsSkeleton from "@/app/components/Skeletons/ConnectButtonsSkeleton";
import Link from "next/link";
import { MapPin } from "lucide-react";

const Journey = () => {
  const { completedContracts, challenges } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  const hasActiveChallenge = challenges && challenges.length > 0;
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const dataParam = searchParams.get("data");
  const dispatch = useAppDispatch();
  const router = useRouter();

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
        router.replace("/app/profile/journey");
      } catch (e) {
        console.error("Failed to parse data param", e);
        return;
      }
    }
  }, []);

  if (!hasActiveChallenge) {
    return (
      <main className="relative px-4 max-w-4xl mx-auto">
        <div className="mt-10">
          <h2 className="text-3xl text-center font-medium leading-9 text-white">
            My Journey
          </h2>
        </div>
        <div className="mt-12 flex flex-col items-center text-center">
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
        </div>
      </main>
    );
  }

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <h2 className="mt-10 font-medium text-3xl leading-9 text-white text-center px-4">
          My Journey
        </h2>
        <AnimatedSection
          skeleton={<ChallengeCardSkeleton />}
          delay={0}
          className="my-8 px-4"
        >
          <ChallengeCard />
        </AnimatedSection>
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
                <h4 className="font-medium leading-7 text-xl text-center text-white/70">
                  Authorize your accounts to connect to MyFinishLine
                </h4>
                <div className="mt-5 max-w-25 w-full bg-white/30 h-px mx-auto" />
                <div className="mt-5 space-y-2">
                  <SwipeToUnlock
                    onUnlock={linkStrava}
                    label="Swipe the slider to the right to connect Strava"
                    isConnected={user.has_strava_connect}
                    disconnectLabel="Connected to Strava"
                    serviceName="Strava"
                    icon={
                      <div className="w-[72px] h-[72px] relative rounded-xl overflow-hidden">
                        <Image
                          src="/icons/strava.svg"
                          fill
                          alt="Strava"
                          className="object-cover"
                        />
                      </div>
                    }
                  />
                  <SwipeToUnlock
                    onUnlock={linkFitbit}
                    label="Swipe the slider to the right to connect Fitbit"
                    isConnected={user.has_fitbit_connect}
                    disconnectLabel="Connected to Fitbit"
                    serviceName="Fitbit"
                    icon={
                      <div className="w-[72px] h-[72px] relative rounded-xl overflow-hidden bg-[#00B0B9] flex items-center justify-center">
                        <Image
                          src="/icons/fitbit.svg"
                          width={40}
                          height={40}
                          alt="Fitbit"
                          className="invert"
                        />
                      </div>
                    }
                  />
                </div>
              </div>
            </section>
          </AnimatedSection>
        </>
      )}
    </section>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="mt-10 h-9 w-40 mx-auto rounded bg-white/15 animate-pulse" />
            <div className="my-8 px-4">
              <ChallengeCardSkeleton />
            </div>
          </div>
          <RewardsSwiperSkeleton />
          <ConnectButtonsSkeleton />
        </section>
      }
    >
      <Journey />
    </Suspense>
  );
};

export default page;
