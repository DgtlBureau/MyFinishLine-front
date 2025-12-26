import Image from "next/image";
import Link from "next/link";
import ProgressLine from "../Shared/ProgressLine/ProgressLine";
import CustomModal from "../Shared/CustomModal/CustomModal";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getUserChallenges } from "@/app/lib/utils/userService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setUserChallenges } from "@/app/lib/features/user/userSlice";

const ChallengeCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { challenges } = useAppSelector((state) => state.user);
  const challenge = challenges[0] || {
    user_distance: 0,
    total_distance: 0,
    image_url: "",
    reward: {
      image_url: "",
    },
  };

  const progress =
    (challenge?.user_distance / +challenge?.total_distance) * 100;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleLoadChallenges = async () => {
    try {
      const data = await getUserChallenges();
      dispatch(setUserChallenges(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleLoadChallenges();
  }, []);

  return (
    <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
      <div className="flex gap-3">
        {/*@ts-ignore */}
        {challenge.image_url && (
          <Image
            className="shrink-0"
            /*@ts-ignore */
            src={challenge.image_url}
            alt="Challenge 1"
            width={78}
            height={78}
          />
        )}
        <div className="w-full flex flex-col justify-between">
          <h5 className="mt-2.5 text-lg font-medium leading-7 text-[#09090B]">
            {challenge.name}
          </h5>
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              {challenge.total_distance} km
            </span>
            <Link
              href="/app/homepage"
              className="underline font-semibold text-[10px] text-black"
            >
              Go to map
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-8 text-sm leading-5 text-muted-foreground">
        {challenge.description}
      </p>
      <div className="mt-6">
        <ProgressLine progress={progress} />
      </div>
      <div className="flex justify-between mt-8">
        <span className="mt-2.5 text-sm font-semibold leading-5 text-[#09090B]">
          {challenge.user_distance} km
        </span>
        {challenge.reward?.image_url && (
          <div className="relative flex items-center justify-center rounded-full max-w-30 max-h-30 bg-linear-to-b from-[#EEDFBA] to-[#CBA76D] p-1">
            <div className="bg-white w-full h-full rounded-full">
              <Image
                className="p-2  w-full object-contain h-full"
                src={challenge.reward?.image_url}
                width={1080}
                height={1080}
                alt="Medal"
              />
            </div>
          </div>
        )}
        <span className="mt-2.5 text-sm font-semibold leading-5 text-[#09090B]">
          41.7 hrs
        </span>
      </div>
      {challenge.reward_ticket?.id ? (
        <div className="mt-8 mx-auto text-sm grid grid-cols-2 max-w-full lg:max-w-60">
          <span className="text-[#90909B]">Shipment status:</span>
          <div className="text-end">{challenge.reward_ticket.status.name}</div>
          <span className="text-[#90909B]">Shipment id:</span>
          <div className="text-end">{challenge.reward_ticket.id}</div>
        </div>
      ) : challenge.is_completed ? (
        <Link
          href={`/app/profile/redeem?reward_id=${challenge.reward?.id}`}
          className="block text-center bg-transparent w-full mt-8 border-black py-2 px-4 border text-black text-sm leading-6 font-medium hover:bg-white hover:text-black shadow-xs transition-colors rounded-lg cursor-pointer"
        >
          Claim medal
        </Link>
      ) : (
        ""
      )}
      <button
        onClick={handleOpenModal}
        className="underline mt-4 font-semibold text-[10px] text-black block mx-auto cursor-pointer"
      >
        Look at the medal
      </button>

      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <motion.div
          animate={{ rotateY: [20, -20, 20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {challenge.reward?.image_url && (
            <Image
              className="px-4 pb-3 h-[50%] max-h-[calc(100vh-80px)] object-contain"
              src={challenge.reward?.image_url}
              width={1080}
              height={1080}
              quality={100}
              alt="Medal"
            />
          )}
        </motion.div>
      </CustomModal>
    </div>
  );
};

export default ChallengeCard;
