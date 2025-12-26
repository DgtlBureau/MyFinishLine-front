import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { handleConvertTimeShort } from "@/app/lib/utils/convertData";
import { ChevronDown, EllipsisVertical, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLeaderboard } from "@/app/lib/utils/leaderboardService";
import { setLeaderboard } from "@/app/lib/features/leaderboard/leaderboardSlice";
import { IUser } from "@/app/types/user";

interface ILeaderboardItemProps {
  challengeId: number;
  currentUser: IUser;
}

const containerVariants = {
  expanded: {},
  collapsed: {},
};

const contentVariants = {
  expanded: {
    height: "auto",
  },
  collapsed: {
    height: 220,
  },
};

const buttonVariants = {
  expanded: {
    transform: "rotate(180deg)",
  },
  collapsed: {
    transform: "rotate(0deg)",
  },
};

const LeaderboardItem = ({
  challengeId,
  currentUser,
}: ILeaderboardItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { leaderboard } = useAppSelector((state) => state.leaderboard);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  console.log("leaderboard", leaderboard);

  const handleToggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleLoadLeaderboard = async () => {
    try {
      const data = await getLeaderboard(challengeId);
      dispatch(setLeaderboard(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadLeaderboard();
  }, []);

  return (
    <motion.div
      initial="collapsed"
      variants={containerVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      className="bg-linear-to-b from-[#F4E8FD] via-[#FFFFFF] to-[#F4E8FD] border border-[#E4E4E7] rounded-xl"
    >
      <motion.ul
        initial="collapsed"
        variants={contentVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        className="overflow-hidden"
      >
        <AnimatePresence>
          {leaderboard.map((item, index) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-4 border-b border-[#DADADA]"
            >
              <div className="flex items-center gap-2">
                <div className="w-4">
                  <span
                    className={`text-center font-bold leading-7 flex-1 w text-[100%] text-[#09090B]`}
                  >
                    {index + 1}
                  </span>
                </div>
                {item.user.full_avatar_url ? (
                  <Image
                    className="rounded-lg shrink-0 max-w-10 max-h-10 object-cover"
                    src={item.user.full_avatar_url}
                    width={40}
                    height={40}
                    alt="User image"
                  />
                ) : (
                  <div className="rounded-lg w-10 h-10 flex items-center justify-center shrink-0 border border-[#F4E8FD] bg-white">
                    <Star />
                  </div>
                )}
                <span className="font-medium text-xs leading-4 text-[#09090B]">
                  {item.user.username}
                </span>
              </div>
              <div>
                <span className="text-[8px] font-medium text-[#71717A] block">
                  {item.user.total_distance} km
                </span>
                <span className="text-[8px] font-medium text-[#71717A] block text-end">
                  {handleConvertTimeShort(item.user.total_moving_time_hours)}
                </span>
              </div>
            </li>
          ))}
        </AnimatePresence>
        {/* <div className="mt-2 mx-auto w-full flex justify-center">
          <EllipsisVertical />
        </div> */}
      </motion.ul>
      <div className="flex items-center justify-between p-4 border-b border-[#DADADA]">
        <div className="flex items-center gap-2">
          <div className="w-4">
            <span
              style={currentUser.id > 10 ? { fontSize: 10 } : {}}
              className="block text-center font-bold leading-7 flex-1 w text-[100%] text-[#09090B]"
            >
              {currentUser.id}
            </span>
          </div>
          {user.full_avatar_url ? (
            <Image
              className="rounded-lg shrink-0 max-w-10 max-h-10 object-cover"
              src={user.full_avatar_url}
              width={40}
              height={40}
              alt="User image"
            />
          ) : (
            <div className="rounded-lg w-10 h-10 flex items-center justify-center shrink-0 border border-[#F4E8FD] bg-white">
              <Star />
            </div>
          )}
          <span className="font-medium text-xs leading-4 text-[#09090B]">
            {user.first_name} {user.last_name}
          </span>
        </div>
        <div>
          <span className="text-[8px] font-medium text-[#71717A] block">
            {currentUser.total_distance} km
          </span>
          <span className="text-[8px] font-medium text-[#71717A] block text-end">
            {handleConvertTimeShort(currentUser.total_moving_time_hours)}
          </span>
        </div>
      </div>
      <button
        className="w-full flex justify-center py-2 cursor-pointer"
        onClick={handleToggleExpanded}
      >
        <motion.div variants={buttonVariants}>
          <ChevronDown />
        </motion.div>
      </button>
    </motion.div>
  );
};

export default LeaderboardItem;
