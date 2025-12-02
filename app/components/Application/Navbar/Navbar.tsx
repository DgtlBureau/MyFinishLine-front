"use client";

import { ChartBar, Store, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "/myfinishline/homepage",
    parent: "homepage",
    Icon: Trophy,
  },
  {
    id: 2,
    name: "Store",
    href: "/myfinishline/store",
    parent: "store",
    Icon: Store,
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
    <div className="p-1 fixed bottom-0 w-full bg-foreground">
      <nav className="flex gap-2 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="p-2 flex-1 flex-[1 1 0px] basis-0 shrink-0 rounded relative text-background"
          >
            {pathname.includes(link.parent) && (
              <motion.div
                className="absolute rounded w-full h-full top-0 left-0 border border-background/50"
                layoutId="active-tab-navigation"
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                }}
              ></motion.div>
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
