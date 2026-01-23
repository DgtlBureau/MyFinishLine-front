"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/app/lib/utils";
import { Marquee } from "../../magicui/marquee";
import Noise from "../../Shared/Noise/noise";
import content from "@/app/lib/content/landing/content";

export default function Logos() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter out companies with dark:hidden when theme is dark
  // Only apply theme-based filtering after component is mounted to prevent hydration mismatch
  const visibleCompanies = content.logos.filter((company) => {
    if (mounted && company.className.includes("dark:hidden")) {
      return false;
    }
    return true;
  });

  return (
    <section className="section-padding relative">
      <Noise />
      <p className="container text-center text-base">
        {content.hero.description}
      </p>

      <div>
        <Marquee
          pauseOnHover
          className="mt-8 mask-r-from-60% mask-r-to-100% mask-l-from-60% mask-l-to-100% [--duration:20s] [--gap:4rem]"
        >
          {visibleCompanies.map((company) => (
            <Link
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-8 flex items-center justify-center w-24 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className={cn("object-contain m-auto", company.className)}
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
