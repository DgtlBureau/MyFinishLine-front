"use client";

import { setChallenge, updateChallenge } from "@/app/lib/features/challenge/challengeSlice";
import { getUserActiveChallenge } from "@/app/lib/utils/userService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import Clouds from "@/app/components/Map/Clouds/Clouds";
import { useEffect, useState, useRef, useCallback } from "react";
import Map from "@/app/components/Map/Map";
import MapHeader from "@/app/components/Application/MapHeader/MapHeader";
import LoadingScreen from "@/app/components/Application/LoadingScreen/LoadingScreen";
import StartJourney from "@/app/components/Application/StartJourney/StartJourney";
import { AnimatePresence, motion } from "framer-motion";
import { logger } from "@/app/lib/logger";

const Page = () => {
  const challenge = useAppSelector((state) => state.challenge);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const hasCachedChallenge = challenge?.id > 0;

  const [isFetching, setIsFetching] = useState(!hasCachedChallenge);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [questStarted, setQuestStarted] = useState(true);

  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const handleMapReady = useCallback(() => {
    setMapReady(true);
  }, []);

  // Check localStorage for quest started state
  useEffect(() => {
    if (challenge?.id > 0) {
      const key = `quest_started_${challenge.id}`;
      const stored = localStorage.getItem(key);
      setQuestStarted(stored === "true");
    }
  }, [challenge?.id]);

  const handleStartQuest = useCallback(() => {
    if (challenge?.id > 0) {
      localStorage.setItem(`quest_started_${challenge.id}`, "true");
    }
    setQuestStarted(true);
  }, [challenge?.id]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const hasSeenClouds = sessionStorage.getItem("clouds_seen");

    if (!hasCachedChallenge && !hasSeenClouds) {
      setShouldAnimate(true);
    }

    const loadChallenge = async () => {
      if (!hasCachedChallenge) {
        setIsFetching(true);
      }

      try {
        const data = await getUserActiveChallenge();
        if (data) {
          dispatch(setChallenge(data));
        }
      } catch (error) {
        logger.error("Failed to load challenge:", error);
      } finally {
        sessionStorage.setItem("clouds_seen", "true");
        setIsFetching(false);
      }
    };

    loadChallenge();
  }, []);

  const isActive = challenge?.status?.type === "active";
  const showMap = (hasCachedChallenge || !isFetching) && isActive;

  const showSplash = !mapReady && showMap;

  // Scroll map to bottom when quest not started (user starts from bottom of map)
  useEffect(() => {
    if (mapReady && !questStarted && mapWrapperRef.current) {
      mapWrapperRef.current.scrollTop = mapWrapperRef.current.scrollHeight;
    }
  }, [mapReady, questStarted]);

  // Safety timeout: force mapReady after 5s to prevent infinite loading
  useEffect(() => {
    if (!showMap || mapReady) return;
    const timer = setTimeout(() => setMapReady(true), 5000);
    return () => clearTimeout(timer);
  }, [showMap, mapReady]);

  return (
    <>
      <AnimatePresence mode="wait">
        {(isFetching || showSplash) && !shouldAnimate && (
          <LoadingScreen isVisible={true} />
        )}
      </AnimatePresence>
      {shouldAnimate && !hasCachedChallenge && (
        <Clouds isVisible={isFetching || showSplash} />
      )}
      {showMap ? (
        <>
          {mapReady && questStarted && (
            <MapHeader
              challengeName={challenge.name}
              startDate={challenge.activate_date}
              totalDistance={challenge.user_distance}
              totalDistanceMile={challenge.user_distance_mile}
              distance={challenge.total_distance}
              distanceMile={challenge.total_distance_mile}
            />
          )}
          {/* Dark background + bottom overlay when quest not started */}
          {!questStarted && (
            <>
              <div className="fixed inset-0 z-10 bg-[#1a2a4a]" />
              <div className="fixed bottom-0 left-0 right-0 h-1/3 z-25 bg-gradient-to-t from-[#1a2a4a] via-[#1a2a4a]/80 to-transparent pointer-events-none" />
            </>
          )}
          <div
            ref={mapWrapperRef}
            className={`transition-opacity duration-1000 ease-out ${!questStarted ? "fixed inset-0 z-20 overflow-hidden opacity-0 pointer-events-none" : ""}`}
          >
            <Map {...challenge} onMapReady={handleMapReady} />
          </div>
          <AnimatePresence>
            {mapReady && !questStarted && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StartJourney mode="start" onStart={handleStartQuest} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        !isFetching && !hasCachedChallenge && <StartJourney />
      )}
    </>
  );
};

export default Page;
