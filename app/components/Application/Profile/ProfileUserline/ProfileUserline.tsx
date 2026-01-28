"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { handleConvertDistance } from "@/app/lib/utils/convertData";
import { useAppSelector } from "@/app/lib/hooks";
import { useState } from "react";
import { Camera } from "lucide-react";
import Link from "next/link";

const ProfileUserline = ({ userId }: { userId?: string }) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);

  const currentUser = userId ? profile : user;

  return (
    <section className="flex flex-col items-center px-4 pt-12 pb-4 relative max-w-4xl mx-auto">
      {currentUser.selected_banner && (
        <div className="inset-0 absolute top-0 left-0 w-full h-full rounded-b-lg overflow-hidden">
          <Image
            className="object-cover"
            src={currentUser?.selected_banner?.image_url}
            alt="Banner"
            fill
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
        </div>
      )}

      {/* Avatar */}
      <Link
        href={"settings/personalization/frames"}
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

      {/* Name and Username */}
      <div className="mt-3 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-semibold text-lg text-white block"
        >
          {currentUser.first_name} {currentUser.last_name}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block font-medium text-white/60 text-sm"
        >
          @{currentUser.username}
        </motion.span>
      </div>

      {/* Stats */}
      <div className="flex items-start gap-6 mt-4 relative z-10">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-white/70 font-medium tracking-wider">TOTAL DISTANCE</span>
          <div className="h-[12px]" />
          <span className="font-bold text-white text-lg">
            {handleConvertDistance(currentUser.total_distance) || "0"}
          </span>
        </div>
        <div className="w-px h-14 bg-white/30" />
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-white/70 font-medium tracking-wider">TIME ON TRACK</span>
          <div className="flex items-center gap-0.5 text-[8px] text-white/50">
            <span className="w-5 text-center">DAYS</span>
            <span className="w-2" />
            <span className="w-5 text-center">HRS</span>
            <span className="w-2" />
            <span className="w-5 text-center">MIN</span>
            <span className="w-2" />
            <span className="w-5 text-center">SEC</span>
          </div>
          <div className="flex items-center font-bold text-white text-lg tabular-nums">
            {(() => {
              const totalHours = currentUser.total_moving_time_hours || 0;
              const days = Math.floor(totalHours / 24);
              const hours = Math.floor(totalHours % 24);
              const minutes = Math.floor((totalHours * 60) % 60);
              const seconds = Math.floor((totalHours * 3600) % 60);
              const pad = (n: number) => n.toString().padStart(2, '0');
              return (
                <>
                  <span className="w-5 text-center">{pad(days)}</span>
                  <span className="w-2 text-center text-white/50">:</span>
                  <span className="w-5 text-center">{pad(hours)}</span>
                  <span className="w-2 text-center text-white/50">:</span>
                  <span className="w-5 text-center">{pad(minutes)}</span>
                  <span className="w-2 text-center text-white/50">:</span>
                  <span className="w-5 text-center">{pad(seconds)}</span>
                </>
              );
            })()}
          </div>
        </div>
        <div className="w-px h-14 bg-white/30" />
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-white/70 font-medium tracking-wider">TOTAL ACTIVITIES</span>
          <div className="h-[12px]" />
          <span className="font-bold text-white text-lg">
            {currentUser.total_activities_count?.toString() || "0"}
          </span>
        </div>
      </div>

      {/* Talisman */}
      {currentUser.selected_skin?.image_url && (
        <button className="absolute top-12 right-4 cursor-pointer z-10">
          <Image
            src={currentUser.selected_skin?.image_url || ""}
            alt="Talisman"
            height={60}
            width={60}
          />
        </button>
      )}
    </section>
  );
};

export default ProfileUserline;
