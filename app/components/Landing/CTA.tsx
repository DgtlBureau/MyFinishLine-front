import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

// Card images - use local files
const imgCard1 = "/images/amazonia-quest-new.png";
const imgAmazoniaLogo = "/images/amazonia-logo.png";
const imgComingSoon = "/images/cta-coming-soon.png";

export default function CTA() {
  return (
    <section
      id="level-up"
      className="flex flex-col items-center py-12 md:py-24 w-full"
      style={{
        background: "linear-gradient(to bottom, white 18%, #b4c6ff 74%, white 100%)",
      }}
    >
      <div className="max-w-[1280px] px-4 md:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col gap-8 md:gap-12 items-center">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-[48px] tracking-[-1px] md:tracking-[-1.92px] text-black leading-tight md:leading-none text-center">
            Level Up Your
            <br />
            Sports Experience
          </h2>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
            {/* Card 1 - Amazonia Route (Active) */}
            <div className="relative w-full md:flex-1 h-[350px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Background Image - NO BLUR */}
              <img
                src={imgCard1}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark gradient overlay for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
                }}
              />

              {/* Amazonia Logo */}
              <div className="absolute top-4 md:top-6 right-4 md:right-6 w-[100px] md:w-[150px]">
                <img
                  src={imgAmazoniaLogo}
                  alt="Amazonia Route"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-4 md:left-6 right-4 md:right-6 pb-4 md:pb-6">
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg md:text-2xl text-white leading-6 md:leading-8">Amazonia Route</h3>
                      <div className="flex items-center gap-1 md:gap-1.5">
                        <span className="text-xs md:text-sm text-white/80 leading-5 md:leading-6">120 km</span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-white/80 leading-5 md:leading-6 max-w-[260px]">
                      We&apos;ve traveled around South America to find some treasures!
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/challenges/amazonia-route">
                      <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-[#fafafa] bg-[#18181b] rounded-md hover:bg-[#27272a] transition-colors">
                        Choose a Quest
                        <ArrowRight size={14} className="md:w-4 md:h-4" />
                      </button>
                    </Link>
                    <span className="font-semibold text-xl md:text-2xl text-white tracking-[-0.96px]">$40</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Coming Soon */}
            <div className="relative w-full md:flex-1 h-[200px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Background Image with Blur */}
              <img
                src={imgComingSoon}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
              />

              {/* Light overlay for Coming Soon effect */}
              <div className="absolute inset-0 bg-white/30" />

              {/* Coming Soon Badge */}
              <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-[#f4f4f5] rounded-lg px-2 py-0.5 flex items-center gap-1.5 h-[22px]">
                <Clock size={16} className="text-[#18181b]" />
                <span className="text-xs font-medium text-[#09090b] leading-5">Coming Soon</span>
              </div>
            </div>

            {/* Card 3 - Coming Soon */}
            <div className="relative w-full md:flex-1 h-[200px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Background Image with Blur */}
              <img
                src={imgComingSoon}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
              />

              {/* Light overlay for Coming Soon effect */}
              <div className="absolute inset-0 bg-white/30" />

              {/* Coming Soon Badge */}
              <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-[#f4f4f5] rounded-lg px-2 py-0.5 flex items-center gap-1.5 h-[22px]">
                <Clock size={16} className="text-[#18181b]" />
                <span className="text-xs font-medium text-[#09090b] leading-5">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
