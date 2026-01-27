"use client";

import { motion } from "framer-motion";
import { useAppSelector } from "@/app/lib/hooks";
import { getDistanceUnit } from "@/app/lib/utils/convertData";

interface StatsBlockProps {
  completedDistance: number;
  distance: string;
  steps: Array<{ completed: boolean }>;
  startDate: string;
  completedDistanceMile?: number;
  distanceMile?: string;
}

const MapStats = ({
  steps,
  completedDistance,
  distance,
  startDate,
  completedDistanceMile,
  distanceMile,
}: StatsBlockProps) => {
  const { user } = useAppSelector((state) => state.user);
  const distanceUnit = getDistanceUnit(user.measure);
  const isMiles = user.measure === "mile";

  const displayCompletedDistance = isMiles ? completedDistanceMile : completedDistance;
  const displayDistance = isMiles ? distanceMile : distance;

  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercentage = (Number(displayCompletedDistance) / Number(displayDistance)) * 100;

  const createdDate = new Date(startDate);
  const currentDate = new Date();

  const d = 24 * 60 * 60 * 1000;
  const daysOnTrack = (Number(currentDate) - Number(createdDate)) / d;

  return (
    <motion.div className="sticky w-40 bottom-4 right-4 z-30 float-right">
      <motion.div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-3 border border-gray-200/50 overflow-hidden">
        <motion.div className="mb-3 mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">Distance</span>
            <span className="text-xs font-semibold text-gray-800">
              {displayCompletedDistance || 0}/{displayDistance || 0} {distanceUnit}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-600">On track</span>
            <span className="text-xs font-semibold text-green-600">
              {(daysOnTrack || 0)?.toFixed(2)} days
            </span>
          </div>
        </motion.div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-semibold text-gray-800">
              {completedSteps}/{steps.length} steps
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500">
              {(progressPercentage || 0).toFixed(0)}%
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MapStats;
