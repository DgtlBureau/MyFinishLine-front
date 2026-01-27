import Image from "next/image";
import Link from "next/link";
import ProgressLine from "../Shared/ProgressLine/ProgressLine";
import CustomModal from "../Shared/CustomModal/CustomModal";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getUserChallenges } from "@/app/lib/utils/userService";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setUserChallenges } from "@/app/lib/features/user/userSlice";
import ShipmentStatusBadge from "../Shared/ShipmentStatusBadge/ShipmentStatusBadge";
import { ShipmentStatuses } from "@/app/types";
import { setUserProfieChallenges } from "@/app/lib/features/profile/profileSlice";
import { getDistanceUnit } from "@/app/lib/utils/convertData";

const getTimePassed = (
  startDate: string,
  endDate: string | Date = new Date(),
) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffMs = Math.abs(end.getTime() - start.getTime());

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours || 0}h ${minutes || 0}m`;
};

const ChallengeCard = ({ userId }: { userId?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { challenges, user } = useAppSelector((state) => state.user);
  const { challenges: anotherCahallenges } = useAppSelector(
    (state) => state.profile,
  );
  const challenge = userId
    ? anotherCahallenges?.[0]
    : challenges?.[0] || {
        user_distance: 0,
        total_distance: 0,
        image_url: "",
        reward: {
          image_url: "",
        },
      };

  const distanceUnit = getDistanceUnit(user.measure);
  const isMiles = user.measure === "mile";

  const displayTotalDistance = isMiles ? challenge?.total_distance_mile : challenge?.total_distance;
  const displayUserDistance = isMiles ? challenge?.user_distance_mile : challenge?.user_distance;

  const hours = getTimePassed(challenge?.activate_date, challenge?.completed_at);

  const progress =
    (Number(displayUserDistance) / Number(displayTotalDistance)) * 100;

  const handleLoadChallenges = async () => {
    try {
      const data = await getUserChallenges(userId);
      if (userId) {
        dispatch(setUserProfieChallenges(data.data));
      } else {
        dispatch(setUserChallenges(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleLoadChallenges();
  }, []);

  if (!userId && !challenges?.[0]) {
    return (
      <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
        <span className="block text-center">No active challenge available</span>
        <Link className="block text-center mt-2 underline" href="/payment">
          Purchase one here
        </Link>
      </div>
    );
  }

  if (userId && !anotherCahallenges?.[0]) {
    return (
      <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
        <span className="block text-center">No active challenge available</span>
        <Link className="block text-center mt-2 underline" href="/payment">
          Purchase one here
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 border border-[#e4e4e7] rounded-xl bg-linear-to-b from-[#C3B7E2] via-[#FBFBFB] to-[#F4E8FD]">
      <div className="flex gap-3 items-start">
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
          <h5 className="text-lg font-medium leading-7 text-[#09090B]">
            {challenge.name}
          </h5>
          <div className="w-full flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">
              Total Distance {displayTotalDistance} {distanceUnit}
            </span>
          </div>
        </div>

        {challenge.reward_ticket?.id && (
          <div>
            <div className="ml-auto mr-0">
              <ShipmentStatusBadge {...challenge.reward_ticket.status} />
            </div>
            {challenge.reward_ticket.status.type !==
              ShipmentStatuses.received && (
              <div className="text-[13px] text-muted-foreground mt-1">
                Shipment ID {challenge.reward_ticket.id}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-8 text-sm leading-5 text-muted-foreground">
        {challenge.description}
      </p>
      <div className="mt-6">
        <ProgressLine progress={progress} />
      </div>
      <div className="flex justify-between mt-8">
        <span className="mt-2.5 text-lg font-semibold leading-5 text-[#09090B]">
          {displayUserDistance || 0} {distanceUnit}
        </span>
        {challenge.reward?.image_url && (
          <div
            onClick={handleOpenModal}
            className="relative flex flex-1 items-center justify-center rounded-full max-w-60 max-h-60 bg-linear-to-b from-[#EEDFBA] to-[#CBA76D] p-1 cursor-pointer"
          >
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
        <span className="mt-2.5 text-lg font-semibold leading-5 text-[#09090B]">
          {hours || 0}
        </span>
      </div>
      {!userId && challenge.is_completed ? (
        <Link
          href={`/app/profile/redeem?reward_id=${challenge.reward?.id}&challenge_name=${challenge.name}&challenge_id=${challenge.id}`}
          className="block text-center bg-transparent w-full mt-8 border-black py-2 px-4 border text-black text-sm leading-6 font-medium hover:bg-white hover:text-black shadow-xs transition-colors rounded-lg cursor-pointer"
        >
          Claim medal
        </Link>
      ) : (
        ""
      )}
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
