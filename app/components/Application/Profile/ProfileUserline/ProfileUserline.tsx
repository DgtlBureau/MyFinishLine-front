"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { handleConvertDistance, getDistanceUnit } from "@/app/lib/utils/convertData";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";
import { Camera } from "lucide-react";
import Link from "next/link";
import ProfileBadges from "../ProfileBadges/ProfileBadges";

const ProfileUserline = ({ userId }: { userId?: string }) => {
  const [imageError, setImageError] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);

  const currentUser = userId ? profile : user;
  const distanceUnit = getDistanceUnit(user.measure);
  const isMiles = user.measure === "mile";
  const displayDistance = isMiles ? currentUser.total_distance_mile : currentUser.total_distance;

  return (
    <section className="flex flex-col items-center px-4 pt-12 pb-4 relative max-w-4xl mx-auto">
      {currentUser.selected_banner && !bannerError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inset-0 absolute top-0 left-0 w-full h-full rounded-b-lg overflow-hidden"
        >
          <Image
            className="object-cover"
            src={currentUser?.selected_banner?.image_url}
            alt="Banner"
            fill
            onError={() => setBannerError(true)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        </motion.div>
      ) : currentUser.selected_banner && bannerError ? (
        <div className="inset-0 absolute top-0 left-0 w-full h-full rounded-b-lg overflow-hidden bg-gradient-to-b from-[#1a2a4a] to-[#2a4a6a]">
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ) : null}

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link
          href={"https://myfinishline.io/app/profile/settings/personalization"}
          className={`flex items-center justify-center relative w-36 h-36 z-10 ${
            userId ? "pointer-events-none" : ""
          }`}
        >
        {currentUser.selected_frame && (
          <div className="absolute left-0 top-0 h-full w-full">
            <Image
              className="z-20"
              src={currentUser.selected_frame?.image_url}
              alt="Frame"
              fill
            />
          </div>
        )}
        <div className="relative z-10 flex items-center justify-center w-32 h-32">
          {currentUser?.full_avatar_url && !imageError ? (
            <div className="relative w-32 h-32">
              <Image
                className="rounded-full object-cover w-32 h-32"
                src={currentUser.full_avatar_url}
                width={128}
                height={128}
                quality={75}
                loading="eager"
                alt="Profile image"
                onError={() => {
                  setImageError(true);
                }}
              />
              {/* Glass effect overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-sm pointer-events-none" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>
          ) : (
            <div
              style={{ backgroundColor: currentUser.avatar_color }}
              className="shrink-0 rounded-full w-32 h-32 flex items-center justify-center text-4xl font-bold relative"
            >
              {currentUser.avatar_symbol || <Camera />}
              {/* Glass effect overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-sm pointer-events-none" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>
          )}
        </div>
      </Link>
      </motion.div>

      {/* Name and Username */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-3 text-center relative z-10"
      >
        <span className="font-semibold text-lg text-white block">
          {currentUser.first_name} {currentUser.last_name}
        </span>
        <span className="block font-medium text-white/60 text-sm">
          @{currentUser.username}
        </span>
      </motion.div>

      {/* Badges */}
      {!userId && <ProfileBadges />}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-0 relative z-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-2 sm:px-3 py-2 sm:py-2.5 w-[calc(100vw-2rem)] sm:max-w-[95vw] md:max-w-2xl mx-auto"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
        <div className="flex items-start justify-center gap-1 sm:gap-2 relative">
          <div className="flex flex-col items-center min-w-0 flex-1">
            <span className="text-[8px] sm:text-[9px] text-white/70 font-medium tracking-tight sm:tracking-wide whitespace-nowrap">TOTAL DISTANCE</span>
            <span className="text-[7px] text-white/50 h-[10px]">&nbsp;</span>
            <span className="font-bold text-white text-sm sm:text-base leading-tight">
              {handleConvertDistance(currentUser.total_distance) || "0"}
            </span>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/30 self-center shrink-0" />
          <div className="flex flex-col items-center min-w-0 flex-1">
            <span className="text-[8px] sm:text-[9px] text-white/70 font-medium tracking-tight sm:tracking-wide whitespace-nowrap">TIME IN JOURNEY</span>
            <div className="flex items-center text-[6px] sm:text-[7px] text-white/50 h-[10px] gap-px sm:gap-0.5">
              <span className="w-4 sm:w-5 text-center">DAYS</span>
              <span className="w-1 sm:w-2" />
              <span className="w-4 sm:w-5 text-center">HRS</span>
              <span className="w-1 sm:w-2" />
              <span className="w-4 sm:w-5 text-center">MIN</span>
              <span className="w-1 sm:w-2" />
              <span className="w-4 sm:w-5 text-center">SEC</span>
            </div>
            <div className="flex items-center font-bold text-white text-sm sm:text-base leading-tight tabular-nums gap-px sm:gap-0.5">
              {(() => {
                const totalHours = currentUser.total_moving_time_hours || 0;
                const days = Math.floor(totalHours / 24);
                const hours = Math.floor(totalHours % 24);
                const minutes = Math.floor((totalHours * 60) % 60);
                const seconds = Math.floor((totalHours * 3600) % 60);
                const pad = (n: number) => n.toString().padStart(2, '0');
                return (
                  <>
                    <span className="w-4 sm:w-5 text-center text-xs sm:text-sm">{pad(days)}</span>
                    <span className="w-1 sm:w-2 text-center text-white/50 text-xs sm:text-sm">:</span>
                    <span className="w-4 sm:w-5 text-center text-xs sm:text-sm">{pad(hours)}</span>
                    <span className="w-1 sm:w-2 text-center text-white/50 text-xs sm:text-sm">:</span>
                    <span className="w-4 sm:w-5 text-center text-xs sm:text-sm">{pad(minutes)}</span>
                    <span className="w-1 sm:w-2 text-center text-white/50 text-xs sm:text-sm">:</span>
                    <span className="w-4 sm:w-5 text-center text-xs sm:text-sm">{pad(seconds)}</span>
                  </>
                );
              })()}
            </div>
          </div>
          <div className="w-px h-8 sm:h-10 bg-white/30 self-center shrink-0" />
          <div className="flex flex-col items-center min-w-0 flex-1">
            <span className="text-[8px] sm:text-[9px] text-white/70 font-medium tracking-tight sm:tracking-wide whitespace-nowrap">TOTAL ACTIVITIES</span>
            <span className="text-[7px] text-white/50 h-[10px]">&nbsp;</span>
            <span className="font-bold text-white text-sm sm:text-base leading-tight">
              {currentUser.total_activities_count?.toString() || "0"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Talisman */}
      {currentUser.selected_skin?.image_url && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-12 right-4 cursor-pointer z-10"
        >
          <Image
            src={currentUser.selected_skin?.image_url || ""}
            alt="Talisman"
            height={60}
            width={60}
          />
        </motion.button>
      )}
    </section>
  );
};

export default ProfileUserline;
