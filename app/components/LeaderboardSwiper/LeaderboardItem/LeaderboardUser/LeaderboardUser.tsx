import { IUser } from "@/app/types/user";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/lib/hooks";
import { useMeasure } from "@/app/hooks/useMeasure";

interface ILeaderboardUserProps extends IUser {
  user_id: number;
  position: number;
  isCurrentUser: boolean;
  challengeId: number;
  total_progress: string;
  total_progress_mile?: number;
  total_hours: string;
}

const positionColors = {
  1: {
    bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    shadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
    rowBg: "bg-gradient-to-r from-amber-200/50 via-yellow-100/30 to-amber-200/50",
    border: "border-2 border-amber-300",
  },
  2: {
    bg: "linear-gradient(135deg, #E8E8E8 0%, #B8B8B8 100%)",
    shadow: "0 4px 15px rgba(192, 192, 192, 0.4)",
    rowBg: "bg-gradient-to-r from-gray-200/50 via-slate-100/30 to-gray-200/50",
    border: "border-2 border-gray-300",
  },
  3: {
    bg: "linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)",
    shadow: "0 4px 15px rgba(205, 127, 50, 0.4)",
    rowBg: "bg-gradient-to-r from-orange-200/50 via-amber-100/30 to-orange-200/50",
    border: "border-2 border-orange-300",
  },
};

const LeaderboardUser = ({
  id,
  user_id,
  position,
  full_avatar_url,
  username,
  avatar_color,
  avatar_symbol,
  total_distance,
  total_distance_mile,
  total_moving_time_hours,
  total_hours,
  total_progress,
  total_progress_mile,
  isCurrentUser,
  challengeId,
  selected_frame,
}: ILeaderboardUserProps) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { label, isMile } = useMeasure();

  const linkUrl = id !== user.id ? `profile/${id}` : `profile/journey`;

  const isTopThree = position <= 3;
  const topThreeStyles = isTopThree
    ? positionColors[position as 1 | 2 | 3]
    : null;

  const positionBadgeStyles = isTopThree
    ? {
        background: topThreeStyles?.bg,
        boxShadow: topThreeStyles?.shadow,
        color: "#fff",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.3)",
        color: "#fff",
      };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: position * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileTap={{ scale: 0.98, backgroundColor: "rgba(255,255,255,0.7)" }}
      key={id}
      className={`flex items-center justify-between px-3 py-3 border-b border-white/20 last:border-b-0 cursor-pointer transition-colors duration-200 ${
        isTopThree ? `${topThreeStyles?.rowBg} border-l-4 ${position === 1 ? "border-l-amber-400" : position === 2 ? "border-l-gray-400" : "border-l-orange-400"}` : "bg-white/20 hover:bg-white/40 active:bg-white/60"
      }`}
    >
      <Link href={linkUrl} className="flex items-center gap-3 flex-1 min-w-0">
        <div
          style={positionBadgeStyles}
          className="w-7 h-7 shrink-0 text-center rounded-full flex items-center justify-center"
        >
          <span className="text-center font-bold text-xs">
            {position}
          </span>
        </div>
        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
          {selected_frame && (
            <Image
              src={selected_frame?.image_url}
              width={72}
              height={72}
              alt="skin"
              className="absolute w-full h-full"
            />
          )}
          {!imageError && full_avatar_url ? (
            <Image
              className={`rounded-full shrink-0 w-10 h-10 object-cover ${
                isTopThree ? "ring-2 ring-white shadow-md" : ""
              }`}
              src={full_avatar_url}
              width={40}
              height={40}
              alt="User image"
              onError={() => {
                setImageError(true);
              }}
            />
          ) : avatar_symbol ? (
            <div
              style={{
                backgroundColor: avatar_color,
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${
                isTopThree ? "ring-2 ring-white shadow-md" : ""
              }`}
            >
              {avatar_symbol}
            </div>
          ) : (
            <div className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 border border-[#CEE9D8] bg-white ${
              isTopThree ? "ring-2 ring-white shadow-md" : ""
            }`}>
              <Star className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-[15px] leading-5 text-white truncate ${
            isTopThree ? "font-bold" : "font-semibold"
          }`}>
            {username}
          </div>
          {isCurrentUser && (
            <div className="text-[12px] font-semibold text-[#5170D5]">You</div>
          )}
        </div>
      </Link>
      <div className="text-right shrink-0 ml-3">
        <span className={`text-white block text-[16px] tabular-nums tracking-tight ${
          isTopThree ? "font-bold" : "font-semibold"
        }`}>
          {(challengeId
            ? (isMile ? Number(total_progress_mile) : Number(total_progress))
            : (isMile ? Number(total_distance_mile) : Number(total_distance) / 1000)
          )?.toFixed(2)} {label}
        </span>
        <span className="text-white/70 block text-[12px] font-medium tabular-nums">
          {challengeId
            ? Number(total_hours).toFixed(1)
            : Number(total_moving_time_hours).toFixed(1)} h
        </span>
      </div>
    </motion.li>
  );
};

export default LeaderboardUser;
