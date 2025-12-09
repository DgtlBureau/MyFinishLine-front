import Image from "next/image";
import Link from "next/link";
import ProgressLine from "../Shared/ProgressLine/ProgressLine";
import CustomModal from "../Shared/CustomModal/CustomModal";
import { useState } from "react";
import { motion } from "motion/react";

const ChallengeCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
      <div className="flex gap-3">
        <Image
          className="shrink-0"
          src="/images/application/challenge1.png"
          alt="Challenge 1"
          width={78}
          height={78}
        />
        <div className="w-full flex flex-col justify-between">
          <h5 className="mt-2.5 text-lg font-medium leading-7 text-[#09090B]">
            Amazonia Route
          </h5>
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">649 km</span>
            <Link
              href="/myfinishline/homepage"
              className="underline font-semibold text-[10px] text-black"
            >
              Go to map
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-8 text-sm leading-5 text-muted-foreground">
        We are traveling around South America to find some treasures!
      </p>
      <div className="mt-6">
        <ProgressLine progress={70} />
      </div>
      <div className="flex justify-between mt-8">
        <span className="mt-2.5 text-sm font-semibold leading-5 text-[#09090B]">
          523 km
        </span>
        <div className="relative flex items-center justify-center rounded-full max-w-30 max-h-30 bg-linear-to-b from-[#EEDFBA] to-[#CBA76D] p-1">
          <div className="bg-white w-full h-full rounded-full">
            <Image
              className="px-4 pb-3 w-full object-contain h-full"
              src="/images/application/medal.png"
              width={1080}
              height={1080}
              alt="Medal"
            />
          </div>
        </div>
        <span className="mt-2.5 text-sm font-semibold leading-5 text-[#09090B]">
          41.7 hrs
        </span>
      </div>
      <button className="bg-transparent w-full mt-8 border-white py-2 px-4 border text-white text-sm leading-6 font-medium hover:bg-white hover:text-black shadow-xs transition-colors rounded-lg cursor-pointer">
        Сlaim medal
      </button>
      <button
        onClick={handleOpenModal}
        className="underline mt-4 font-semibold text-[10px] text-black block mx-auto cursor-pointer"
      >
        Look at the medal
      </button>

      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <motion.div
          animate={{ rotateY: [20, -20, 20] }} // Animate x position from 0 to 100 and back to 0
          transition={{
            duration: 10, // Duration of one full cycle (forward and backward)
            repeat: Infinity, // Repeat indefinitely
            repeatType: "reverse", // Reverse direction on each repeat
            ease: "easeInOut", // Easing function for a smooth transition
          }}
        >
          <Image
            className="px-4 pb-3 h-[50%] max-h-[calc(100vh-80px)] object-contain"
            src="/images/application/medal.png"
            width={1080}
            height={1080}
            quality={100}
            alt="Medal"
          />
        </motion.div>
      </CustomModal>
    </div>
  );
};

export default ChallengeCard;
