import { IActivity } from "@/app/types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  handleConvertDate,
  handleConvertDistance,
  handleConvertTime,
} from "@/app/lib/utils/convertData";

const Activity = ({
  delay,
  name,
  distance,
  elapsed_time,
  start_date,
  location_country,
  location_city,
}: IActivity & { delay: number }) => {
  const location = [location_city, location_country].filter(Boolean).join(", ");

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
      <div className="px-6 pt-6 pb-4 flex items-center justify-between bg-[#F4E8FD]">
        <span className="font-semibold text-3xl leading-5 text-[#09090B]">
          {handleConvertDistance(distance)}
        </span>
        <div className="flex items-end gap-2">
          <span className="text-[10px] text-[#71717A]">via Strava</span>
          <Image
            className="rounded-lg"
            src="/icons/strava.svg"
            height={32}
            width={32}
            alt="Strava icon"
          />
        </div>
      </div>
      <div className="pt-2 px-6 pb-6">
        <div className="flex gap-4 items-end">
          <Image
            src="/images/application/challenge1.png"
            width={78}
            height={78}
            alt="Challenge"
          />
          <div>
            <span className="block text-lg leading-7 font-medium text-[#09090B]">
              {name}
            </span>
            {location && (
              <span className="block text-[#71717A] text-[10px]">
                {location}
              </span>
            )}
            <span className="block text-[#71717A] text-[10px]">
              {handleConvertTime(elapsed_time)}
            </span>
            <span className="block text-[#71717A] text-[10px]">
              {handleConvertDate(start_date)}
            </span>
          </div>
        </div>
        <div className="mt-1 flex items-end justify-between">
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
