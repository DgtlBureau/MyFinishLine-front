import { IUser } from "@/app/types/user";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/lib/hooks";

interface ILeaderboardUserProps extends IUser {
  user_id: number;
  position: number;
  isCurrentUser: boolean;
  challengeId: number;
  total_progress: string;
  total_hours: string;
}

const positionColors = {
  1: "#E6C954",
  2: "#DADADA",
  3: "#DD9063",
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
  total_moving_time_hours,
  total_hours,
  total_progress,
  isCurrentUser,
  challengeId,
  selected_frame,
}: ILeaderboardUserProps) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const linkUrl = id !== user.id ? `profile/${id}` : `profile/journey`;

  const positionStyles =
    position < 4
      ? {
          backgroundColor: positionColors[position as 1 | 2 | 3],
          color: "#fff",
        }
      : {
          color: "#09090B",
        };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={id}
      className={
        "flex items-center justify-between p-4 not:last:border-b  not:last:border-[#DADADA]"
      }
    >
      <Link href={linkUrl} className="flex items-center gap-2">
        <div
          style={positionStyles}
          className="w-7 h-7 text-center rounded-full"
        >
          <span
            className={`text-center font-bold leading-7 flex-1 w text-[100%]`}
          >
            {position}
          </span>
        </div>
        <div className="relative w-12.5 h-12.5 flex items-center justify-center">
          {selected_frame && (
            <Image
              src={selected_frame?.image_url}
              width={100}
              height={100}
              alt="skin"
              className="absolute w-full h-full"
            />
          )}
          {!imageError && full_avatar_url ? (
            <Image
              className="rounded-lg shrink-0 max-w-10 max-h-10 object-cover"
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
              className="w-10 h-10 rounded-lg flex items-center justify-center"
            >
              {avatar_symbol}
            </div>
          ) : (
            <div className="rounded-lg w-10 h-10 flex items-center justify-center shrink-0 border border-[#F4E8FD] bg-white">
              <Star />
            </div>
          )}
        </div>
        <div className="font-medium text-xs leading-4 text-[#09090B]">
          {username}
          {isCurrentUser && <div className="text-xs text-black">You</div>}
        </div>
      </Link>
      <div>
        <span className="text-[8px] font-medium text-[#71717A] block">
          {(challengeId
            ? Number(total_progress)
            : Number(total_distance) / 1000
          )?.toFixed(2)}{" "}
          km
        </span>
        <span className="text-[8px] font-medium text-[#71717A] block text-end">
          {challengeId
            ? Number(total_hours).toFixed(1)
            : Number(total_moving_time_hours).toFixed(1)}{" "}
          h
        </span>
      </div>
    </motion.li>
  );
};

export default LeaderboardUser;
