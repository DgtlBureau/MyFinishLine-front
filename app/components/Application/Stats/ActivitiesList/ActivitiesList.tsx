"use client";

import { IActivity } from "@/app/types";
import Activity from "./Activity/Activity";
import { motion } from "motion/react";

interface IActivitiesListProps {
  activities: IActivity[];
}

const ActivitiesList = ({ activities = [] }: IActivitiesListProps) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No activities yet</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {activities.map((activity, index) => (
        <Activity key={activity.id} delay={index * 0.05} {...activity} />
      ))}
    </ul>
  );
};
export default ActivitiesList;
