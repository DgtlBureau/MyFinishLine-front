"use client";

import Image from "next/image";
import { motion } from "motion/react";
import StatBlock from "@/app/components/Shared/StatBlock/StatBlock";
import {
  handleConvertDistance,
  handleConvertTime,
} from "@/app/lib/utils/convertData";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";
import { Camera } from "lucide-react";

const ProfileUserline = () => {
  const [imageError, setImageError] = useState(false);
  const user = useAppSelector((state) => state.user);

  return (
    <section
      style={
        user.has_strava_connect
          ? {
              background:
                "linear-gradient(180deg, rgba(0, 124, 194, 0.4) 0%, rgba(136, 227, 255, 0.4) 49.62%, rgba(255, 255, 255, 0.4) 100%)",
            }
          : undefined
      }
      className="flex justify-between px-4 py-8 rounded-tl-xl rounded-tr-xl"
    >
      <div className="flex gap-4">
        {!imageError && user?.full_avatar_url ? (
          <Image
            className="rounded-[20px]"
            src={user.full_avatar_url}
            width={80}
            height={80}
            quality={75}
            loading="eager"
            alt="Profile image"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div
            style={{ backgroundColor: user.avatar_color }}
            className="border-border shrink-0 border-2 rounded-[20px] w-20 h-20 flex items-center justify-center text-3xl font-bold"
          >
            {user.avatar_symbol || <Camera />}
          </div>
        )}
        <div>
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium"
            >
              {user.first_name} {user.last_name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="block font-medium text-muted-foreground text-sm"
            >
              @{user.username}
            </motion.span>
          </div>
          <div className="flex items-center gap-4">
            <StatBlock
              label="Total distance"
              value={handleConvertDistance(user.total_distance) || "0"}
            />
            <StatBlock
              label="Total hours"
              value={
                handleConvertTime(user.total_moving_time_hours, "hoursOnly") ||
                "0"
              }
            />
            <StatBlock
              label="Total runs"
              value={user.total_activities_count?.toString() || "0"}
            />
          </div>
        </div>
      </div>
      {user.has_strava_connect && (
        <button className="self-start cursor-pointer relative">
          <Image
            src="/images/application/talisman.png"
            alt="Talisman"
            height={36}
            width={36}
          />
          <div className="z-10 absolute right-0 top-0 w-3 h-3 rounded-full bg-[red] text-[8px] font-medium text-white">
            2
          </div>
        </button>
      )}
    </section>
  );
};

export default ProfileUserline;
