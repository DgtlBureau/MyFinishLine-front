"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

interface ILink {
  id: number;
  name: string;
  href: string;
  icon?: React.JSX.Element;
}

interface IProfileTabsProps {
  links: ILink[];
  layoutId: string;
  activeTab?: string;
  onTabChange?: (href: string) => void;
}

const ProfileTabs = ({ links, layoutId, activeTab, onTabChange }: IProfileTabsProps) => {
  const pathname = usePathname();

  const isActive = (link: ILink) =>
    activeTab ? activeTab === link.href : pathname.includes(link.href);

  return (
    <nav className="flex items-center gap-1 p-2 overflow-hidden bg-white/40 backdrop-blur-xl backdrop-saturate-200 border border-white/50 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]">
      {links.map((link) => {
        const active = isActive(link);
        const content = (
          <>
            {active && (
              <motion.div
                className="absolute w-full h-full left-0 top-0 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-white/30"
                layoutId={layoutId}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`${
                active && "font-semibold transition-all"
              } relative z-10 text-sm leading-5 flex items-center justify-center gap-1.5`}
            >
              {link.icon} {link.name}
            </span>
          </>
        );

        if (onTabChange) {
          return (
            <button
              className="flex-1 p-1 py-3 text-sm text-center relative text-foreground"
              key={link.id}
              onClick={() => onTabChange(link.href)}
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            className="flex-1 p-1 py-3 text-sm text-center relative text-foreground"
            key={link.id}
            href={link.href}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
};

export default ProfileTabs;
