import { useAppSelector } from "@/app/lib/hooks";
import { handleConvertTimeShort } from "@/app/lib/utils/convertData";
import { ChevronDown, EllipsisVertical, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ILeaderboardItemProps {
  users: {
    id: number;
    image_url: string;
    name: string;
    total_distance: number;
    total_hours: number;
  }[];
  currentUser: { id: number; total_distance: number; total_hours: number };
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

const LeaderboardItem = ({ users, currentUser }: ILeaderboardItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const user = useAppSelector((state) => state.user);

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
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-[#DADADA]"
            >
              <div className="flex items-center gap-2">
                <div className="w-4">
                  <span
                    className={`text-center font-bold leading-7 flex-1 w text-[100%] text-[#09090B]`}
                  >
                    {user.id}
                  </span>
                </div>
                {user.image_url ? (
                  <Image
                    className="rounded-lg shrink-0"
                    src={user.image_url}
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
                  {user.name}
                </span>
              </div>
              <div>
                <span className="text-[8px] font-medium text-[#71717A] block">
                  {user.total_distance}
                </span>
                <span className="text-[8px] font-medium text-[#71717A] block">
                  {handleConvertTimeShort(user.total_hours)}
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
              className="rounded-lg shrink-0"
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
          <span className="text-[8px] font-medium text-[#71717A] block">
            {handleConvertTimeShort(currentUser.total_hours)}
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
