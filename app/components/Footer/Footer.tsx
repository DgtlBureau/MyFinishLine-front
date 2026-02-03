"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../ChallengeContent/Navbar/Navbar";

const logoImg = "/images/mfl-logo-new.svg";

const FOOTER_SECTIONS = [
  {
    title: "Navigation",
    links: NAV_LINKS.flatMap((link) => [{ name: link.label, href: link.href }]),
  },
  {
    title: "Resources",
    links: [
      { name: "Terms & Conditions", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "Follow on Instagram", href: "#" },
  { name: "Follow on Facebook", href: "#" },
  { name: "Follow on TikTok", href: "#" },
  { name: "Follow on X", href: "https://x.com" },
];

const Footer = () => {
  const pathname = usePathname();

  const hideFooter = ["/loginadasd", "/signup", "/verify", "/not-found"].some(
    (route) => pathname.includes(route)
  );

  if (hideFooter) return null;

  return (
    <footer className="py-12 md:py-24 border-t border-white/15">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-24">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Navigation & Resources Columns */}
            {FOOTER_SECTIONS.map((section, index) => (
              <div key={index} className="flex flex-col">
                <div className="pb-3 md:pb-4">
                  <h4 className="font-bold text-sm md:text-base text-white leading-5 md:leading-6">
                    {section.title}
                  </h4>
                </div>
                <div className="flex flex-col gap-3 md:gap-4">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="font-medium text-sm md:text-base text-white/50 leading-5 md:leading-6 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Logo and Social Column */}
            <div className="flex flex-col col-span-2 md:col-span-1 mt-4 md:mt-0">
              <div className="pb-3 md:pb-4 h-8 md:h-10">
                <img
                  src={logoImg}
                  alt="MyFinishLine"
                  className="h-6 md:h-8 w-auto"
                />
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-white/50 leading-5 md:leading-6 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center border-t border-white/15 pt-6 md:pt-8">
            <p className="font-medium text-xs md:text-sm text-white/50 leading-4 md:leading-5 text-center">
              © {new Date().getFullYear()} MyFinishLine. All rights reserved.
            </p>
            <p className="font-medium text-xs md:text-sm text-white/50 leading-4 md:leading-5 text-center">
              MyFinishLine is a project operated by Fortem Group Limited
            </p>
            <p className="font-medium text-xs md:text-sm text-white/50 leading-4 md:leading-5 text-center px-4">
              (Company No. 78664854, Registered Address: Wong King IND Building, 2-4, Tai Yau st., San Po Kong Hong Kong).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
