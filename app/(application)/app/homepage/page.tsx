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
import ErrorBoundary from "@/app/components/ErrorBoundary/ErrorBoundary";

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
            className={`transition-[filter,transform] duration-1000 ease-out ${!questStarted ? "fixed inset-0 z-20 flex items-center justify-center overflow-hidden" : ""}`}
            style={{
              filter: questStarted ? "none" : "blur(24px)",
              transform: questStarted ? "none" : "scale(1.8)",
            }}
          >
            <ErrorBoundary
              fallback={
                <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center text-white">
                  <div className="w-16 h-16 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Map Loading Error</h2>
                  <p className="text-gray-300 mb-4 max-w-sm">
                    Unable to load the challenge map. Please refresh the page to try again.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              }
            >
              <Map {...challenge} onMapReady={handleMapReady} />
            </ErrorBoundary>
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
