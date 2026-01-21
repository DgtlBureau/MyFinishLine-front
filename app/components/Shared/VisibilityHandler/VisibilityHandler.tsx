// components/VisibilityHandler.tsx
"use client";

import axios from "axios";
import { useEffect, useRef } from "react";

export default function VisibilityHandler() {
  const isInitialMount = useRef(true);

  useEffect(() => {
    const STORAGE_KEY = "last_init_call_date";

    const canCallToday = (): boolean => {
      if (typeof window === "undefined") return false;

      try {
        const lastCallDate = localStorage.getItem(STORAGE_KEY);

        if (!lastCallDate) {
          return true;
        }

        const lastDate = new Date(lastCallDate);
        const today = new Date();

        return (
          lastDate.getFullYear() !== today.getFullYear() ||
          lastDate.getMonth() !== today.getMonth() ||
          lastDate.getDate() !== today.getDate()
        );
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        return true;
      }
    };

    const updateLastCallDate = (): void => {
      if (typeof window === "undefined") return;

      try {
        const now = new Date();
        localStorage.setItem(STORAGE_KEY, now.toISOString());
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    };

    const sendInitRequest = async () => {
      try {
        console.log("User returned to tab - checking daily limit...");

        if (!canCallToday()) {
          console.log("Already called /user/set-init today, skipping...");
          return;
        }

        console.log("Calling /user/set-init...");

        const { data } = await axios.post("/api/user/update-activity");

        console.log("Init successful:", data);

        updateLastCallDate();
      } catch (error) {
        console.error("Failed to send init request:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (isInitialMount.current) {
          isInitialMount.current = false;
          return;
        }

        sendInitRequest();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
