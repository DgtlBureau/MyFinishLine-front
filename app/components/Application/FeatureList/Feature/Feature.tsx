import { IContract } from "@/app/types";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import { cn } from "@/app/lib/utils";

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
  rareness: "common" | "legendary"
) => {
  const style = {
    background: "#fff",
    border: "",
  };
  if (is_completed) {
    style.background = "linear-gradient(180deg, #fff 20%, #9ef097 90%)";
  }
  if (rareness === "legendary") {
    style.border = "2px solid #FFD700";
  }
  return style;
};

const Feature = memo(
  ({
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
  }: IContract) => {
    const rewards = [...badges, ...banners, ...frames, ...skins];

    const handleGetDays = () => {
      if (end_date) {
        const endDate = new Date(end_date);
        const currentDate = new Date();

        const d = 24 * 60 * 60 * 1000;
        const daysLeft = ((Number(currentDate) - Number(endDate)) / d)?.toFixed(
          0
        );
        return daysLeft;
      }
    };

    return (
      <motion.li
        style={handleGetStyle(is_completed, rare.type)}
        className="bg-white mt-1 rounded-xl cursor-pointer overflow-hidden border border-border"
      >
        <div className="flex flex-col h-[284px] gap-4 justify-between">
          <div className="flex gap-4 px-4 pt-4">
            <div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shrink-0 border border-[#F4E8FD]">
                {image_url ? (
                  <Image
                    src={image_url}
                    alt="Feature image"
                    width={40}
                    height={40}
                  />
                ) : (
                  <IconType type={reward_type} />
                )}
              </div>
              <div className="text-xs text-center">{reward_type}</div>
              {end_date && (
                <div className="mx-auto mt-2 w-fit p-1 py-px bg-[#FFA600] rounded-lg font-medium text-[8px] text-center text-white">
                  {handleGetDays()}
                </div>
              )}
            </div>
            <div>
              <span className="font-medium text-base leading-7 text-[#09090B]">
                {name}
              </span>
              <p className="mb-0 mt-auto text-sm text-[#71717A] leading-6">
                {description}
              </p>
            </div>
          </div>
          {rewards.length ? (
            <ul className="flex items-center flex-col gap-2 mt-2 bg-linear-to-b from-[#F4E8FD00] to-[#C3B7E2] p-4">
              {rewards.map((reward, index) => {
                return (
                  <li className="shrink-0" key={index}>
                    {reward.image_url && (
                      <div className="relative flex items-center justify-center">
                        <Image
                          className="w-34 h-full absolute rounded-lg object-cover"
                          src="/images/application/common.png"
                          width={771}
                          height={1280}
                          alt="Cover"
                        />
                        <Image
                          className="m-1 w-32 h-full object-cover shrink-0 rounded-lg relative z-10"
                          src={reward.image_url}
                          width={128}
                          height={128}
                          alt="Reward"
                        />
                      </div>
                    )}
                    <span className="block mt-1 text-center text-xs text-[#09090B]">
                      {reward.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </motion.li>
    );
  },
  areEqual
);

export default Feature;
