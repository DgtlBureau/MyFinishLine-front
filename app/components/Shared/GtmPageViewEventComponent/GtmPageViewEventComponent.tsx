"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

const GtmPageViewEventComponent = ({
  location,
  title,
}: {
  location: string;
  title: string;
}) => {
  const pathname = usePathname();

  sendGTMEvent({
    event: "page_view",
    page_location: location,
    page_path: pathname,
    page_title: title,
  });

  return <></>;
};

export default GtmPageViewEventComponent;
