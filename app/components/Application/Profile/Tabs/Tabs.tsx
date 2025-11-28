"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const profileLinks = [
  {
    id: 1,
    name: "Account",
    href: "/myfinishline/profile/account",
  },
  {
    id: 2,
    name: "Password",
    href: "/myfinishline/profile/password",
  },
  {
    id: 3,
    name: "Strava",
    href: "/myfinishline/profile/strava",
  },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 p-0.5 rounded overflow-hidden bg-foreground">
      {profileLinks.map((link) => {
        return (
          <Link
            className="flex-1 p-1 text-center relative text-background"
            key={link.id}
            href={link.href}
          >
            {pathname.includes(link.href) && (
              <motion.div
                className="absolute rounded-md w-full h-full top-0 left-0 bg-accent"
                layoutId="profile-tab-navigation"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`${
                pathname.includes(link.href) && "text-foreground"
              } relative z-10`}
            >
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Tabs;
