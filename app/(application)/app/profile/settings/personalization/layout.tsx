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
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 flex items-center gap-1 overflow-hidden bg-white/40 backdrop-blur-xl backdrop-saturate-200 rounded-2xl border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] p-1"
        >
          {links.map((link) => {
            const isActive = pathname.includes(link.href);
            return (
              <Link
                className="flex-1 p-2 py-2.5 text-sm text-center relative text-[#1a1a2e] rounded-xl"
                key={link.id}
                href={link.href}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/60 rounded-xl shadow-sm"
                    layoutId="personalization"
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                  />
                )}
                <span
                  className={`${
                    isActive ? "font-semibold" : "font-medium text-[#1a1a2e]/70"
                  } relative z-10 text-sm leading-5 flex items-center justify-center gap-1.5 transition-all`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </motion.nav>
        {children}
      </div>
    </PageContainer>
  );
};

export default page;
