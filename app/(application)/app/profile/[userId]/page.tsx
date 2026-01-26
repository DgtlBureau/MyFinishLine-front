"use client";

import { ProfileById } from "@/app/components/Application/Profile/ProfileById/ProfileById";
import Loader from "@/app/components/Shared/Loader/Loader";
import { setUserProfile } from "@/app/lib/features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { sendGTMEvent } from "@next/third-parties/google";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const pathname = usePathname();
  const router = useRouter();
  const userId = pathname.split("/").pop();
  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  sendGTMEvent({
    event: "profile_visit",
    visitor_id: user.id,
    profile_user_id: userId,
  });

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get("/api/profile/user", {
        params: { userId: userId },
      });
      dispatch(setUserProfile(data));
      setIsLoad(true);
    } catch (error: any) {
      setIsLoad(false);
      router.replace("/");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [userId]);

  return (
    <div className="mt-14 flex items-center justify-center w-full">
      {isLoad ? (
        <ProfileById userId={userId} />
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
}
