"use client";

import useGetStravaUser from "@/app/hooks/useGetStravaUser";
import { Camera } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import StatBlock from "@/app/components/Shared/StatBlock/StatBlock";

const ProfileUserline = () => {
  const { athlete, isLoading } = useGetStravaUser();

  return (
    <section className="flex justify-between px-4">
      <div className="flex gap-4">
        {athlete?.profile ? (
          <Image
            className="rounded-[20px]"
            src={athlete.profile}
            width={80}
            height={80}
            quality={75}
            loading="eager"
            alt="Profile image"
          />
        ) : isLoading ? (
          <div className="w-20 h-20 rounded-[20px] animate-pulse-shimmer"></div>
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
              {athlete.firstname} {athlete.lastname}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="block font-medium text-muted-foreground text-sm"
            >
              @{athlete.username}
            </motion.span>
          </div>
          <div className="flex items-center gap-4">
            <StatBlock label="Total distance" value="134.09 km" />
            <StatBlock label="Total hours" value="45.36 hrs" />
            <StatBlock label="Total runs" value="17" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUserline;
