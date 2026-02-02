"use client";

import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { updateUserMeasure } from "@/app/lib/features/user/userSlice";
import { MeasureUnit } from "@/app/types/user";
import {
  getDistanceLabel,
  getDistance,
  formatDistance,
  formatDistanceFromMeters,
  formatPace,
  formatSpeed,
} from "@/app/lib/utils/distance";
import { useCallback } from "react";

import { logger } from "@/app/lib/logger";
export function useMeasure() {
  const dispatch = useAppDispatch();
  const measure = useAppSelector((state) => state.user.user.measure) || "km";

  const setMeasure = useCallback(
    async (newMeasure: MeasureUnit) => {
      try {
        const response = await fetch("/back/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ measure: newMeasure }),
        });

        if (response.ok) {
          dispatch(updateUserMeasure(newMeasure));
          return true;
        }
        return false;
      } catch (error) {
        logger.error("Failed to update measure:", error);
        return false;
      }
    },
    [dispatch]
  );

  const label = getDistanceLabel(measure);

  const distance = useCallback(
    (kmValue: number | string, mileValue: number | string) =>
      getDistance(kmValue, mileValue, measure),
    [measure]
  );

  const distanceFormatted = useCallback(
    (kmValue: number | string, mileValue: number | string, decimals?: number) =>
      formatDistance(kmValue, mileValue, measure, decimals),
    [measure]
  );

  const distanceFromMeters = useCallback(
    (metersValue: number, mileValue?: number, decimals?: number) =>
      formatDistanceFromMeters(metersValue, mileValue ?? metersValue * 0.000621371, measure, decimals),
    [measure]
  );

  const pace = useCallback(
    (paceKm: number, paceMile: number) => formatPace(paceKm, paceMile, measure),
    [measure]
  );

  const speed = useCallback(
    (speedKm: number | string, speedMile: number | string, decimals?: number) =>
      formatSpeed(speedKm, speedMile, measure, decimals),
    [measure]
  );

  return {
    measure,
    setMeasure,
    label,
    distance,
    distanceFormatted,
    distanceFromMeters,
    pace,
    speed,
    isMile: measure === "mile",
    isKm: measure === "km",
  };
}
