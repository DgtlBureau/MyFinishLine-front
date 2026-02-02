import { IContract } from "@/app/types";
import { motion } from "motion/react";
import { Star, ImageOff } from "lucide-react";
import Image from "next/image";
import { memo, useState } from "react";
import { cn } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

const areEqual = (prevProps: IContract, nextProps: IContract) => {
  return prevProps.id === nextProps.id;
};

const IconType = ({
  type,
}: {
  type: "skin" | "banner" | "frame" | "badge";
}) => {
  switch (type) {
    case "skin": {
      return (
        <Image src="/icons/racoon.svg" alt="Racoon" width={20} height={20} />
      );
    }
    case "banner": {
      return (
        <Image src="/icons/banner.svg" alt="Banner" width={20} height={20} />
      );
    }
    case "frame": {
      return (
        <Image src="/icons/frame.svg" alt="Frame" width={20} height={20} />
      );
    }
    case "badge": {
      return (
        <Image src="/icons/badge.svg" alt="Badge" width={20} height={20} />
      );
    }
    default: {
      return <Star />;
    }
  }
};

const handleGetStyle = (
  is_completed: boolean,
  rareness: "common" | "legendary",
) => {
  const style: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
  };
  if (is_completed) {
    style.background = "rgba(255, 255, 255, 0.15)";
    style.border = "1px solid rgba(16, 185, 129, 0.3)";
  }
  if (rareness === "legendary") {
    style.border = "1px solid rgba(255, 255, 255, 0.4)";
  }
  return style;
};

const ImagePlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-2xl border border-white/20">
    <Image
      src="/icons/myfinishline-placeholder.png"
      alt="MyFinishLine"
      width={80}
      height={24}
      className="opacity-40 object-contain"
    />
  </div>
);

const Feature = memo(
  (contract: IContract) => {
    const {
      name,
      description,
      image_url,
      end_date,
      badges,
      banners,
      frames,
      skins,
      reward_type,
      is_completed,
      rare,
      id,
    } = contract;
    const router = useRouter();
    const [imageError, setImageError] = useState(false);
    const rewards = [...badges, ...banners, ...frames, ...skins];
    const firstReward = rewards[0];

    const handleClick = () => {
      const data = encodeURIComponent(JSON.stringify(contract));
      router.push(`/app/contract/${id}?data=${data}`);
    };

    const handleGetDays = () => {
      if (end_date) {
        const endDate = new Date(end_date);
        const currentDate = new Date();
        const d = 24 * 60 * 60 * 1000;
        const daysLeft = Math.abs(
          Math.ceil((Number(endDate) - Number(currentDate)) / d)
        );
        return daysLeft;
      }
    };

    const imageUrl = image_url;
    const showPlaceholder = !imageUrl || imageError;

    return (
      <motion.li
        style={handleGetStyle(is_completed, rare.type)}
        className="rounded-2xl cursor-pointer overflow-hidden h-full"
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        <div className="flex flex-col p-2.5 pb-3 h-full">
          {/* Header: Name + Days badge */}
          <div className="flex items-start justify-between gap-2 mb-2 min-h-[36px]">
            <span
              className="font-semibold text-sm leading-5 text-white line-clamp-2"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.15)" }}
            >
              {name}
            </span>
            {end_date && (
              <div className="shrink-0 px-1.5 py-0.5 bg-[#FFA600] rounded-md font-medium text-[10px] text-white">
                {handleGetDays()}d
              </div>
            )}
          </div>

          {/* Image */}
          <div className="flex items-center justify-center mb-2 flex-1">
            <div className="w-full h-[130px] overflow-hidden rounded-2xl shadow-lg">
              {showPlaceholder ? (
                <ImagePlaceholder />
              ) : (
                <div
                  className={cn(
                    "relative w-full h-full",
                    !is_completed && "grayscale opacity-70"
                  )}
                >
                  <Image
                    src={imageUrl!}
                    alt={firstReward?.name || "Reward"}
                    fill
                    className="object-cover rounded-2xl"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p
            className="text-xs text-white/60 leading-4 text-left overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        </div>
      </motion.li>
    );
  },
  areEqual,
);

export default Feature;
