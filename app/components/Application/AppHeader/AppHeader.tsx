"use client";

import { ChevronLeft, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    id: 2,
    link: "/settings",
  },
  {
    id: 3,
    link: "/faq",
  },
  {
    id: 4,
    link: "/contact-us",
  },
  {
    id: 5,
    link: "/integrations",
  },
  {
    id: 5,
    link: "/settings",
  },
  {
    id: 6,
    link: "/leaderboard",
    title: "Leaderboard",
  },
  {
    id: 7,
    link: "/more",
    title: "More",
  },
  {
    id: 8,
    link: "/contracts",
    title: "Contracts",
  },
  {
    id: 9,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 10,
    link: "/profile/activities",
    title: "Activities",
  },
  {
    id: 11,
    link: "/profile/redeem",
    title: "Claim medal",
  },
  {
    id: 12,
    link: "/app/activities/new",
    title: "Add Activity",
  },
];

const AppHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToEdit = () => {
    router.push("/app/profile/settings");
  };

  const currentLink = links.find((link) => pathname?.includes(link.link));
  const isCurrentLinkNested = !!currentLink;

  if (pathname.includes("/homepage")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/15 backdrop-blur-2xl border-b border-white/30 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4">
        {isCurrentLinkNested ? (
          <button
            onClick={handleGoBack}
            className="flex flex-1 gap-1 font-medium py-4 cursor-pointer text-white"
          >
            <ChevronLeft />
          </button>
        ) : (
          <div className="h-14" />
        )}
        <button
          className="flex flex-1 items-center justify-end gap-2"
          onClick={handleGoToEdit}
        >
          <Settings color="white" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
