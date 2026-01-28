import { ArrowRight } from "lucide-react";

// High quality background image with cache bust
const imgRectangle = "/images/amazonia-quest-new.png?v=2";
// Amazonia Route logo
const imgAmazoniaLogo = "/images/amazonia-logo.png?v=2";
const imgRouting = "/images/routing-icon.svg";

export default function QuestSelection() {
  return (
    <section
      className="flex flex-col items-center py-12 md:py-24 w-full"
      style={{
        background: "linear-gradient(to bottom, white 35%, #b4c6ff 73%, white 100%)",
      }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-center flex-1">
            {/* Header */}
            <div className="flex flex-col gap-4 md:gap-6 items-center px-4 md:px-24 py-6 md:py-10 w-full">
              <div className="flex flex-col gap-4 md:gap-6 items-center max-w-[500px] w-full">
                {/* Title */}
                <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[60px] text-center tracking-[-1px] md:tracking-[-2.4px] leading-tight md:leading-none">
                  <span className="text-black">Choose Your </span>
                  <span
                    className="bg-clip-text"
                    style={{
                      backgroundImage: "linear-gradient(126deg, rgb(59, 85, 157) 0%, rgb(102, 175, 105) 101%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Adventure Quest
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="font-normal text-base md:text-[20px] text-center text-[#333] opacity-96 leading-relaxed md:leading-7">
                  Become the protagonist of an amazing adventure. Reach the end and claim your reward.
                </p>
              </div>
            </div>

            {/* Quest Card */}
            <div className="flex items-start justify-center px-4 md:px-20 w-full">
              <div className="relative w-full max-w-[1020px] h-[350px] sm:h-[400px] md:h-[525px] rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Background Image - fills entire card */}
                <img
                  src={imgRectangle}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay - bottom fade to white */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,0.9) 85%)",
                  }}
                />

                {/* Amazonia Logo */}
                <div className="absolute top-4 md:top-9 right-4 md:right-9 w-[120px] sm:w-[160px] md:w-[200px] opacity-96">
                  <img
                    src={imgAmazoniaLogo}
                    alt="Amazonia Route"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Content */}
                <div className="absolute left-4 md:left-9 right-4 md:right-9 top-4 md:top-9 bottom-4 md:bottom-9 flex flex-col justify-between">
                  {/* Distance Badge */}
                  <div className="flex items-center gap-1.5 opacity-84">
                    <div className="w-4 md:w-5 h-4 md:h-5">
                      <img src={imgRouting} alt="" className="w-full h-full" />
                    </div>
                    <span className="font-normal text-xs md:text-sm text-black leading-6">120 km</span>
                  </div>

                  {/* Bottom Content */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full">
                    {/* Left Side - Info */}
                    <div className="flex flex-col gap-4 md:gap-8 max-w-full sm:max-w-[405px]">
                      <div className="flex flex-col gap-1 md:gap-1.5 text-black w-full">
                        <h3 className="font-semibold text-lg sm:text-xl md:text-2xl leading-tight md:leading-8">Amazonia Route</h3>
                        <p className="font-normal text-xs sm:text-sm opacity-84 leading-5 md:leading-6">
                          We&apos;ve traveled around South America to find some treasures!
                        </p>
                      </div>

                      {/* CTA Button */}
                      <button className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-[#fafafa] bg-[#18181b] rounded-md w-fit hover:bg-[#27272a] transition-colors">
                        Choose a Quest
                        <ArrowRight size={14} className="text-[#fafafa] md:w-4 md:h-4" />
                      </button>
                    </div>

                    {/* Right Side - Price */}
                    <span className="font-semibold text-2xl sm:text-3xl md:text-4xl text-black tracking-[-1.44px] leading-none">
                      $40
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
