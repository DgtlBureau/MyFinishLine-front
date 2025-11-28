"use client";

import { IActivity } from "@/app/types";
import Activity from "./Activity/Activity";
import { motion } from "motion/react";

interface IActivitiesListProps {
  activities: IActivity[];
}

const ActivitiesList = ({ activities = [] }: IActivitiesListProps) => {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2"
    >
      {activities.map((activity) => (
        <Activity key={activity.id} {...activity} />
      ))}
    </motion.ul>
  );
};

export default ActivitiesList;
