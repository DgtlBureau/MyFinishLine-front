"use client";

import AddActivityModal from "@/app/components/Application/AddActivityModal/AddActivityModal";
import ActivitiesList from "@/app/components/Application/Stats/ActivitiesList/ActivitiesList";
import { Button } from "@/app/components/ui/button";
import { addActivity } from "@/app/lib/features/activities/activitiesSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  getUserActivities,
  updateUserStravaActivities,
} from "@/app/lib/utils/userService";
import { IActivity } from "@/app/types";
import { Loader2, Plus, RefreshCw } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Page = () => {
  const [activitiesData, setActivitiesData] = useState<{
    last_page: number | null;
  }>({
    last_page: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoaded } = useAppSelector((state) => state.activities);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdditionalLoading, setIsAdditionalLoading] = useState(false);

  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
  });

  const handleGetActivitiesFromStrava = async () => {
    setIsUpdating(true);
    try {
      await updateUserStravaActivities();
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
        const data = await getUserActivities({ perPage: 10, page });
        setActivitiesData(data);

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
  const dispatch = useAppDispatch();

  const handleLoadAllActivities = async () => {
    await handleGetActivitiesFromStrava();
    setCurrentPage(1);
    await handleLoadActivities(1);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      if (!isLoaded) {
        await handleGetActivitiesFromStrava();
      }

      await handleLoadActivities(1);
    };

    loadInitialData();
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

  const handleAddActivity = (activity: IActivity) => {
    setActivities((prevState) => {
      return [activity, ...prevState];
    });
  };

  return (
    <main className="relative px-4 max-w-4xl mx-auto">
      <div className="mt-10 flex items-center justify-between">
        <div className="flex-1">
          <AddActivityModal handleAddActivity={handleAddActivity} />
        </div>
        <h4 className="text-3xl text-center font-medium leading-9 text-[#09090B] flex-1">
          Recent Activities
        </h4>
        <div className="flex-1 flex justify-end">
          <Button
            onClick={handleLoadAllActivities}
            className="ml-auto mr-0 rounded-full w-10 h-10"
            disabled={isUpdating || isLoading}
          >
            <div className={`${isUpdating && "animate-spin"}`}>
              <RefreshCw />
            </div>
          </Button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="flex justify-center items-center mt-8">
            <Loader2 width={48} height={48} className="animate-spin" />
          </div>
        ) : activities?.length > 0 ? (
          <div className="mt-8">
            <ActivitiesList activities={activities} />
            {isAdditionalLoading ? (
              <div className="flex justify-center items-center mt-8">
                <Loader2 width={48} height={48} className="animate-spin" />
              </div>
            ) : (
              <>
                {hasMoreRef.current && (
                  <div
                    ref={inViewRef}
                    className="block text-center mt-2 text-xs text-neutral-400"
                  >
                    Scroll down to see more
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-sm py-10">
            No activities found. Connect your Strava account to see your
            activities here.
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Page;
