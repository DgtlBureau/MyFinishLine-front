import { IActivity } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  handleConvertDate,
  handleConvertDistance,
  handleConvertTimeShort,
} from "@/app/lib/utils/convertData";
import { Clock, Route } from "lucide-react";

const Activity = ({
  delay,
  activity_name,
  progress,
  activity_time,
  activity_date,
  average_speed,
  from,
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
        <div className="flex items-center gap-2.5 font-semibold text-sm leading-5 text-[#09090B]">
          <Route color="#C3B7E2" width={16} height={16} />{" "}
          {handleConvertDistance(Number(progress))}
        </div>
        <div className="flex items-center gap-2.5 font-semibold text-sm leading-5 text-[#09090B]">
          <Clock color="#C3B7E2" width={16} height={16} />{" "}
          {handleConvertTimeShort(activity_time)}
        </div>
        <div className="flex items-center gap-2.5 font-semibold text-sm leading-5 text-[#09090B]">
          <Image
            src="/icons/average-time.svg"
            alt="Average speed"
            width={16}
            height={16}
          />
          {average_speed} m/s
        </div>
      </div>
      <div className="pt-2 px-2 sm:px-6 pb-6">
        <div className="flex gap-4 h-full items-stretch">
          <Image
            className="shrink-0 h-20 w-20"
            src="/images/application/challenge1.png"
            width={78}
            height={78}
            alt="Challenge"
          />
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
                <span className="text-[10px] text-[#71717A]">
                  via <span className="capitalize">{from}</span>
                </span>
                {from === "strava" ? (
                  <Image
                    className="rounded-lg shrink-0"
                    src="/icons/strava.svg"
                    height={32}
                    width={32}
                    alt="Strava icon"
                  />
                ) : (
                  <Image
                    className="rounded-lg"
                    src="/icons/garmin.svg"
                    height={32}
                    width={32}
                    alt="Garmin icon"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <Link href="#" className="underline font-semibold text-[10px]">
            Go to Journey
          </Link>
          <button className="p-2">
            <Image
              src="/icons/share.svg"
              width={18}
              height={16}
              alt="Arrow right"
            />
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default Activity;
