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

const Activity = ({
  delay,
  activity_name,
  progress,
  activity_time,
  activity_date,
  pace,
  from,
  sport_type,
}: IActivity & { delay: number }) => {
  return (
    <motion.li
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
      className="group shadow-md border border-[#E4E4E7] overflow-hidden rounded-lg"
    >
      <div className="px-4 pt-4 pb-2.5 flex items-center justify-between bg-[#F4E8FD]">
        <div className="flex flex-1 items-center gap-1 font-semibold text-sm leading-5 text-[#09090B]">
          <Route color="#C3B7E2" width={16} height={16} />{" "}
          {handleConvertDistance(Number(progress))}
        </div>
        <div className="flex flex-1 justify-center items-center gap-1 font-semibold text-sm leading-5 text-[#09090B]">
          <Clock color="#C3B7E2" width={16} height={16} />{" "}
          {handleConvertTimeShort(activity_time)}
        </div>
        <div className="flex flex-1 justify-end items-center gap-1 font-semibold text-sm leading-5 text-[#09090B]">
          <Image
            src="/icons/average-time.svg"
            alt="Average speed"
            width={16}
            height={16}
          />
          {Number(pace.toFixed(2))} km/min
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
                    className="rounded-lg shrink-0"
                    src="/icons/strava.svg"
                    height={32}
                    width={32}
                    alt="Strava icon"
                  />
                ) : (
                  <div className="flex items-center justify-center h-8 w-8 bg-linear-to-b from-[#F4E8FD] to-[#C3B7E2] rounded-sm">
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
};

export default Activity;
