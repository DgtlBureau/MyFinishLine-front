import { useQuery } from "@tanstack/react-query";
import apiClient from "../axiosInstance";

export const leaderboardKeys = {
  all: ["leaderboard"] as const,
  general: () => [...leaderboardKeys.all, "general"] as const,
  byChallenge: (challengeId: number) =>
    [...leaderboardKeys.all, "challenge", challengeId] as const,
};

export const useLeaderboard = (challengeId?: number) => {
  const isGeneral = challengeId === 0 || challengeId === undefined;

  return useQuery({
    queryKey: isGeneral
      ? leaderboardKeys.general()
      : leaderboardKeys.byChallenge(challengeId!),
    queryFn: async () => {
      const url = isGeneral
        ? "/api/leaderboard/general-leaderboard"
        : "/api/leaderboard/get-users";
      const { data } = await apiClient.get(url, {
        params: isGeneral ? undefined : { challenge_id: challengeId },
      });
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useGeneralLeaderboard = () => {
  return useQuery({
    queryKey: leaderboardKeys.general(),
    queryFn: async () => {
      const { data } = await apiClient.get(
        "/api/leaderboard/general-leaderboard"
      );
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
};
