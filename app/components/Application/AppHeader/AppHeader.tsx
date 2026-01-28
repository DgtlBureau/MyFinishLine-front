"use client";

import { ChevronLeft, Settings } from "lucide-react";
import Image from "next/image";
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-white/40 to-white/30 backdrop-blur-3xl backdrop-saturate-200 border-b border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {isCurrentLinkNested ? (
          <button
            onClick={handleGoBack}
            className="flex flex-1 gap-1 font-medium py-4 cursor-pointer text-gray-800"
          >
            <ChevronLeft />
          </button>
        ) : (
          <div className="h-14" />
        )}
        {/* {currentLink?.title && (
          <p className="text-white text-xl font-semibold text-center flex-1">
            {currentLink.title}
          </p>
        )} */}
        <Image
          className="max-h-5 w-fit "
          src="/images/logo-line.png"
          width={957}
          height={489}
          alt="Logo"
        />
        <button
          className="flex flex-1 items-center justify-end gap-2"
          onClick={handleGoToEdit}
        >
          <Settings color="#374151" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
