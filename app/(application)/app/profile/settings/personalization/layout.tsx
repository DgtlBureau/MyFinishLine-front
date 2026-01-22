"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import PageContainer from "@/app/components/Application/PageContainer/PageContainer";

const links = [
  {
    id: 1,
    name: "Frames",
    href: "/app/profile/settings/personalization/frames",
  },
  {
    id: 2,
    name: "Banners",
    href: "/app/profile/settings/personalization/banners",
  },
  {
    id: 3,
    name: "Skins",
    href: "/app/profile/settings/personalization/skins",
  },
];

const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <PageContainer
      title="Personalization"
      description="Edit how you and other users will see your profile."
    >
      <div className="px-4">
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
                    pathname.includes(link.href) &&
                    "font-semibold transition-all"
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
    </PageContainer>
  );
};

export default page;
