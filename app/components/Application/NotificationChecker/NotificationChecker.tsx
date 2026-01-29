"use client";

import { useEffect, useRef } from "react";
import { useNotifications } from "@/app/contexts/NotificationContext";

const NotificationChecker = () => {
  const { checkNotifications } = useNotifications();
  const hasCheckedOnMount = useRef(false);

  useEffect(() => {
    if (!hasCheckedOnMount.current) {
      hasCheckedOnMount.current = true;
      checkNotifications();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkNotifications();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkNotifications]);

  return null;
};

export default NotificationChecker;
