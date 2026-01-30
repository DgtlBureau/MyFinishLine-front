import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLeaderboard } from "@/app/lib/utils/leaderboardService";
import { setLeaderboard } from "@/app/lib/features/leaderboard/leaderboardSlice";
import LeaderboardUser from "./LeaderboardUser/LeaderboardUser";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

interface ILeaderboardItemProps {
  challengeId: number;
  onEmpty?: (isEmpty: boolean) => void;
}

const containerVariants = {
  expanded: {},
  collapsed: {},
};

const CACHE_KEY = "leaderboard_count";

const LeaderboardItem = ({ challengeId, onEmpty }: ILeaderboardItemProps) => {
  const { leaderboards, current_user } = useAppSelector(
    (state) => state.leaderboard,
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [skeletonCount] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(sessionStorage.getItem(`${CACHE_KEY}_${challengeId}`)) || 7;
    }
    return 7;
  });

  const handleLoadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await getLeaderboard(challengeId);
      dispatch(setLeaderboard(data));
      onEmpty?.(!data.leaderboard?.length);
      if (typeof window !== "undefined" && data.leaderboard?.length) {
        sessionStorage.setItem(`${CACHE_KEY}_${challengeId}`, String(data.leaderboard.length));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadLeaderboard();
  }, [challengeId]);

  if (isLoading) {
    return <LeaderboardSkeleton count={skeletonCount} />;
  } else if (leaderboards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 min-h-[60vh]">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/60"
          >
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M7 4h10" />
            <path d="M17 4v4a5 5 0 0 1-10 0V4" />
            <path d="M5 4h14" />
            <path d="M17 8h2a2 2 0 0 1 0 4h-1" />
            <path d="M7 8H5a2 2 0 0 0 0 4h1" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-semibold text-white/90">
            No leaderboard yet
          </p>
          <p className="text-base text-white/60 text-center max-w-[280px]">
            Start logging activities to see your ranking here
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="collapsed"
      variants={containerVariants}
      className="bg-white/40 backdrop-blur-xl backdrop-saturate-200 rounded-2xl border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] overflow-hidden"
    >
      <motion.ul initial="collapsed" className="overflow-hidden">
        <AnimatePresence>
          {leaderboards?.map((item) => {
            return (
              <LeaderboardUser
                key={item.user_id}
                {...item.user}
                position={item.position}
                isCurrentUser={item.user_id === current_user.user.id}
                challengeId={challengeId}
                total_progress={item.total_progress}
                total_hours={item.total_hours}
                user_id={item.user_id}
              />
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {/* {current_user?.position > 10 && (
        <div className="mt-2 mx-auto w-full flex justify-center">
          <EllipsisVertical color="#71717A" />
        </div>
      )}
      {current_user?.position > 10 && (
        <CurrentUserLine
          {...current_user.user}
          position={current_user.position}
        />
      )} */}
    </motion.div>
  );
};

export default LeaderboardItem;
