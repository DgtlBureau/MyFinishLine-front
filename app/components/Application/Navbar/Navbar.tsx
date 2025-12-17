"use client";

import { Map, MoreHorizontal, Store, Trophy, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    id: 1,
    name: "Rating",
    href: "/app/stats",
    parent: "stats",
    Icon: Trophy,
  },
  {
    id: 2,
    name: "Store",
    href: "/app/store",
    parent: "store",
    Icon: Store,
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-background border-t border-navbar-border">
        <nav className="flex items-stretch max-w-4xl mx-auto py-1 px-2">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.id}
                href={link.href}
                className="relative flex-1 flex flex-col items-center justify-center py-2 rounded-lg nav-transition group"
              >
                <AnimatePresence>
                  {active && (
                    <motion.div
                      className="absolute inset-0 bg-sidebar-border rounded-lg"
                      layoutId="navbar-active-indicator"
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
    </div>
  );
};

export default Navbar;
