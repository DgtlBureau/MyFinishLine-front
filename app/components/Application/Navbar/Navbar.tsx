"use client";

import { BookCheck, Map, MoreHorizontal, Trophy, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@/app/lib/utils/sendEvent";

const navLinks = [
  {
    id: 1,
    name: "Rating",
    href: "/app/leaderboard",
    parent: "leaderboard",
    Icon: Trophy,
  },
  {
    id: 2,
    name: "Contracts",
    href: "/app/contracts",
    parent: "contracts",
    Icon: BookCheck,
  },
  {
    id: 3,
    name: "Journey",
    href: "/app/homepage",
    parent: "homepage",
    Icon: Map,
  },
  {
    id: 4,
    name: "Profile",
    href: "/app/profile/journey",
    parent: "profile",
    Icon: User,
  },
  {
    id: 5,
    name: "More",
    href: "/app/more",
    parent: "more",
    Icon: MoreHorizontal,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.href === "/") {
      return pathname === "/";
    }
    return pathname.includes(link.parent);
  };

  const handleClickLink = () => {
    const link = navLinks.find((navLink) => navLink.href === pathname);

    sendGTMEvent({
      event: "page_visit",
      page_location: link?.href,
      page_path: link?.href,
      page_title: link?.name,
    });
  };

  return (
    <motion.div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-background border-t border-navbar-border">
        <nav className="flex items-stretch max-w-4xl mx-auto py-1 px-2">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                onClick={handleClickLink}
                key={link.id}
                href={link.href}
                scroll={false}
                className="relative flex-1 flex flex-col items-center justify-center py-2 rounded-lg nav-transition group"
              >
                <AnimatePresence>
                  {active && (
                    <motion.div
                      style={{ originY: "0px" }}
                      layoutId="navbar-active-indicator"
                      className="absolute inset-0 bg-sidebar-border rounded-lg"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <link.Icon
                    className={`w-5 h-5 nav-transition ${
                      active
                        ? "text-navbar-text-active"
                        : "text-navbar-text group-hover:text-navbar-text-active"
                    }`}
                    strokeWidth={active ? 2 : 1.5}
                  />
                  <span
                    className={`text-[11px] font-medium nav-transition ${
                      active
                        ? "text-navbar-text-active"
                        : "text-navbar-text group-hover:text-navbar-text-active"
                    }`}
                  >
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="h-[env(safe-area-inset-bottom)] bg-navbar" />
    </motion.div>
  );
};

export default Navbar;
