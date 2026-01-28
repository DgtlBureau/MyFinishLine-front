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
            #5170D5 0%,
            #5575D5 10%,
            #5A7AD6 18%,
            #6080D6 25%,
            #6888D4 32%,
            #7090D0 38%,
            #7A9BC8 44%,
            #85A6C4 50%,
            #90B0C2 56%,
            #9BBAC0 62%,
            #A6C4C4 68%,
            #B1CEC8 74%,
            #BCD8CE 80%,
            #C8E2D4 86%,
            rgba(206, 233, 216, 0.8) 92%,
            rgba(206, 233, 216, 0.4) 96%,
            transparent 100%
          )`
        }}>
        <Image src="/images/logo-header.png" width={180} height={55} alt="Logo" className="absolute top-2 left-0" />
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
                  {Number(userDist).toFixed(1).replace('.', ',')} / {Number(totalDist).toFixed(1).replace('.', ',')} km
                </span>
              </div>
              <TimeCounter startDate={startDate} />
            </div>

            {/* Raccoon helper */}
            {!user.has_fitbit_connect && !user.has_strava_connect && (
              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Link href="/app/profile/settings" className="flex gap-1 items-center mt-12 cursor-pointer">
                  <motion.div
                    className="relative"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <Image
                      src="/images/application/map-racoon.png"
                      width={180}
                      height={180}
                      alt="Map racoon"
                      className="-ml-4"
                    />
                  </motion.div>
                  <motion.div
                    className="relative bg-white py-2.5 px-4 rounded-2xl shadow-md max-w-[200px] ml-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 1.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                  <div
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0
                    border-t-8 border-t-transparent
                    border-r-8 border-r-white
                    border-b-8 border-b-transparent"
                  />
                  <motion.p
                    className="text-[13px] font-semibold text-gray-800 leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.7 }}
                  >
                      Connect <span className="text-blue-600">Strava</span> or <span className="text-blue-600">FitBit</span> to track progress!
                    </motion.p>
                  </motion.div>
                </Link>
              </motion.div>
            )}
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
      </div>
    </motion.header>
  );
};

export default MapHeader;
