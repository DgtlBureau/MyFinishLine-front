"use client";

import { ChartBar, Home, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LiquidGlass } from "@liquidglass/react";

const navLinks = [
  {
    id: 1,
    name: "Homepage",
    href: "/myfinishline/homepage",
    parent: "homepage",
    Icon: Home,
  },
  {
    id: 2,
    name: "Challenges",
    href: "/myfinishline/challenges",
    parent: "challenges",
    Icon: Trophy,
  },
  {
    id: 3,
    name: "Statistics",
    href: "/myfinishline/stats",
    parent: "stats",
    Icon: ChartBar,
  },
  {
    id: 4,
    name: "Profile",
    href: "/myfinishline/profile/account",
    parent: "profile",
    Icon: User,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-accent p-1 fixed bottom-0 w-full bg-[url(/images/gradient.webp)] bg-cover bg-center bg-no-repeat dark:bg-[url(/images/gradient-dark.webp)]">
      <nav className="flex gap-2 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="p-2 flex-1 flex-[1 1 0px] basis-0 shrink-0 rounded relative"
          >
            {pathname.includes(link.parent) && (
              <motion.div
                className="absolute rounded w-full h-full top-0 left-0"
                layoutId="active-tab-navigation"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                }}
              >
                <LiquidGlass
                  borderRadius={10}
                  blur={0.1}
                  contrast={1.2}
                  brightness={1.1}
                  saturation={1.2}
                ></LiquidGlass>
              </motion.div>
            )}
            <div className="relative z-10 w-fit h-full mx-auto">
              <link.Icon className="mx-auto" />
              <span className="">{link.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
