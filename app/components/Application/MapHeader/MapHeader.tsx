"use client";

import TimeCounter from "../../Shared/TimeCounter/TimeCounter";
import { useAppSelector } from "@/app/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useMeasure } from "@/app/hooks/useMeasure";
import { useScrollHide } from "@/app/hooks/useScrollHide";
import { motion } from "framer-motion";

interface IMapHeaderProps {
  challengeName: string;
  startDate: string;
  totalDistance: number;
  totalDistanceMile?: number;
  distance: string;
  distanceMile?: number;
}

const MapHeader = ({
  challengeName,
  startDate,
  totalDistance,
  totalDistanceMile,
  distance,
  distanceMile,
}: IMapHeaderProps) => {
  const { user } = useAppSelector((state) => state.user);
  const challenge = useAppSelector((state) => state.challenge);
  const { label, isMile } = useMeasure();
  const isHidden = useScrollHide();

  const userDist = isMile ? totalDistanceMile : totalDistance;
  const totalDist = isMile ? distanceMile : distance;

  return (
    <motion.header
      className="fixed z-100 w-full overflow-visible"
      initial={{ y: 0 }}
      animate={{ y: isHidden ? "-100%" : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="max-w-2xl p-4 pt-6 pr-6 mx-auto w-full overflow-visible relative" style={{
          background: `linear-gradient(to bottom,
            #1a2a4a 0%,
            #1e3050 10%,
            #213656 18%,
            #243c5c 25%,
            #274260 32%,
            #2a4864 38%,
            #2a4a6a 44%,
            #274860 50%,
            #244556 56%,
            #21424e 62%,
            #1e3f48 68%,
            #1c3c42 74%,
            #1a3a3a 80%,
            rgba(26, 58, 58, 0.8) 92%,
            rgba(26, 58, 58, 0.4) 96%,
            transparent 100%
          )`
        }}>
        <img
          src={challenge.logo_url || "/images/logo-line.png"}
          alt={challengeName}
          className="absolute top-2 left-2 h-20 w-auto object-contain"
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/logo-line.png"; }}
        />
        <div className="mt-24 flex justify-between items-start">
          <div>
            <div className="flex items-start gap-8">
              <div className="flex flex-col">
                <span className="text-[11px] text-white/70 font-medium tracking-wider">
                  TOTAL DISTANCE
                </span>
                <span className="text-[9px] text-white/50 font-medium text-center">
                  You / Quest
                </span>
                <span className="font-bold text-[18px] text-white whitespace-nowrap">
                  {(Number(userDist) / 1000).toFixed(1).replace('.', ',')} / {(Number(totalDist) / 1000).toFixed(1).replace('.', ',')} {label}
                </span>
              </div>
              <TimeCounter startDate={startDate} />
            </div>
          </div>
          <div className="w-28 h-28 relative rounded-full flex items-center justify-center shrink-0 -mt-30 -ml-18">
            {user.selected_frame?.image_url && (
              <Image
                className="w-28 h-28 absolute left-0 top-0 z-20"
                src={user.selected_frame?.image_url}
                width={112}
                height={112}
                alt="Frame"
              />
            )}
            <div className="relative w-24 h-24">
              {user.full_avatar_url ? (
                <Image
                  className="w-24 h-24 rounded-full object-cover"
                  src={user.full_avatar_url}
                  width={96}
                  height={96}
                  alt="Avatar"
                />
              ) : (
                <div
                  className="flex items-center justify-center w-24 h-24 rounded-full"
                  style={{ backgroundColor: user?.avatar_color }}
                >
                  <span className="font-bold text-3xl">{user.avatar_symbol}</span>
                </div>
              )}
              {/* Glass effect overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-18 h-9 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-sm pointer-events-none" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Raccoon mascot - only show when not connected */}
        {!user.has_fitbit_connect && !user.has_strava_connect && (
          <motion.div
            className="mt-4 flex items-end"
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/app/profile/settings" className="flex items-end gap-1">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Image
                  src="/images/application/map-racoon.png"
                  width={70}
                  height={70}
                  alt="Map racoon"
                />
              </motion.div>
              <motion.div
                className="relative bg-white/15 backdrop-blur-xl border border-white/25 py-2 px-3 rounded-xl shadow-lg mb-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: 0.7,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <div
                  className="absolute -left-1.5 bottom-3 w-0 h-0
                  border-t-6 border-t-transparent
                  border-r-6 border-r-white/15
                  border-b-6 border-b-transparent"
                />
                <p className="text-[12px] font-medium text-white/80 leading-tight">
                  Connect <span className="text-blue-500 font-semibold">Strava</span> or <span className="text-teal-500 font-semibold">Fitbit</span>
                </p>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default MapHeader;
