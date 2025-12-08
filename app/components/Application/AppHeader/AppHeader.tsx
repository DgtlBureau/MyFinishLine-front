"use client";

import { ChevronLeft, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const rootLayouts = [
  "/myfinishline",
  "/myfinishline/homepage",
  "/myfinishline/store/booster",
  "/myfinishline/store/my-challenges",
  "/myfinishline/store/contracts",
  "/myfinishline/stats",
  "/myfinishline/more",
  "/myfinishline/profile/account",
  "/myfinishline/profile/awards",
  "/myfinishline/profile/activities",
];

const links = [
  {
    id: 1,
    link: "/contracts",
  },
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
];

const AppHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToEdit = () => {
    router.push("/myfinishline/settings");
  };

  const currentLink = links.find((link) => pathname?.includes(link.link));
  const isCurrentLinkNested = !!currentLink;

  return (
    <header className="sticky top-0 z-40 bg-foreground">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {isCurrentLinkNested ? (
          <button
            onClick={handleGoBack}
            className="flex gap-1 font-medium py-4 cursor-pointer text-background"
          >
            <ChevronLeft />
            Back
          </button>
        ) : (
          <div className="h-14" />
        )}
        <button className="flex items-center gap-2" onClick={handleGoToEdit}>
          <Settings color="white" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
