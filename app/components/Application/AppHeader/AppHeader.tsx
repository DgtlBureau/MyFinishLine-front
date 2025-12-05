"use client";

import useGetStravaUser from "@/app/hooks/useGetStravaUser";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Avatar from "../../Shared/Avatar/Avatar";

const AppHeader = () => {
  const router = useRouter();
  const { athlete, isConnected } = useGetStravaUser();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToEdit = () => {
    router.push("/myfinishline/settings");
  };

  return (
    <header className="border-b border-border sticky top-0 z-40 bg-background">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        <button
          onClick={handleGoBack}
          className="flex gap-1 font-medium py-4 cursor-pointer"
        >
          <ChevronLeft />
          Back
        </button>
        {/* {isConnected && ( */}
        <button onClick={handleGoToEdit}>
          <Avatar size={36} imageSrc={athlete.profile} fullName={"NA"} />
        </button>
        {/* )} */}
      </div>
    </header>
  );
};

export default AppHeader;
