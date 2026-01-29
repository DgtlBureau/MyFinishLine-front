import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../axiosInstance";
import { IUser } from "@/app/types/user";
import { INotification } from "@/app/types/notification";

export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
  rewards: () => [...userKeys.all, "rewards"] as const,
  contracts: (type?: string) => [...userKeys.all, "contracts", type] as const,
  challenges: (userId?: string) =>
    [...userKeys.all, "challenges", userId] as const,
  activities: (page: number, perPage: number) =>
    [...userKeys.all, "activities", page, perPage] as const,
  cosmetics: () => [...userKeys.all, "cosmetics"] as const,
  notifications: () => [...userKeys.all, "notifications"] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: IUser }>(
        "/api/user/get-current-user"
      );
      return data.data;
    },
  });
};

export const useUserRewards = () => {
  return useQuery({
    queryKey: userKeys.rewards(),
    queryFn: async () => {
      const { data } = await apiClient.get("/api/user/rewards");
      return data;
    },
  });
};

export const useUserContracts = (type?: "completed" | "not_completed" | "") => {
  return useQuery({
    queryKey: userKeys.contracts(type),
    queryFn: async () => {
      const query = type ? `?type=${type}` : "";
      const { data } = await apiClient.get(`/api/user/contracts${query}`);
      return data;
    },
  });
};

export const useUserChallenges = (userId?: string) => {
  return useQuery({
    queryKey: userKeys.challenges(userId),
    queryFn: async () => {
      const { data } = await apiClient.get("/api/user/challenges", {
        params: userId ? { user_id: userId } : undefined,
      });
      return data;
    },
  });
};

export const useUserActivities = (page: number, perPage: number) => {
  return useQuery({
    queryKey: userKeys.activities(page, perPage),
    queryFn: async () => {
      const { data } = await apiClient.get("/api/user/activities", {
        params: { page, perPage },
      });
      return data;
    },
  });
};

export const useActiveChallenge = () => {
  return useQuery({
    queryKey: ["activeChallenge"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/user/active-challenge");
      return data;
    },
  });
};

export const useUserCosmetics = () => {
  return useQuery({
    queryKey: userKeys.cosmetics(),
    queryFn: async () => {
      const [frames, banners, skins] = await Promise.all([
        apiClient.get("/api/user/cosmetics/frames"),
        apiClient.get("/api/user/cosmetics/banners"),
        apiClient.get("/api/user/cosmetics/skins"),
      ]);
      return {
        frames: frames.data.data,
        banners: banners.data.data,
        skins: skins.data.data,
      };
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<IUser>) => {
      const { data } = await apiClient.post("/api/user/update-user", userData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.current() });
    },
  });
};

export const useRefreshActivities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.get("/api/user/refresh-activities");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.activities(1, 5) });
    },
  });
};

export const useFetchNotifications = () => {
  return useMutation({
    mutationFn: async (): Promise<INotification[]> => {
      const { data } = await apiClient.get("/api/user/notifications");
      return data;
    },
  });
};
