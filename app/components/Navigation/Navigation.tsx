"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/homepage", label: "Homepage", icon: "/icons/home.svg" },
  { href: "/dashboard", label: "Dashboard", icon: "/icons/dashboard.svg" },
  { href: "/challenges", label: "Challenges", icon: "/icons/challenges.svg" },
  { href: "/news", label: "News", icon: "/icons/news.svg" },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <section className="bg-white w-full py-2">
      <nav className="flex items-center gap-2 w-fit mx-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href ? "font-bold bg-blue-400" : ""
            } p-2 rounded-xl`}
          >
            <Image
              className="mx-auto"
              src={link.icon}
              width={24}
              height={24}
              alt={`${link.label} icon`}
            />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default Navigation;
