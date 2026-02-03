"use client";

import { useEffect, useRef } from "react";

import { logger } from "@/app/lib/logger";
export const useAppVisibility = (onVisible: () => void) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        if (isInitialMount.current) {
          isInitialMount.current = false;
          return;
        }

        logger.log("User returned to app - calling API");
        onVisible();
      } else {
        logger.log("User left the app/tab");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onVisible]);
};
