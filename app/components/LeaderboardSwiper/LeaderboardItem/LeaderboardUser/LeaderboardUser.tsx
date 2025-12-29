import { handleConvertTimeShort } from "@/app/lib/utils/convertData";
import { IUser } from "@/app/types/user";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ILeaderboardUserProps extends IUser {
  color: string;
  position: number;
  isCurrentUser: boolean;
}

const LeaderboardUser = ({
  id,
  color,
  position,
  full_avatar_url,
  username,
  avatar_color,
  avatar_symbol,
  total_distance,
  total_moving_time_hours,
  isCurrentUser,
}: ILeaderboardUserProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <li
      key={id}
      style={{
        backgroundColor: color,
      }}
      className={
        "flex items-center justify-between p-4 border-b border-[#DADADA]" +
        color
      }
    >
      <div className="flex items-center gap-2">
        <div className="w-4">
          <span
            className={`text-center font-bold leading-7 flex-1 w text-[100%] text-[#09090B]`}
          >
            {position}
          </span>
        </div>
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
        <div className="font-medium text-xs leading-4 text-[#09090B]">
          {username}
          {isCurrentUser && <div className="text-xs text-black">You</div>}
        </div>
      </div>
      <div>
        <span className="text-[8px] font-medium text-[#71717A] block">
          {(total_distance / 1000)?.toFixed(2)} km
        </span>
        <span className="text-[8px] font-medium text-[#71717A] block text-end">
          {handleConvertTimeShort(total_moving_time_hours)}
        </span>
      </div>
    </li>
  );
};

export default LeaderboardUser;
