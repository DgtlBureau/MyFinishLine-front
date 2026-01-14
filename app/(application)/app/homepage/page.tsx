"use client";

import { setChallenge } from "@/app/lib/features/challenge/challengeSlice";
import { getUserActiveChallenge } from "@/app/lib/utils/userService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import Clouds from "@/app/components/Map/Clouds/Clouds";
import { useEffect, useState } from "react";
import Map from "@/app/components/Map/Map";
import MapHeader from "@/app/components/Application/MapHeader/MapHeader";

const Page = () => {
  const challenge = useAppSelector((state) => state.challenge);
  const dispatch = useAppDispatch();

  const [isFetching, setIsFetching] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleLoadChallenge = async () => {
    try {
      const data = await getUserActiveChallenge();
      if (data) {
        dispatch(setChallenge(data));
      }
    } catch (error) {
      console.error("Failed to load challenge:", error);
    } finally {
      sessionStorage.setItem("clouds_seen", "true");
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const hasSeenClouds = sessionStorage.getItem("clouds_seen");

    if (hasSeenClouds) {
      setIsFetching(false);
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
    }

    handleLoadChallenge();
  }, [dispatch]);

  const isActive = challenge?.status.type === "active";

  return (
    <>
      {shouldAnimate && <Clouds isVisible={isFetching} />}
      {isActive ? (
        <>
          <MapHeader challengeName={challenge.name} />
          <Map {...challenge} />
        </>
      ) : (
        <div className="fixed w-full h-full bg-neutral-900 text-white flex items-center justify-center">
          No active challenge found
        </div>
      )}
    </>
  );
};

export default Page;
