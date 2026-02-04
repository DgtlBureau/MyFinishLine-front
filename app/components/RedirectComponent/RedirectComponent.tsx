"use client";

import ConfirmCode from "../ConfirmCode/ConfirmCode";
import { useAppSelector } from "@/app/lib/hooks";
import { useEffect, useState } from "react";

const RedirectComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't show ConfirmCode if user is not logged in (after logout)
  if (!user.id || !user.email) {
    return;
  }
  if (user.has_activated_code === true) {
    return;
  }
  if (user.has_activated_code === null) {
    return;
  }
  if (!isMounted) {
    return;
  }
  return <ConfirmCode />;
};

export default RedirectComponent;
