"use client";

import { IActivity } from "@/app/types";
import Activity from "./Activity/Activity";
import { useCallback } from "react";

interface IActivitiesListProps {
  activities: IActivity[];
  loadMoreRef?: (node?: Element | null) => void;
}

const ActivitiesList = ({ activities = [], loadMoreRef }: IActivitiesListProps) => {
  const setRef = useCallback(
    (index: number) => (node: HTMLLIElement | null) => {
      if (index === activities.length - 3 && loadMoreRef) {
        loadMoreRef(node);
      }
    },
    [activities.length, loadMoreRef]
  );

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No activities yet</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5 pb-2">
      {activities.map((activity, index) => (
        <Activity
          key={activity.id}
          delay={index * 0.05}
          ref={setRef(index)}
          {...activity}
        />
      ))}
    </ul>
  );
};
export default ActivitiesList;
