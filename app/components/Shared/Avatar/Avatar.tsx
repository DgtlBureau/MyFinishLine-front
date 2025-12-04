import { User } from "lucide-react";
import Image from "next/image";

interface IAvatarProps {
  imageSrc?: string;
  fullName?: string;
  size?: number;
}

const handleMakeInitials = (name: string) => {
  const namesArray = name.trim().split(" ");
  if (namesArray.length === 0) return "";
  if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();
  const firstInitial = namesArray[0].charAt(0).toUpperCase();
  const lastInitial = namesArray[namesArray.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
};

const Avatar = ({ size = 48, imageSrc, fullName }: IAvatarProps) => {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        width={size}
        height={size}
        alt={fullName || ""}
        className={`object-cover rounded-full w-[${size}px] h-[${size}px]`}
      />
    );
  }
  if (!imageSrc && fullName) {
    return (
      <div
        className={`w-[${size}px] h-[${size}px] flex items-center justify-center text-sm border border-border rounded-full font-bold`}
      >
        {handleMakeInitials(fullName)}
      </div>
    );
  }
  if (!imageSrc && fullName) {
    return (
      <div
        className={`w-[${size}px] h-[${size}px] flex items-center justify-center`}
      >
        <User />
      </div>
    );
  }
};

export default Avatar;
