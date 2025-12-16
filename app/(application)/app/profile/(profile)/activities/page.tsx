"use client";

import ActivitiesList from "@/app/components/Application/Stats/ActivitiesList/ActivitiesList";
import { setActivities } from "@/app/lib/features/activities/activitiesSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const page = () => {
  const { isLoaded, activities } = useAppSelector((state) => state.activities);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetActivitiesFromStrava = async () => {
    setIsLoading(true);
    try {
      await axios.get("/api/user/refresh-activities");
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadActivities = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/user/activities");
      dispatch(setActivities(data?.data || []));
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      handleGetActivitiesFromStrava();
    }
    handleLoadActivities();
  }, []);

  return (
    <main className="relative px-4">
      <h4 className="mt-10 text-3xl text-center font-medium leading-9 text-[#09090B]">
        Recent Activities
      </h4>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="flex justify-center items-center mt-8">
            <Loader2 width={48} height={48} className="animate-spin" />
          </div>
        ) : activities?.length > 0 ? (
          <div className="mt-8">
            <ActivitiesList activities={activities} />
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

export default page;
