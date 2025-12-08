"use client";

import ActivitiesList from "@/app/components/Application/Stats/ActivitiesList/ActivitiesList";
import { IActivity } from "@/app/types";
import { Loader, Loader2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const page = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetRunHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/strava/activities");
      const data = await response.json();
      if (data.activities) {
        setActivities(data.activities);
      }
    } catch (error) {
      console.error("Error fetching run history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetRunHistory();
  }, []);

  return (
    <main className="relative px-4">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 width={48} height={48} className="animate-spin" />
          </div>
        ) : activities?.length > 0 ? (
          <div className="mt-2">
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
