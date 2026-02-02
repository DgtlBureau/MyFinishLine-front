"use client";

import { useEffect, useState } from "react";
import { IAthlete } from "../types";

import { logger } from "@/app/lib/logger";
const useGetStravaUser = () => {
  const [state, setState] = useState<{
    athlete: IAthlete | null;
    isConnected: boolean;
    isLoading: boolean;
  }>({
    athlete: null,
    isConnected: false,
    isLoading: true,
  });

  const fetchStravaUser = async () => {
    try {
      const response = await fetch("/api/strava/user");
      const data = await response.json();

      setState((prev) => ({
        ...prev,
        athlete: data.athlete,
        isConnected: data.isConnected,
        isLoading: false,
      }));
    } catch (error) {
      logger.error("Error fetching Strava user data:", error);
      setState((prev) => ({
        ...prev,
        athlete: null,
        isConnected: false,
        isLoading: false,
      }));
    }
  };

  const handleResetUser = () => {
    setState({
      athlete: null,
      isConnected: false,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchStravaUser();
  }, []);

  return {
    athlete: state.athlete || ({} as IAthlete),
    isConnected: state.isConnected,
    handleResetUser,
    isLoading: state.isLoading,
  };
};

export default useGetStravaUser;
