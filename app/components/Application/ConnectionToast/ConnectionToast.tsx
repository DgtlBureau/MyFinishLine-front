"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ConnectionToast = () => {
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.has_strava_connect) {
      toast.error("Connect your Strava or FitBit account", {
        autoClose: false,
        draggable: false,
      });
    } else {
      toast.dismiss();
    }
  }, [user.has_strava_connect]);

  return <></>;
};

export default ConnectionToast;
