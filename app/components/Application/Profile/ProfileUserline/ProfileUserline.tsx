"use client";

import useGetStravaUser from "@/app/hooks/useGetStravaUser";
import { Camera } from "lucide-react";
import Image from "next/image";

const ProfileUserline = () => {
  const { athlete } = useGetStravaUser();

  return (
    <section className="flex justify-between">
      <div className="flex items-center gap-4">
        {athlete?.profile ? (
          <Image
            className="rounded-full"
            src={athlete.profile}
            width={80}
            height={80}
            quality={75}
            loading="eager"
            alt="Profile image"
          />
        ) : (
          <div className="border-border shrink-0 border-2 rounded-full w-20 h-20 flex items-center justify-center shadow-inner shadow-accent">
            <Camera />
          </div>
        )}
        <div>
          <span className="font-medium">
            {athlete.firstname} {athlete.lastname}
          </span>
          <span className="block font-medium text-muted-foreground text-sm">
            {athlete.state}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileUserline;
