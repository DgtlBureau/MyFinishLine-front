// inside SendGTMComponent.tsx  (or wherever sendGTMEvent lives)

"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export default function SendGTMComponent() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-LYKSZRTMBX");

    sendGTMEvent({ event: "page_view" });
  }, []);

  return null;
}
