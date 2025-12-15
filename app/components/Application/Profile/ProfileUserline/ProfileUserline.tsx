"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import StatBlock from "@/app/components/Shared/StatBlock/StatBlock";
import { useState } from "react";
import {
  handleConvertDistance,
  handleConvertTime,
} from "@/app/lib/utils/convertData";
import { useAppSelector } from "@/app/lib/hooks";

interface IStats {
  all_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
}

const ProfileUserline = () => {
  const [stats, setStats] = useState<IStats>({} as IStats);
  const user = useAppSelector((state) => state.user);

  console.log(user);

  return (
    <section className="flex justify-between px-4">
      <div className="flex gap-4">
        {user?.full_avatar_url ? (
          <Image
            className="rounded-[20px]"
            src={user.full_avatar_url}
            width={80}
            height={80}
            quality={75}
            loading="eager"
            alt="Profile image"
          />
        ) : (
          <div className="border-border shrink-0 border-2 rounded-[20px] w-20 h-20 flex items-center justify-center shadow-inner shadow-accent">
            <Camera />
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
              value={
                handleConvertDistance(stats.all_run_totals?.distance) || "0"
              }
            />
            <StatBlock
              label="Total hours"
              value={
                handleConvertTime(
                  stats.all_run_totals?.moving_time,
                  "hoursOnly"
                ) || "0"
              }
            />
            <StatBlock
              label="Total runs"
              value={stats.all_run_totals?.count?.toString() || "0"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUserline;
