const logoImg = "/images/mfl-logo-new.svg";

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
    <footer className="py-12 md:py-24 border-t border-white/15">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-24">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Navigation Column */}
            <div className="flex flex-col">
              <div className="pb-3 md:pb-4">
                <h4 className="font-bold text-sm md:text-base text-white leading-5 md:leading-6">Navigation</h4>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-white/50 leading-5 md:leading-6 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col">
              <div className="pb-3 md:pb-4">
                <h4 className="font-bold text-sm md:text-base text-white leading-5 md:leading-6">Resources</h4>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {resourceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-white/50 leading-5 md:leading-6 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Column */}
            <div className="flex flex-col col-span-2 md:col-span-1 mt-4 md:mt-0">
              <div className="pb-3 md:pb-4">
                <h4 className="font-bold text-sm md:text-base text-white leading-5 md:leading-6">Social</h4>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-sm md:text-base text-white/50 leading-5 md:leading-6 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section with Divider and Copyright */}
          <div className="flex flex-col items-center border-t border-white/15 pt-6 md:pt-8 gap-4">
            <img
              src={logoImg}
              alt="MyFinishLine"
              className="h-12 md:h-16 w-auto"
            />
            <p className="font-medium text-xs md:text-sm text-white/50 leading-4 md:leading-5 text-center">
              © 2026 MyFinishLine. All rights reserved.
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
}
