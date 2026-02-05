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
import { Play } from "lucide-react";
import { logger } from "@/app/lib/logger";

const challengeLogoMap: Record<string, string> = {
  "Amazonia Route": "/images/amazonia-route-logo.png",
};

const getTimePassed = (
  startDate: string,
  endDate: string | Date = new Date(),
) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffMs = Math.abs(end.getTime() - start.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const ChallengeCard = ({ userId }: { userId?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useAppDispatch();
  const { challenges, user } = useAppSelector((state) => state.user);
  const { challenges: anotherCahallenges } = useAppSelector(
    (state) => state.profile,
  );
  const { label, isMile } = useMeasure();
  const challenge = userId
    ? anotherCahallenges?.[0]
    : challenges?.[0];

  // Quest started state comes from API (challenge.is_started)
  const questStarted = challenge?.is_started ?? true;

  // Live timer effect
  useEffect(() => {
    if (!challenge?.activate_date || challenge?.completed_at) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [challenge?.activate_date, challenge?.completed_at]);

  const getTimeComponents = () => {
    if (!challenge?.activate_date) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const start = new Date(challenge.activate_date);
    const end = challenge.completed_at ? new Date(challenge.completed_at) : currentTime;
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
  };

  const timeComponents = getTimeComponents();

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
      logger.error(error);
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
      <div className="p-8 border border-white/30 rounded-2xl bg-gradient-to-b from-[#5170D5]/60 via-white/40 to-[#CEE9D8]/60 backdrop-blur-2xl backdrop-saturate-150 shadow-lg text-center">
        <h3 className="text-xl font-bold text-white">
          No active challenge
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Start your adventure and track your progress on an interactive map
        </p>
        {!userId && (
          <Link
            href="/payment"
            className="inline-block mt-5 px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 text-white text-sm font-semibold hover:bg-white/40 shadow-lg transition-all"
          >
            Choose a Quest →
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
      {challenge.logo_url || challenge.image_url || challengeLogoMap[challenge.name] ? (
        <div className="flex justify-center mb-2">
          <Image
            src={challenge.logo_url || challenge.image_url || challengeLogoMap[challenge.name]}
            alt={challenge.name}
            width={220}
            height={90}
            className="object-contain max-h-24"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      ) : (
        <h5 className="text-xl font-bold leading-7 text-white text-center mb-2">
          {challenge.name}
        </h5>
      )}

      <p className="mt-8 text-sm leading-5 text-white/80">
        {challenge.description}
      </p>

      {!questStarted && !userId ? (
        <Link
          href="/app/homepage"
          className="flex items-center justify-center gap-2 mt-6 w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Play size={16} fill="white" />
          Start Quest
        </Link>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-[13px] text-white/70">
              Total Distance {isMile ? (Number(challenge.total_distance_mile) / 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : (Number(challenge.total_distance) / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })} {label}
            </span>
            {challenge.reward_ticket?.id && (
              <>
                <span className="text-white/30">•</span>
                <ShipmentStatusBadge {...challenge.reward_ticket.status} />
              </>
            )}
          </div>
          <div className="mt-6">
            <ProgressLine progress={progress} />
          </div>
          <div className="relative flex justify-between items-end mt-8 min-h-[80px]">
            <div className="flex flex-col gap-1 z-10">
              <span className="text-[9px] text-white/50 font-medium tracking-wide">TOTAL DISTANCE</span>
              <div className="flex flex-col">
                <span className="text-base font-bold leading-5 text-white">
                  {isMile ? (challenge.user_distance_mile || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : (challenge.user_distance || 0).toFixed(2)}
                </span>
                <span className="text-[7px] text-white/50 font-medium">{label}</span>
              </div>
            </div>
            {(challenge.reward?.image_url || challenge.reward_image_url) && (
              <motion.div
                onClick={handleOpenModal}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-[#EEDFBA] to-[#CBA76D] p-1 cursor-pointer shadow-lg"
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
                    src={challenge.reward?.image_url || challenge.reward_image_url || ""}
                    width={1080}
                    height={1080}
                    alt="Medal"
                  />
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
            <div className="flex flex-col gap-1 items-end z-10">
              <span className="text-[9px] text-white/50 font-medium tracking-wide">TIME ON TRACK</span>
              <div className="flex gap-0.5 items-baseline">
                <div className="flex flex-col items-center">
                  <span className="text-base font-bold leading-5 text-white">
                    {timeComponents.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[7px] text-white/50">h</span>
                </div>
                <span className="text-base font-bold text-white/50 leading-5">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-base font-bold leading-5 text-white">
                    {timeComponents.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[7px] text-white/50">m</span>
                </div>
                <span className="text-base font-bold text-white/50 leading-5">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-base font-bold leading-5 text-white">
                    {timeComponents.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[7px] text-white/50">s</span>
                </div>
              </div>
            </div>
          </div>
          {!userId && challenge.is_completed && progress >= 100 && !challenge.reward_ticket ? (
            <Link
              href={`/app/profile/redeem?reward_id=${challenge.reward?.id}&challenge_name=${challenge.name}&challenge_id=${challenge.id}`}
              className="block text-center bg-white/20 backdrop-blur-sm w-full mt-8 border-white/40 py-2.5 px-4 border text-white text-sm leading-6 font-semibold hover:bg-white/40 shadow-lg transition-all rounded-xl cursor-pointer"
            >
              Claim medal
            </Link>
          ) : null}
        </>
      )}
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
          {(challenge.reward?.image_url || challenge.reward_image_url) && (
            <Image
              className="px-4 pb-3 h-[50%] max-h-[calc(100vh-80px)] object-contain"
              src={challenge.reward?.image_url || challenge.reward_image_url || ""}
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
