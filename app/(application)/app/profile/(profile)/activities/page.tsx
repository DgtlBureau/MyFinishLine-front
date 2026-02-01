"use client";

import AddActivityModal from "@/app/components/Application/AddActivityModal/AddActivityModal";
import ActivitiesList from "@/app/components/Application/Stats/ActivitiesList/ActivitiesList";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/app/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useAppSelector } from "@/app/lib/hooks";
import { AnimatePresence } from "motion/react";
import { IActivity } from "@/app/types";
import {
  getUserActivities,
  updateUserStravaActivities,
} from "@/app/lib/utils/userService";
import { useNotifications } from "@/app/contexts/NotificationContext";
import Link from "next/link";
import Image from "next/image";
import ActivitiesListShimmer from "@/app/components/Shared/Shimmer/ActivitiesListShimmer/ActivitiesListShimmer";
import { MapPin } from "lucide-react";

export const ActivitiesTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoaded } = useAppSelector((state) => state.activities);
  const { challenges, user } = useAppSelector((state) => state.user);
  const hasTracker = user.has_strava_connect || user.has_fitbit_connect;
  const hasActiveChallenge = challenges && challenges.length > 0;
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdditionalLoading, setIsAdditionalLoading] = useState(false);
  const { checkNotifications } = useNotifications();

  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
  });

  const handleGetActivitiesFromStrava = async () => {
    setIsUpdating(true);
    try {
      await updateUserStravaActivities();
      await checkNotifications();
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLoadActivities = useCallback(
    async (page: number = 1) => {
      setIsLoading(page === 1);
      if (page > 1) {
        setIsAdditionalLoading(true);
      }

      try {
        const data = await getUserActivities({ perPage: 5, page });

        if (page === 1) {
          setActivities(data.data);
        } else {
          const newActivities = data.data.filter(
            (newActivity: IActivity) =>
              !activities.some((existing) => existing.id === newActivity.id),
          );
          setActivities((prev) => [...prev, ...newActivities]);
        }

        hasMoreRef.current = data.last_page ? page < data.last_page : false;
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
        setIsAdditionalLoading(false);
        isLoadingRef.current = false;
      }
    },
    [activities],
  );

  const handleLoadAllActivities = async () => {
    await handleGetActivitiesFromStrava();
    setCurrentPage(1);
    await handleLoadActivities(1);
  };

  useEffect(() => {
    handleLoadActivities(1);
  }, []);

  useEffect(() => {
    if (
      inView &&
      hasMoreRef.current &&
      !isLoadingRef.current &&
      !isAdditionalLoading &&
      !isLoading
    ) {
      isLoadingRef.current = true;
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleLoadActivities(nextPage);
    }
  }, [
    inView,
    currentPage,
    handleLoadActivities,
    isAdditionalLoading,
    isLoading,
  ]);

  if (!hasActiveChallenge) {
    return (
      <main className="relative px-4 max-w-4xl mx-auto">
        <div className="mt-10">
          <h4 className="text-3xl text-center font-medium leading-9 text-white">
            Recent Activities
          </h4>
        </div>
        <div className="mt-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-white/70" />
          </div>
          <h3 className="text-xl font-bold text-white">No active challenge</h3>
          <p className="mt-2 text-sm text-white/70 max-w-xs">
            Start a challenge to track your activities and see your progress
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
    <main className="relative px-4 max-w-4xl mx-auto">
      <div className="mt-10 flex items-center justify-between">
        <div className="flex justify-end">
          <Button
            onClick={handleLoadAllActivities}
            className={`ml-auto mr-0 rounded-full w-10 h-10 bg-white/60 backdrop-blur-xl border border-white/60 shadow-md hover:bg-white/80 ${!hasTracker ? "opacity-30 pointer-events-none" : ""}`}
            variant="ghost"
            disabled={!hasTracker || isUpdating || isLoading}
          >
            <div className={`${isUpdating && "animate-spin"} text-gray-600`}>
              <RefreshCw strokeWidth={2.5} />
            </div>
          </Button>
        </div>
        <h4 className="text-3xl text-center font-medium leading-9 text-white flex-1">
          Recent Activities
        </h4>
        {hasTracker ? (
          <Link
            href="/app/activities/new"
            className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-xl border border-white/60 shadow-md hover:bg-white/80 flex items-center justify-center p-2.5 transition-colors"
          >
            <Image
              src="/icons/navigation-add.svg"
              width={24}
              height={24}
              alt="Add activity"
            />
          </Link>
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-xl border border-white/60 shadow-md flex items-center justify-center p-2.5 opacity-30 pointer-events-none">
            <Image
              src="/icons/navigation-add.svg"
              width={24}
              height={24}
              alt="Add activity"
            />
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="mt-8">
            <ActivitiesListShimmer rows={5} />
          </div>
        ) : activities?.length > 0 ? (
          <div className="mt-8">
            <ActivitiesList activities={activities} loadMoreRef={inViewRef} />
            {isAdditionalLoading && (
              <div className="flex justify-center items-center mt-8">
                <Loader2 width={48} height={48} className="animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white/90">No activities yet</h3>
            <p className="mt-2 text-base text-white/60 max-w-[280px]">
              Connect your Strava or Fitbit account to sync your activities
            </p>
            <Link
              href="/app/profile/journey"
              className="inline-block mt-5 px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold hover:bg-white/40 shadow-lg transition-all"
            >
              Connect Account →
            </Link>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

// Route page renders nothing — content is handled by the layout
const page = () => null;
export default page;
