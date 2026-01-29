import { IActivity } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import {
  handleConvertDate,
  handleConvertDistance,
  handleConvertTimeShort,
} from "@/app/lib/utils/convertData";
import { Clock, Route, Activity as ActivityIcon } from "lucide-react";
import { ActivityImage } from "./ActivityImage";
import { forwardRef } from "react";
import { useMeasure } from "@/app/hooks/useMeasure";

const Activity = forwardRef<HTMLLIElement, IActivity & { delay: number }>(({
  delay,
  activity_name,
  progress,
  progress_mile,
  activity_time,
  activity_date,
  pace,
  pace_mile,
  from,
  sport_type,
}, ref) => {
  const { pace: formatPace, label: distanceUnit } = useMeasure();
  const displayPace = formatPace(Number(pace), Number(pace_mile));
  return (
    <motion.li
      ref={ref}
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: delay,
      }}
      className="group shadow-lg border border-white/30 overflow-hidden rounded-2xl bg-white/40 backdrop-blur-2xl backdrop-saturate-150 relative"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="px-4 pt-4 pb-2.5 flex items-center justify-between bg-gradient-to-r from-[#5170D5]/80 to-[#CEE9D8]/80 backdrop-blur-sm">
        <div className="flex flex-1 items-center gap-1 font-semibold text-sm leading-5 text-[#09090B]">
          <Route color="#5170D5" width={16} height={16} />{" "}
          {handleConvertDistance(Number(progress))}
        </div>
        <div className="flex flex-1 justify-center items-center gap-1 font-semibold text-sm leading-5 text-[#09090B]">
          <Clock color="#5170D5" width={16} height={16} />{" "}
          {handleConvertTimeShort(activity_time)}
        </div>
        <div className="flex flex-1 justify-end items-center gap-1 font-semibold text-sm leading-5 text-[#09090B]">
          <Image
            src="/icons/average-time.svg"
            alt="Average speed"
            width={16}
            height={16}
          />
          {displayPace} {distanceUnit}/min
        </div>
      </div>
      <div className="pt-2 px-2 sm:px-6 pb-6">
        <div className="flex gap-4 h-full items-stretch">
          <ActivityImage sport_type={sport_type} />
          <div className="w-full flex flex-col justify-between">
            <span className="block text-lg leading-7 font-medium text-[#09090B]">
              {activity_name}
            </span>
            <div className="w-full flex items-end justify-between flex-1">
              <div>
                <span className="block text-[#71717A] text-[10px]">
                  {handleConvertDate(activity_date)}
                </span>
              </div>
              <div className="flex items-end gap-2">
                {from === "strava" ? (
                  <Image
                    className="shrink-0"
                    src="/icons/strava-new.png"
                    height={32}
                    width={32}
                    alt="Strava icon"
                  />
                ) : (
                  <div className="flex items-center justify-center h-8 w-8 bg-linear-to-b from-[#CEE9D8] to-[#5170D5] rounded-sm">
                    <ActivityIcon width={16} height={16} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
});

Activity.displayName = "Activity";

export default Activity;
