"use client";

import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard";
import { ChevronRight } from "lucide-react";
import FeatureList from "@/app/components/Application/FeatureList/FeatureList";
import RewardsSwiper from "@/app/components/RewardsSwiper/RewardsSwiper";
import ChallengesSwiper from "@/app/components/ChallengesSwiper/ChallengesSwiper";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { linkStrava } from "@/app/lib/utils/authWithStrava";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setUser } from "@/app/lib/features/user/userSlice";
import LeaderboardSwiper from "@/app/components/LeaderboardSwiper/LeaderboardSwiper";
import { Suspense } from "react";
import { toast } from "react-toastify";

const Journey = () => {
  const { user, challenges } = useAppSelector((state) => state.user);
  const { completedContracts } = useAppSelector((state) => state.user);
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const errorParam = searchParams.get("error");
  const dispatch = useAppDispatch();

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
      } catch (e) {
        console.error("Failed to parse data param", e);
        return;
      }
    }
  }, []);

  return (
    <section>
      <h2 className="mt-10 font-medium text-3xl leading-9 text-[#09090B] text-center px-4">
        My Journey
      </h2>
      <section className="mt-8 px-4">
        <ChallengeCard />
      </section>
      {!!completedContracts.length && <RewardsSwiper />}

      {/* <section className="mt-10">
          <h4 className="font-medium text-3xl text-center leading-9">
            Explore Challenges
          </h4>
          <div className="mt-8">
            <ChallengesSwiper />
          </div>
          <Link
            href="#"
            className="block mt-7 underline font-semibold text-[10px] text-center"
          >
            See All Challenges
          </Link>
        </section> */}

      <section className="px-4 w-full mt-20 border-t border-[#DADADA] pt-11">
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
        <button className="w-full h-14 mt-5 cursor-pointer border text-[#777777] font-medium border-[#f9f3f3] flex items-center justify-between shadow-sm rounded-2xl overflow-hidden">
          <Image
            className="rounded-2xl"
            src="/icons/garmin.svg"
            width={56}
            height={56}
            alt="Garmin"
          />
          Connect Garmin
          <ChevronRight />
        </button>
      </section>
    </section>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Journey />
    </Suspense>
  );
};

export default page;
