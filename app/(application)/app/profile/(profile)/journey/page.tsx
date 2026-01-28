"use client";

import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard";
import RewardsSwiper from "@/app/components/RewardsSwiper/RewardsSwiper";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import { linkStrava } from "@/app/lib/utils/authWithStrava";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { linkFitbit } from "@/app/lib/utils/authWithFitbit";
import AnimatedSection from "@/app/components/Shared/AnimatedSection/AnimatedSection";
import ChallengeCardSkeleton from "@/app/components/Skeletons/ChallengeCardSkeleton";
import RewardsSwiperSkeleton from "@/app/components/Skeletons/RewardsSwiperSkeleton";
import ConnectButtonsSkeleton from "@/app/components/Skeletons/ConnectButtonsSkeleton";

const Journey = () => {
  const { completedContracts } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
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

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <h2 className="mt-10 font-medium text-3xl leading-9 text-[#09090B] text-center px-4">
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
        <section className="px-4 pb-4 w-full border-t border-[#DADADA] pt-11">
          <div className="max-w-4xl mx-auto">
            <h4 className="font-medium leading-7 text-xl text-center text-[#71717A]">
              Authorize your accounts to connect to MyFinishLine
            </h4>
            <div className="mt-5 max-w-25 w-full bg-[#dadada] h-px mx-auto" />
            <button
              style={
                user.has_strava_connect
                  ? {
                      cursor: "default",
                      backgroundColor: "#FC4C02",
                      color: "#FFF",
                    }
                  : {}
              }
              className="mt-5 w-full h-14 cursor-pointer flex border text-[#777777] font-medium border-[#f9f3f3] items-center justify-between shadow-sm rounded-2xl overflow-hidden"
              disabled={user.has_strava_connect}
              onClick={linkStrava}
            >
              {user.has_strava_connect ? (
                <div className="text-center mx-auto">Connected to Strava</div>
              ) : (
                <>
                  <Image
                    className="rounded-2xl"
                    src="/icons/strava.svg"
                    width={56}
                    height={56}
                    alt="Strava"
                  />
                  Connect Strava
                  <ChevronRight />
                </>
              )}
            </button>
            <button
              style={
                user.has_fitbit_connect
                  ? {
                      cursor: "default",
                      backgroundColor: "#4cafbb",
                      color: "#FFF",
                    }
                  : {}
              }
              className="w-full h-14 mt-5 cursor-pointer border text-[#777777] font-medium border-[#f9f3f3] flex items-center justify-between shadow-sm rounded-2xl overflow-hidden"
              onClick={linkFitbit}
            >
              {user.has_fitbit_connect ? (
                <div className="text-center mx-auto">Connected to Fitbit</div>
              ) : (
                <>
                  <Image
                    className="rounded-2xl h-full"
                    src="/images/fitbit.png"
                    width={54}
                    height={54}
                    alt="FitBit"
                  />
                  Connect Fitbit
                  <ChevronRight />
                </>
              )}
            </button>
          </div>
        </section>
      </AnimatedSection>
    </section>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="mt-10 h-9 w-40 mx-auto rounded bg-gray-200 animate-shimmer" />
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
