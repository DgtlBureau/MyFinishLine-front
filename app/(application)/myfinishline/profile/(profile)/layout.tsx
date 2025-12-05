import ProfileUserline from "@/app/components/Application/Profile/ProfileUserline/ProfileUserline";
import Tabs from "@/app/components/Application/Profile/Tabs/Tabs";

const profileLinks = [
  {
    id: 1,
    name: "Account",
    href: "/myfinishline/profile/account",
  },
  {
    id: 2,
    name: "Awards",
    href: "/myfinishline/profile/awards",
  },
  {
    id: 3,
    name: "Activities",
    href: "/myfinishline/profile/activities",
  },
];

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full min-h-screen h-full bg-background max-w-4xl mx-auto p-4">
      <ProfileUserline />
      <div className="mt-4">
        <Tabs links={profileLinks} layoutId="profile-tab-navigation" />
      </div>
      <div className="mt-4">{children}</div>
    </main>
  );
};

export default page;
