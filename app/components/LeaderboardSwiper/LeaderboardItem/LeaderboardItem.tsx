import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLeaderboard } from "@/app/lib/utils/leaderboardService";
import { setLeaderboard } from "@/app/lib/features/leaderboard/leaderboardSlice";
import LeaderboardUser from "./LeaderboardUser/LeaderboardUser";
import Loader from "../../Shared/Loader/Loader";

interface ILeaderboardItemProps {
  challengeId: number;
}

const containerVariants = {
  expanded: {},
  collapsed: {},
};

const LeaderboardItem = ({ challengeId }: ILeaderboardItemProps) => {
  const { leaderboards, current_user } = useAppSelector(
    (state) => state.leaderboard,
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLoadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await getLeaderboard(challengeId);
      dispatch(setLeaderboard(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadLeaderboard();
  }, [challengeId]);

  return (
    <motion.div
      initial="collapsed"
      variants={containerVariants}
      className="bg-linear-to-b from-[#F4E8FD] via-[#FFFFFF] to-[#F4E8FD] border border-[#E4E4E7] rounded-xl overflow-hidden"
    >
      <motion.ul initial="collapsed" className="overflow-hidden">
        <AnimatePresence>
          {leaderboards.length > 0 ? (
            leaderboards?.map((item) => {
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
            })
          ) : isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader />
            </div>
          ) : (
            "No data available"
          )}
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
