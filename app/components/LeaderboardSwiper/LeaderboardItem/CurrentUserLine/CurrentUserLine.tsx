import { handleConvertTimeShort } from "@/app/lib/utils/convertData";
import { IUser } from "@/app/types/user";
import { Star } from "lucide-react";
import Image from "next/image";

const CurrentUserLine = ({
  username,
  full_avatar_url,
  total_distance,
  total_moving_time_hours,
  position,
}: IUser & { position: number }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-[#DADADA]">
      <div className="flex items-center gap-2">
        <div className="w-4">
          <span className="block text-center font-bold text-[10px] leading-7 flex-1 w text-[#09090B]">
            {position}
          </span>
        </div>
        {full_avatar_url ? (
          <Image
            className="rounded-lg shrink-0 max-w-10 max-h-10 object-cover"
            src={full_avatar_url}
            width={40}
            height={40}
            alt="User image"
          />
        ) : (
          <div className="rounded-lg w-10 h-10 flex items-center justify-center shrink-0 border border-[#F4E8FD] bg-white">
            <Star />
          </div>
        )}
        <div className="font-medium text-xs leading-4 text-[#09090B]">
          {username}
          <div className="text-xs text-black">You</div>
        </div>
      </div>
      <div>
        <span className="text-[8px] font-medium text-[#71717A] block">
          {total_distance} km
        </span>
        <span className="text-[8px] font-medium text-[#71717A] block text-end">
          {handleConvertTimeShort(total_moving_time_hours)}
        </span>
      </div>
    </div>
  );
};

export default CurrentUserLine;
