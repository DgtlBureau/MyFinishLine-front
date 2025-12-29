import { IContract } from "@/app/types";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";
import { memo, useState } from "react";

const variants = {
  expanded: {},
  collapsed: {},
};

const areEqual = (prevProps: IContract, nextProps: IContract) => {
  return prevProps.id === nextProps.id;
};

const contentVariants = {
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: easeInOut,
      },
      opacity: {
        duration: 0.2,
        delay: 0.05,
      },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: easeInOut,
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
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
  }: IContract) => {
    const rewards = [...badges, ...banners, ...frames];
    const [isExpanded, setIsExpanded] = useState(false);

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

    const handleToggleIsExpanded = () => {
      setIsExpanded((prevState) => !prevState);
    };

    return (
      <motion.li
        onClick={handleToggleIsExpanded}
        variants={variants}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="bg-white mt-1 rounded-xl cursor-pointer overflow-hidden"
      >
        <div className="flex gap-4 pt-4 px-4 pb-2">
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
                <Star width={20} height={20} />
              )}
            </div>
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
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              layout
              style={{
                background:
                  "linear-gradient(180deg, rgba(244, 232, 253, 0) 0%, #C3B7E2 100%)",
              }}
              className="overflow-hidden"
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              {/* 👇 padding moved here */}
              <div className="p-4">
                <span>Rewards</span>

                {rewards.length ? (
                  <ul className="flex items-center flex-wrap gap-1">
                    {rewards.map((reward) => (
                      <li key={reward.id}>
                        {reward.image_src && (
                          <Image
                            src={reward.image_src}
                            width={80}
                            height={80}
                            alt="Reward"
                          />
                        )}
                        <span className="block text-center">{reward.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="block text-sm text-[#71717A]">
                    No rewards given
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    );
  },
  areEqual
);

export default Feature;
