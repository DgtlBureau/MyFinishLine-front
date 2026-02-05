"use client";

import { BookCheck, Map, MoreHorizontal, Trophy, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sendGTMEvent } from "@/app/lib/utils/sendEvent";
import { useTranslation } from "@/app/contexts/LanguageContext";
const navLinksConfig = [
  {
    id: 1,
    key: "rating" as const,
    href: "/app/leaderboard",
    parent: "leaderboard",
    Icon: Trophy,
  },
  {
    id: 2,
    key: "contracts" as const,
    href: "/app/contracts",
    parent: "contracts",
    Icon: BookCheck,
  },
  {
    id: 3,
    key: "journey" as const,
    href: "/app/homepage",
    parent: "homepage",
    Icon: Map,
  },
  {
    id: 4,
    key: "profile" as const,
    href: "/app/profile",
    parent: "profile",
    Icon: User,
  },
  {
    id: 5,
    key: "more" as const,
    href: "/app/more",
    parent: "more",
    Icon: MoreHorizontal,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navLinks = navLinksConfig.map((link) => ({
    ...link,
    name: t.nav[link.key],
  }));

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
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-3xl backdrop-saturate-200 border-t border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
        <nav className="flex items-end max-w-4xl mx-auto py-2 px-3">
          {navLinks.map((link) => {
            const active = isActive(link);
            const isCenter = link.id === 3;

            if (isCenter) {
              return (
                <Link
                  onClick={handleClickLink}
                  key={link.id}
                  href={link.href}
                  scroll={false}
                  className="relative flex-1 flex flex-col items-center justify-center -mt-5 group"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: 1,
                      background: active
                        ? "linear-gradient(to bottom right, #3B5CC6, #4DA67A)"
                        : "linear-gradient(to bottom right, #374151, #111827)",
                    }}
                    whileHover={{
                      scale: 1.08,
                      background: "linear-gradient(to bottom right, #3B5CC6, #4DA67A)",
                      boxShadow: "0 10px 40px -10px rgba(139, 92, 246, 0.5)",
                    }}
                    whileTap={{ scale: 0.92 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      mass: 0.8,
                    }}
                    className={`p-4 rounded-full shadow-lg ${
                      active ? "shadow-emerald-500/30" : "shadow-gray-400/30"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: active ? 0 : 0 }}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <link.Icon
                        className="w-8 h-8 text-white"
                        strokeWidth={2}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.span
                    animate={{
                      color: active ? "#7B9AE8" : "#9ca3af",
                    }}
                    whileHover={{ color: "#7B9AE8" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-1 text-[10px] font-semibold tracking-wide"
                  >
                    {link.name}
                  </motion.span>
                </Link>
              );
            }

            return (
              <motion.div
                key={link.id}
                className="relative flex-1"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <Link
                  onClick={handleClickLink}
                  href={link.href}
                  scroll={false}
                  className="relative flex flex-col items-center justify-center py-2 rounded-2xl"
                >
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        style={{ originY: "0px" }}
                        layoutId="navbar-active-indicator"
                        className="absolute inset-1 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <motion.div
                      variants={{
                        rest: {
                          scale: 1,
                          backgroundColor: active
                            ? "rgba(0, 0, 0, 0)"
                            : "rgba(0, 0, 0, 0)",
                        },
                        hover: {
                          scale: 1.1,
                          backgroundColor: active
                            ? "rgba(0, 0, 0, 0)"
                            : "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className={`p-1.5 rounded-xl ${
                        active
                          ? "bg-gradient-to-br from-blue-500 to-emerald-600 shadow-md shadow-emerald-500/30"
                          : ""
                      }`}
                    >
                      <motion.div
                        variants={{
                          rest: { y: 0 },
                          hover: { y: -2 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <link.Icon
                          className={`w-6 h-6 transition-colors duration-300 ${
                            active ? "text-white" : "text-gray-500"
                          }`}
                          strokeWidth={active ? 2.5 : 1.5}
                        />
                      </motion.div>
                    </motion.div>
                    <motion.span
                      variants={{
                        rest: {
                          color: active ? "#7B9AE8" : "#9ca3af",
                        },
                        hover: {
                          color: active ? "#7B9AE8" : "#4b5563",
                        },
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-[10px] font-semibold tracking-wide"
                    >
                      {link.name}
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <div className="h-[env(safe-area-inset-bottom)] bg-white/5 backdrop-blur-3xl" />
    </div>
  );
};

export default Navbar;
