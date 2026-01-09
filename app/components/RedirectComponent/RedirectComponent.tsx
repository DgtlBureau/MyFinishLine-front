"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const RedirectComponent = () => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.id && user.has_activated_code === false) {
      router.replace("/confirm-challenge");
    }
  }, [user, router]);
  return null;
};

export default RedirectComponent;
