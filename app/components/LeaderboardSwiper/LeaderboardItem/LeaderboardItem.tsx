import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLeaderboard } from "@/app/lib/utils/leaderboardService";
import { setLeaderboard } from "@/app/lib/features/leaderboard/leaderboardSlice";
import LeaderboardUser from "./LeaderboardUser/LeaderboardUser";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

interface ILeaderboardItemProps {
  challengeId: number;
}

const containerVariants = {
  expanded: {},
  collapsed: {},
};

const CACHE_KEY = "leaderboard_count";

const LeaderboardItem = ({ challengeId }: ILeaderboardItemProps) => {
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
      <div className="block text-center text-sm text-white/70">
        Leaderboard is not available or empty
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
