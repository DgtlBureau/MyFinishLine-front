"use client";

import React, { createContext, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import { useFetchNotifications, userKeys } from "@/app/lib/api/queries/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { INotification } from "@/app/types/notification";

interface NotificationContextType {
  checkNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { mutateAsync: fetchNotifications } = useFetchNotifications();
  const queryClient = useQueryClient();

  const checkNotifications = useCallback(async () => {
    try {
      const notifications = await fetchNotifications();

      if (notifications && notifications.length > 0) {
        notifications.forEach((notification: INotification) => {
          if (notification.type === "contract_unlocked") {
            toast.success(
              `New contract unlocked: ${notification.data.contract_name}`,
              {
                autoClose: 5000,
                hideProgressBar: false,
              }
            );
          }
        });

        queryClient.invalidateQueries({ queryKey: userKeys.contracts() });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [fetchNotifications, queryClient]);

  return (
    <NotificationContext.Provider value={{ checkNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
