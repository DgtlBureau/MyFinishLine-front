import { IActivity } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import {
  handleConvertDate,
  handleConvertDistance,
  handleConvertTimeShort,
} from "@/app/lib/utils/convertData";
import { Clock, Route, Activity as ActivityIcon, Gauge } from "lucide-react";
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
  average_speed,
  average_speed_mile,
}, ref) => {
  const { speed: formatSpeed } = useMeasure();
  const displaySpeed = formatSpeed(average_speed || 0, average_speed_mile || 0);
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
      className="group shadow-lg border border-white/30 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl backdrop-saturate-150 relative"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <div className="px-4 pt-3 pb-2.5 flex items-end justify-between gap-3 bg-gradient-to-r from-[#3B5CC6]/40 to-[#4DA67A]/40 backdrop-blur-sm">
        <div className="flex flex-1 flex-col items-center gap-0.5">
          <span className="text-[9px] text-white/50 font-medium tracking-wide">DISTANCE</span>
          <div className="flex items-center gap-1 font-semibold text-sm text-white whitespace-nowrap">
            <Route color="#7B9AE8" width={16} height={16} />{" "}
            {handleConvertDistance(Number(progress))}
          </div>
        </div>
        <div className="w-px h-8 bg-white/30 shrink-0" />
        <div className="flex flex-1 flex-col items-center gap-0.5">
          <span className="text-[9px] text-white/50 font-medium tracking-wide">TIME</span>
          <div className="flex items-center gap-1 font-semibold text-sm text-white whitespace-nowrap">
            <Clock color="#7B9AE8" width={16} height={16} />{" "}
            {handleConvertTimeShort(activity_time)}
          </div>
        </div>
        <div className="w-px h-8 bg-white/30 shrink-0" />
        <div className="flex flex-1 flex-col items-center gap-0.5">
          <span className="text-[9px] text-white/50 font-medium tracking-wide">PACE</span>
          <div className="flex items-center gap-1 font-semibold text-sm text-white whitespace-nowrap">
            <Gauge color="#7B9AE8" width={16} height={16} />
            {displaySpeed}
          </div>
        </div>
      </div>
      <div className="pt-2 px-2 sm:px-6 pb-6">
        <div className="flex gap-4 h-full items-center">
          <ActivityImage sport_type={sport_type} />
          <div className="w-full flex flex-col justify-between">
            <span className="block text-lg leading-7 font-medium text-white">
              {activity_name}
            </span>
            <div className="w-full flex items-end justify-between flex-1">
              <div>
                <span className="block text-white/60 text-sm font-medium">
                  {handleConvertDate(activity_date)}
                </span>
              </div>
              <div className="flex items-end gap-2">
                {from === "strava" ? (
                  <Image
                    className="shrink-0"
                    src="/icons/strava-new.png"
                    height={64}
                    width={64}
                    alt="Strava icon"
                  />
                ) : from === "fitbit" ? (
                  <Image
                    className="shrink-0"
                    src="/icons/fitbit-full.png"
                    height={64}
                    width={64}
                    alt="Fitbit icon"
                  />
                ) : (
                  <div className="flex items-center justify-center h-16 w-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    <ActivityIcon width={32} height={32} className="text-[#4A5FC1]" />
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
