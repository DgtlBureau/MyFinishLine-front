"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { cn } from "@/app/lib/utils";
import Logo from "../Logo/Logo";
import { fetchChallengesList } from "@/app/lib/utils/challengesCache";

interface NavLinks {
  label: string;
  href: string;
  isChallenge?: boolean;
  subitems?: any[];
}

// Static nav links for Footer and SSR (without dynamic challenge link)
export const NAV_LINKS: NavLinks[] = [
  {
    label: "Amazonia Route",
    href: "/#challenges",
    isChallenge: true,
  },
  { label: "Challenges", href: "/#challenges" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

// Dynamic nav links with real challenge ID
const getNavLinks = (firstChallengeId?: string): NavLinks[] => [
  {
    label: "Amazonia Route",
    href: firstChallengeId ? `/challenges/${firstChallengeId}` : "/#challenges",
    isChallenge: true,
  },
  { label: "Challenges", href: "/#challenges" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const ACTION_BUTTONS = [
  { label: "Sign in", href: "/login", variant: "ghost" as const, className: "text-white/80 hover:text-white hover:bg-white/10" },
  { label: "Get started", href: "/signup", variant: "default" as const, className: "bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white border-0 hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90" },
];
const Navbar = ({
  initialBannerVisible = true,
}: {
  initialBannerVisible?: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAtLeast } = useMediaQuery();
  const pathname = usePathname();
  const [isBannerVisible, setIsBannerVisible] = useState(initialBannerVisible);
  const [firstChallengeId, setFirstChallengeId] = useState<string | undefined>();
  const hideNavbar = ["/login", "/signup", "/not-found", "/verify"].some(
    (route) => pathname.includes(route),
  );

  const dynamicNavLinks = getNavLinks(firstChallengeId);

  useEffect(() => {
    fetchChallengesList().then((data) => {
      if (data.length > 0) {
        const active = data.find((c: any) => c.status?.type === "active");
        if (active) setFirstChallengeId(String(active.id));
      }
    });
  }, []);

  useEffect(() => {
    const handleBannerDismiss = () => {
      setIsBannerVisible(false);
    };

    window.addEventListener("banner-dismissed", handleBannerDismiss);
    return () =>
      window.removeEventListener("banner-dismissed", handleBannerDismiss);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (hideNavbar) return null;

  return (
    <header
      className={cn(
        "isolate z-50 transition-all duration-300 ease-in-out",
        isScrolled && isAtLeast("lg")
          ? "fixed top-0 right-0 left-0 translate-y-2 px-5.5"
          : "absolute top-0 left-0 right-0",
      )}
    >
      <div
        className={cn(
          "navbar-container relative z-50 flex h-(--header-height) items-center justify-between gap-4 transition-all duration-300 ease-in-out",
          isScrolled &&
            isAtLeast("lg") &&
            "h-[calc(var(--header-height)-20px)] max-w-7xl rounded-full shadow-lg bg-white/15 backdrop-blur-xl border border-white/20",
        )}
      >
        <Logo className="h-12 lg:h-24" />

        <div className="flex items-center gap-8">
          <NavigationMenu viewport={false} className="hidden lg:block">
            <NavigationMenuList className="">
              {dynamicNavLinks.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.subitems ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "cursor-pointer [&_svg]:ms-2 [&_svg]:size-4",
                          // "after:from-chart-2 after:to-chart-3 after:absolute after:-inset-0.25 after:-z-1 after:rounded-sm after:bg-gradient-to-tr after:opacity-0 after:transition-all after:content-[''] hover:after:opacity-100",
                          pathname.startsWith(item.href) &&
                            "bg-accent font-semibold",
                        )}
                        suppressHydrationWarning
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="">
                        <ul className="grid w-65.75 gap-2">
                          {item.subitems.map((subitem) => (
                            <li key={subitem.label}>
                              <NavigationMenuLink
                                href={subitem.href}
                                className="hover:bg-accent/50 flex-row gap-3 p-3"
                              >
                                <subitem.icon className="text-foreground size-5.5" />
                                <div className="flex flex-col gap-1">
                                  <div className="text-sm font-medium tracking-normal">
                                    {subitem.label}
                                  </div>
                                  <div className="text-muted-foreground text-xs leading-snug">
                                    {subitem.description}
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        // item.isChallenge
                        //   ? 'bg-[url("/images/application/challenge-bg-1.png")] opacity-50'
                        //   : "",
                        navigationMenuTriggerStyle(),
                        "!bg-transparent text-white/80 hover:text-white hover:!bg-white/10",
                        pathname === item.href && "!bg-white/15 font-semibold text-white",
                      )}
                      suppressHydrationWarning
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            {ACTION_BUTTONS.map((button) => (
              <Button
                key={button.label}
                size="sm"
                variant={button.variant}
                className={cn("rounded-full shadow-none", button.className)}
                asChild
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:hidden lg:gap-4">
            <button
              className="text-white/80 relative flex size-8 rounded-sm border border-white/30 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 block w-4 -translate-x-1/2 -translate-y-1/2",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute block h-px w-full rounded-full bg-current transition duration-500 ease-in-out",
                    isMenuOpen ? "rotate-45" : "-translate-y-1.5",
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute block h-px w-full rounded-full bg-current transition duration-500 ease-in-out",
                    isMenuOpen ? "opacity-0" : "",
                  )}
                ></span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute block h-px w-full rounded-full bg-current transition duration-500 ease-in-out",
                    isMenuOpen ? "-rotate-45" : "translate-y-1.5",
                  )}
                ></span>
              </div>
            </button>
          </div>
        </div>
        {/*  Mobile Menu Navigation */}
        <div
          className={cn(
            "fixed inset-0 -z-10 flex flex-col tracking-normal backdrop-blur-2xl transition-all duration-500 ease-out lg:hidden",
            isBannerVisible
              ? "pt-[calc(var(--header-height)+3rem)]"
              : "pt-(--header-height)",
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0",
          )}
          style={{
            background: `linear-gradient(to bottom,
              rgba(26, 42, 74, 1) 0%,
              rgba(42, 74, 106, 1) 50%,
              rgba(26, 58, 58, 1) 100%
            )`
          }}
        >
          <div className="container">
            <NavigationMenu
              orientation="vertical"
              className="inline-block w-full max-w-none py-10"
            >
              <NavigationMenuList className="w-full flex-col items-start gap-0">
                {dynamicNavLinks.map((item) => (
                  <NavigationMenuItem key={item.label} className="w-full py-2">
                    {item.subitems ? (
                      <Accordion type="single" collapsible className="">
                        <AccordionItem value={item.label}>
                          <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-base font-normal text-white/90 hover:text-white hover:no-underline">
                            {item.label}
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            <div className="space-y-2">
                              {item.subitems.map((subitem) => (
                                <NavigationMenuLink
                                  key={subitem.label}
                                  href={subitem.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className={cn(
                                    "text-muted-foreground hover:bg-accent/50 flex flex-row gap-2 p-3 font-medium transition-colors",
                                    pathname === subitem.href &&
                                      "bg-accent font-semibold",
                                  )}
                                  suppressHydrationWarning
                                >
                                  <subitem.icon className="size-5" />
                                  <span className="">{subitem.label}</span>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "text-white/90 hover:text-white text-base transition-colors",
                          pathname === item.href && "font-semibold text-white",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                        suppressHydrationWarning
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/20 px-6 py-6">
            <Button
              variant="ghost"
              asChild
              className="h-14 text-lg flex-1 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 text-white font-semibold hover:bg-white/25 hover:text-white shadow-sm"
            >
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                Sign in
              </Link>
            </Button>
            <Button
              asChild
              className="h-14 text-lg flex-1 rounded-2xl bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white font-semibold border border-white/30 shadow-lg hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90"
            >
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
