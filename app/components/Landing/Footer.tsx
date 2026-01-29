const logoImg = "/images/mfl-logo-new.png";

const navigationLinks = [
  { name: "About Us", href: "#about" },
  { name: "FAQ", href: "#faq" },
  { name: "Support", href: "#" },
  { name: "Blog", href: "#blog" },
  { name: "Career with us", href: "#" },
];

const resourceLinks = [
  { name: "Terms of Service", href: "https://dev.myfinishline.io/terms-of-service" },
  { name: "Privacy Policy", href: "https://dev.myfinishline.io/privacy" },
  { name: "Refund Policy", href: "https://dev.myfinishline.io/refund-policy" },
];

const socialLinks = [
  { name: "Follow on Instagram", href: "#" },
  { name: "Follow on Facebook", href: "#" },
  { name: "Follow on TikTok", href: "#" },
  { name: "Follow on X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-12 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-24">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Navigation Column */}
            <div className="flex flex-col">
              <div className="pb-3 md:pb-4">
                <h4 className="font-bold text-sm md:text-base text-[#09090b] leading-5 md:leading-6">Navigation</h4>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-[#71717a] leading-5 md:leading-6 hover:text-black transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col">
              <div className="pb-3 md:pb-4">
                <h4 className="font-bold text-sm md:text-base text-[#09090b] leading-5 md:leading-6">Resources</h4>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {resourceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-[#71717a] leading-5 md:leading-6 hover:text-black transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Logo and Social Column */}
            <div className="flex flex-col col-span-2 md:col-span-1 mt-4 md:mt-0">
              {/* Logo */}
              <div className="pb-3 md:pb-4 h-8 md:h-10">
                <img
                  src={logoImg}
                  alt="MyFinishLine"
                  className="h-6 md:h-8 w-auto"
                />
              </div>
              {/* Social Links */}
              <div className="flex flex-col gap-3 md:gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-[#71717a] leading-5 md:leading-6 hover:text-black transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section with Divider and Copyright */}
          <div className="flex flex-col items-center border-t border-[#e4e4e7] pt-6 md:pt-8">
            <p className="font-medium text-xs md:text-sm text-[#71717a] leading-4 md:leading-5 text-center">
              © 2026 MyFinishLine. All rights reserved.
            </p>
            <p className="font-medium text-xs md:text-sm text-[#71717a] leading-4 md:leading-5 text-center">
              MyFinishLine is a project operated by Fortem Group Limited
            </p>
            <p className="font-medium text-xs md:text-sm text-[#71717a] leading-4 md:leading-5 text-center px-4">
              (Company No. 78664854, Registered Address: Wong King IND Building, 2-4, Tai Yau st., San Po Kong Hong Kong).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
