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
import { useMeasure } from "@/app/hooks/useMeasure";

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
  const { challenges } = useAppSelector((state) => state.user);
  const { challenges: anotherCahallenges } = useAppSelector(
    (state) => state.profile,
  );
  const { label, isMile } = useMeasure();
  const challenge = userId
    ? anotherCahallenges?.[0]
    : challenges?.[0];

  const hours = challenge?.activate_date
    ? getTimePassed(challenge.activate_date, challenge.completed_at)
    : "0h";

  const progress = challenge
    ? (challenge.user_distance / +challenge.total_distance) * 100
    : 0;

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

  if (!challenge) {
    return (
      <div className="p-6 border border-white/30 rounded-2xl bg-gradient-to-b from-[#5170D5]/60 via-white/40 to-[#CEE9D8]/60 backdrop-blur-2xl backdrop-saturate-150 shadow-lg">
        <span className="block text-center">No active challenge available</span>
        {!userId && (
          <Link className="block text-center mt-2 underline" href="/payment">
            Purchase one here
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="relative p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-xl overflow-hidden">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#5170D5]/20 via-transparent to-[#CEE9D8]/20 pointer-events-none" />
      {/* Content */}
      <div className="relative z-10">
      {/* Challenge Logo/Title */}
      {challenge.image_url ? (
        <div className="flex justify-center mb-2">
          <Image
            /*@ts-ignore */
            src={challenge.image_url}
            alt={challenge.name}
            width={220}
            height={90}
            className="object-contain max-h-24"
          />
        </div>
      ) : (
        <h5 className="text-xl font-bold leading-7 text-white text-center mb-2">
          {challenge.name}
        </h5>
      )}

      <div className="flex items-center justify-center gap-2">
        <span className="text-[13px] text-white/70">
          Total Distance {isMile ? challenge.total_distance_mile : challenge.total_distance} {label}
        </span>
        {challenge.reward_ticket?.id && (
          <>
            <span className="text-white/30">•</span>
            <ShipmentStatusBadge {...challenge.reward_ticket.status} />
          </>
        )}
      </div>
      <p className="mt-8 text-sm leading-5 text-white/80">
        {challenge.description}
      </p>
      <div className="mt-6">
        <ProgressLine progress={progress} />
      </div>
      <div className="flex justify-between items-center mt-8">
        <span className="text-xl font-bold leading-6 text-white min-w-[80px]">
          {(isMile ? challenge.user_distance_mile : challenge.user_distance) || 0} {label}
        </span>
        {challenge.reward?.image_url && (
          <motion.div
            onClick={handleOpenModal}
            className="relative flex items-center justify-center rounded-full w-28 h-28 bg-gradient-to-b from-[#EEDFBA] to-[#CBA76D] p-1 cursor-pointer shadow-lg"
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.5,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FFD700]/40 to-[#CBA76D]/40 blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="bg-white w-full h-full rounded-full relative z-10 overflow-hidden">
              <Image
                className="p-2 w-full object-contain h-full"
                src={challenge.reward?.image_url}
                width={1080}
                height={1080}
                alt="Medal"
              />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent"
                initial={{ x: "-100%", y: "-100%" }}
                animate={{ x: "100%", y: "100%" }}
                transition={{
                  duration: 1.5,
                  delay: 1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </div>
          </motion.div>
        )}
        <span className="text-xl font-bold leading-6 text-white min-w-[80px] text-right">
          {hours || 0}
        </span>
      </div>
      {!userId && challenge.is_completed ? (
        <Link
          href={`/app/profile/redeem?reward_id=${challenge.reward?.id}&challenge_name=${challenge.name}&challenge_id=${challenge.id}`}
          className="block text-center bg-white/20 backdrop-blur-sm w-full mt-8 border-white/40 py-2.5 px-4 border text-white text-sm leading-6 font-semibold hover:bg-white/40 shadow-lg transition-all rounded-xl cursor-pointer"
        >
          Claim medal
        </Link>
      ) : null}
      </div>
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
