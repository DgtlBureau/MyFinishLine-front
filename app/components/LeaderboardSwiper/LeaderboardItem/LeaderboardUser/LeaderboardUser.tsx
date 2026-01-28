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
    rowBg: "bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100",
    border: "border-2 border-amber-300",
  },
  2: {
    bg: "linear-gradient(135deg, #E8E8E8 0%, #B8B8B8 100%)",
    shadow: "0 4px 15px rgba(192, 192, 192, 0.4)",
    rowBg: "bg-gradient-to-r from-gray-100 via-slate-50 to-gray-100",
    border: "border-2 border-gray-300",
  },
  3: {
    bg: "linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)",
    shadow: "0 4px 15px rgba(205, 127, 50, 0.4)",
    rowBg: "bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100",
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
        backgroundColor: "#f3f4f6",
        color: "#09090B",
      };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.05 }}
      key={id}
      className={`flex items-center justify-between px-3 py-2.5 border-b border-gray-100 last:border-b-0 ${
        isTopThree ? `${topThreeStyles?.rowBg} border-l-4 ${position === 1 ? "border-l-amber-400" : position === 2 ? "border-l-gray-400" : "border-l-orange-400"}` : "bg-white hover:bg-gray-50"
      }`}
    >
      <Link href={linkUrl} className="flex items-center gap-2 flex-1 min-w-0">
        <div
          style={positionBadgeStyles}
          className="w-7 h-7 shrink-0 text-center rounded-full flex items-center justify-center"
        >
          <span className="text-center font-bold text-xs">
            {position}
          </span>
        </div>
        <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
          {selected_frame && (
            <Image
              src={selected_frame?.image_url}
              width={60}
              height={60}
              alt="skin"
              className="absolute w-full h-full"
            />
          )}
          {!imageError && full_avatar_url ? (
            <Image
              className={`rounded-lg shrink-0 w-9 h-9 object-cover ${
                isTopThree ? "ring-2 ring-white shadow-md" : ""
              }`}
              src={full_avatar_url}
              width={36}
              height={36}
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
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                isTopThree ? "ring-2 ring-white shadow-md" : ""
              }`}
            >
              {avatar_symbol}
            </div>
          ) : (
            <div className={`rounded-lg w-9 h-9 flex items-center justify-center shrink-0 border border-[#CEE9D8] bg-white ${
              isTopThree ? "ring-2 ring-white shadow-md" : ""
            }`}>
              <Star className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-semibold text-sm leading-4 text-[#09090B] truncate ${
            isTopThree ? "font-bold" : ""
          }`}>
            {username}
          </div>
          {isCurrentUser && (
            <div className="text-xs font-medium text-blue-600">You</div>
          )}
        </div>
      </Link>
      <div className="text-right shrink-0 ml-2">
        <span className={`font-semibold text-[#09090B] block text-sm ${
          isTopThree ? "font-bold" : ""
        }`}>
          {(challengeId
            ? (isMile ? Number(total_progress_mile) : Number(total_progress))
            : (isMile ? Number(total_distance_mile) : Number(total_distance) / 1000)
          )?.toFixed(2)} {label}
        </span>
        <span className="font-medium text-[#71717A] block text-xs">
          {challengeId
            ? Number(total_hours).toFixed(1)
            : Number(total_moving_time_hours).toFixed(1)} h
        </span>
      </div>
    </motion.li>
  );
};

export default LeaderboardUser;
