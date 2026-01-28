"use client";

import ProfileTabs from "@/app/components/Application/Profile/ProfileTabs/ProfileTabs";
import ProfileUserline from "@/app/components/Application/Profile/ProfileUserline/ProfileUserline";
import {
  setUser,
  setUserCompletedContracts,
  setUserContracts,
} from "@/app/lib/features/user/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import {
  getCurrentUser,
  getUserCompletedContracts,
  getUserContracts,
} from "@/app/lib/utils/userService";
import { Activity, Award } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "@/app/lib/i18n";

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const profileLinks = [
    {
      id: 1,
      name: t("profile.journey"),
      href: "/app/profile/journey",
      icon: <Award width={16} height={16} />,
    },
    {
      id: 2,
      name: t("profile.activities"),
      href: "/app/profile/activities",
      icon: <Activity width={16} height={16} />,
    },
  ];

  const handleLoadUser = async () => {
    try {
      const data = await getCurrentUser();
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadCompletedContracts = async () => {
    try {
      const data = await getUserCompletedContracts();

      if (data.data?.length) {
        dispatch(setUserCompletedContracts(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadContracts = async () => {
    try {
      const data = await getUserContracts();
      dispatch(setUserContracts(data.data));
    } catch (error: any) {
      toast.error("Error loading contracts: " + error.response.data.message);
    }
  };

  useEffect(() => {
    handleLoadUser();
    handleLoadCompletedContracts();
    handleLoadContracts();
  }, []);

  return (
    <main className="pt-14 mx-auto">
      <ProfileUserline />
      <div className="mt-4 px-4 max-w-4xl mx-auto">
        <ProfileTabs links={profileLinks} layoutId="profile-tab-navigation" />
      </div>
      <div className="mt-4">{children}</div>
    </main>
  );
};

export default page;
