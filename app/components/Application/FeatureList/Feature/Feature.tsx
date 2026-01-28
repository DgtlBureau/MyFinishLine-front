import { IContract } from "@/app/types";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { memo, useState } from "react";
import { cn } from "@/app/lib/utils";
import CustomModal from "@/app/components/Shared/CustomModal/CustomModal";

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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleGetDays = () => {
      if (end_date) {
        const endDate = new Date(end_date);
        const currentDate = new Date();

        const d = 24 * 60 * 60 * 1000;
        const daysLeft = ((Number(currentDate) - Number(endDate)) / d)?.toFixed(
          0,
        );
        return daysLeft;
      }
    };

    return (
      <motion.li
        style={handleGetStyle(is_completed, rare.type)}
        className="bg-white mt-1 rounded-xl cursor-pointer overflow-hidden border border-border"
      >
        <div className="flex flex-col h-[320px] justify-between">
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
                      <div
                        className={cn(
                          "relative flex items-center justify-center cursor-pointer",
                          !is_completed ? "grayscale-100" : "",
                        )}
                        onClick={() => setSelectedImage(reward.image_url)}
                      >
                        <Image
                          className="w-[156px] h-[148px] absolute rounded-lg object-cover"
                          src="/images/application/common.png"
                          width={771}
                          height={1280}
                          alt="Cover"
                        />
                        <Image
                          className="m-1 w-[148px] h-[140px] object-contain shrink-0 rounded-lg relative z-10"
                          src={reward.image_url}
                          width={148}
                          height={140}
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
        <CustomModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        >
          <div className="flex items-center justify-center p-1">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Reward preview"
                width={400}
                height={400}
                className="object-contain max-h-[80vh]"
              />
            )}
          </div>
        </CustomModal>
      </motion.li>
    );
  },
  areEqual,
);

export default Feature;
