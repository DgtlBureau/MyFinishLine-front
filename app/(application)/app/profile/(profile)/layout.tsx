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
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Journey } from "./journey/page";
import { ActivitiesTab } from "./activities/page";
import ChallengeCardSkeleton from "@/app/components/Skeletons/ChallengeCardSkeleton";
import RewardsSwiperSkeleton from "@/app/components/Skeletons/RewardsSwiperSkeleton";
import ConnectButtonsSkeleton from "@/app/components/Skeletons/ConnectButtonsSkeleton";

const JOURNEY_TAB = "journey";
const ACTIVITIES_TAB = "activities";

const profileLinks = [
  {
    id: 1,
    name: "Journey",
    href: JOURNEY_TAB,
    icon: <Award width={16} height={16} />,
  },
  {
    id: 2,
    name: "Activities",
    href: ACTIVITIES_TAB,
    icon: <Activity width={16} height={16} />,
  },
];

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(JOURNEY_TAB);
  const activitiesMounted = useRef(false);

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === ACTIVITIES_TAB) {
      activitiesMounted.current = true;
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(to bottom,
        #1a2a4a 0%,
        #1e2f4e 8%,
        #213352 15%,
        #243856 22%,
        #273c5a 28%,
        #2a405e 34%,
        #2a4a6a 40%,
        #284a64 46%,
        #264a5e 52%,
        #244a58 58%,
        #224a52 64%,
        #204a4c 70%,
        #1e4446 76%,
        #1c4040 82%,
        #1a3c3c 88%,
        #1a3a3a 100%
      )`
    }}>
      <main className="pt-14 mx-auto">
        <ProfileUserline />
        <div className="mt-4 px-4 max-w-4xl mx-auto">
          <ProfileTabs
            links={profileLinks}
            layoutId="profile-tab-navigation"
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        <div className="mt-4">
          <div style={{ display: activeTab === JOURNEY_TAB ? "block" : "none" }}>
            <Suspense
              fallback={
                <section>
                  <div className="max-w-4xl mx-auto">
                    <div className="mt-10 h-9 w-40 mx-auto rounded bg-white/15 animate-pulse" />
                    <div className="my-8 px-4">
                      <ChallengeCardSkeleton />
                    </div>
                  </div>
                  <RewardsSwiperSkeleton />
                  <ConnectButtonsSkeleton />
                </section>
              }
            >
              <Journey />
            </Suspense>
          </div>
          <div style={{ display: activeTab === ACTIVITIES_TAB ? "block" : "none" }}>
            {(activeTab === ACTIVITIES_TAB || activitiesMounted.current) && (
              <ActivitiesTab />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
