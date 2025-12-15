import ProfileTabs from "@/app/components/Application/Profile/ProfileTabs/ProfileTabs";
import ProfileUserline from "@/app/components/Application/Profile/ProfileUserline/ProfileUserline";
import { Activity, Award } from "lucide-react";

const profileLinks = [
  {
    id: 1,
    name: "Journey",
    href: "/app/profile/journey",
    icon: <Award width={16} height={16} />,
  },
  {
    id: 2,
    name: "Activities",
    href: "/app/profile/activities",
    icon: <Activity width={16} height={16} />,
  },
];

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full min-h-screen h-full bg-background max-w-4xl mx-auto">
      <ProfileUserline />
      <div className="mt-4 px-4">
        <ProfileTabs links={profileLinks} layoutId="profile-tab-navigation" />
      </div>
      <div className="mt-4">{children}</div>
    </main>
  );
};

export default page;
