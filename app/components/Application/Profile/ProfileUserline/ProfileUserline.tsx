"use client";

import Image from "next/image";
import { motion } from "motion/react";
import StatBlock from "@/app/components/Shared/StatBlock/StatBlock";
import { handleConvertDistance } from "@/app/lib/utils/convertData";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";
import { Camera } from "lucide-react";

const ProfileUserline = () => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  return (
    <section className="flex justify-between px-2 pt-12 pb-4 rounded-tl-xl rounded-tr-xl relative max-w-4xl mx-auto">
      {user.selected_banner && (
        <div className="inset-0 absolute top-0 left-0 w-full h-full rounded-b-lg overflow-hidden">
          <Image
            className="object-cover"
            src={user.selected_banner?.image_url}
            alt="Banner"
            fill
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        </div>
      )}
      <div className="flex gap-4 relative items-end">
        <div className="flex items-center justify-center relative w-32 h-32">
          {user.selected_frame && (
            <div className="absolute left-0 top-0 h-full w-full">
              <Image
                className="z-20"
                src={user.selected_frame?.image_url}
                alt="Frame"
                fill
              />
            </div>
          )}
          <div className="relative z-10 flex items-end justify-center">
            {user?.full_avatar_url && !imageError ? (
              <Image
                style={
                  user.selected_frame?.image_url
                    ? { height: 120, width: 120 }
                    : { height: 136, width: 136 }
                }
                className="rounded-full object-cover p-0.75 shrink-0"
                src={user.full_avatar_url}
                width={136}
                height={136}
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
                className="border-border shrink-0 border-2 rounded-full w-32 h-32 flex items-center justify-center text-3xl font-bold"
              >
                {user.avatar_symbol || <Camera />}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`font-medium ${
                user.selected_banner ? "text-white" : "text-black"
              }`}
            >
              {user.first_name} {user.last_name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="block font-medium text-neutral-300 text-sm"
            >
              @{user.username}
            </motion.span>
          </div>
          <div className="flex items-stretch">
            <div className="border-r border-neutral-400 px-2">
              <StatBlock
                valueClassName={`block text-center ${
                  user.selected_banner ? "text-white" : "text-black"
                }`}
                labelClassName="text-center text-neutral-400 text-[10px]!"
                label="Distance"
                value={handleConvertDistance(user.total_distance) || "0"}
              />
            </div>
            <div className="border-r border-neutral-400 px-2">
              <StatBlock
                valueClassName={`block text-center ${
                  user.selected_banner ? "text-white" : "text-black"
                }`}
                labelClassName="text-center text-neutral-400 text-[10px]!"
                label="Hours"
                value={user.total_moving_time_hours?.toFixed(1) + " h"}
              />
            </div>
            <div className="px-2">
              <StatBlock
                valueClassName={`block text-center ${
                  user.selected_banner ? "text-white" : "text-black"
                }`}
                labelClassName="text-center text-neutral-400 text-[10px]!"
                label="Runs"
                value={user.total_activities_count?.toString() || "0"}
              />
            </div>
          </div>
        </div>
      </div>
      {user.selected_skin?.image_url && (
        <button className="self-start cursor-pointer relative">
          <Image
            src={user.selected_skin?.image_url || ""}
            alt="Talisman"
            height={80}
            width={80}
          />
        </button>
      )}
    </section>
  );
};

export default ProfileUserline;
