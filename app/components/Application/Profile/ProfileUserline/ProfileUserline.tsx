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
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="flex justify-between px-4 py-8 rounded-tl-xl rounded-tr-xl relative">
      {user.selected_banner && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Image src={user.selected_banner?.image_url} alt="Banner" fill />
        </div>
      )}
      <div className="flex gap-4 relative">
        <div className="relative w-16 h-16">
          {user.selected_frame && (
            <div className="absolute left-0 top-0 h-full w-full">
              <Image src={user.selected_frame?.image_url} alt="Frame" fill />
            </div>
          )}
          <div className="relative z-10 flex items-center justify-center">
            {user?.full_avatar_url && !imageError ? (
              <Image
                className="rounded-full h-16 w-16 object-cover p-0.5 shrink-0"
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
                className="border-border shrink-0 border-2 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold"
              >
                {user.avatar_symbol || <Camera />}
              </div>
            )}
          </div>
        </div>
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
