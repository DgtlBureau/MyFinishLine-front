"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";

const links = [
  {
    id: 1,
    name: "All",
    href: "/app/contracts/all",
  },
  {
    id: 2,
    name: "Achieved",
    href: "/app/contracts/achieved",
  },
  {
    id: 3,
    name: "Still to get",
    href: "/app/contracts/still-to-get",
  },
];

const page = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="pt-14 p-4 max-w-4xl mx-auto">
      <h2 className="mt-2 font-medium text-3xl leading-9 text-[#09090B]">
        Contracts
      </h2>

      <nav className="mt-2 flex items-center gap-1 overflow-hidden border-b">
        {links.map((link) => {
          return (
            <Link
              className="flex-1 p-1 py-2 text-sm text-center relative text-foreground"
              key={link.id}
              href={link.href}
            >
              {pathname.includes(link.href) && (
                <motion.div
                  className="absolute w-full h-0.5 left-0 bottom-0 bg-black rounded-lg shadow-sm"
                  layoutId="personalization"
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                  }}
                />
              )}
              <span
                className={`${
                  pathname.includes(link.href) && "font-semibold transition-all"
                } relative z-10 text-sm leading-5 flex items-center justify-center gap-1.5`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
};

export default page;
