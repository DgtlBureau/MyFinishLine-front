"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Card 1 images (local)
const imgRingDecoration = "/images/card1-ring.webp";
const imgPhotoBackground = "/images/card1-photo-bg.webp";
const imgMedalPreview = "/images/card1-medal.webp";


const steps = [
  {
    number: 1,
    title: "Choose your adventure quest",
    description: "Become part of a new and incredible story where you are the main character!",
  },
  {
    number: 2,
    title: "Connect applications",
    description: "Add access to your achievements in the Strava app or enter your activity data manually to integrate your fitness progress.",
  },
  {
    number: 3,
    title: "Discover engaging content",
    description: "Engage in real-time activities and progress along a virtual route. Discover new locations, solve historical mysteries, earn digital rewards, and unlock unique collections.",
  },
  {
    number: 4,
    title: "Reach the end and receive your medal",
    description: "Complete all the quest tasks and receive your virtual medal. Verify your delivery details and receive your physical medal by mail. The reward for each virtual quest is exclusive.",
  },
];

// Card 1 - Quest Selection UI (matches Figma node 1735:7717)
function Card1() {
  return (
    <div
      className="relative w-[398px] h-[320px] rounded-3xl overflow-hidden border border-[#b7b9e2]"
      style={{ background: "linear-gradient(to bottom, #5170d5, #cee9d8)", backdropFilter: "blur(6.131px)" }}
    >
      {/* Background photo with soft light blend */}
      <div
        className="absolute w-[398px] h-[542px] mix-blend-soft-light overflow-hidden pointer-events-none"
        style={{ left: "-1px", top: "-78.45px" }}
      >
        <img
          src={imgPhotoBackground}
          alt=""
          className="absolute w-full max-w-none"
          style={{ height: "142.83%", left: "0", top: "-42.82%" }}
        />
      </div>

      {/* Ring decoration */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "37px", top: "-1.45px", width: "315px", height: "320px" }}
      >
        <img src={imgRingDecoration} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Gallery card - Figma node 1735:7724 */}
      <div
        className="absolute rounded-[8px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
        style={{
          left: "198px",
          top: "24.55px",
          width: "173.277px",
          height: "268.551px",
          background: "linear-gradient(to bottom, #f8f8f8 0%, #cee9d8 49.965%, #f8f8f8 100%)",
          border: "1px solid #ededed"
        }}
      >
        {/* Thumbnail - left:13.37px, top:13.37px, size:43.458px */}
        <div
          className="absolute overflow-hidden"
          style={{ left: "13.37px", top: "13.37px", width: "43.458px", height: "43.458px", borderRadius: "6.686px" }}
        >
          <div className="absolute" style={{ inset: "-266.67% -34.23% -41.77% -75.64%" }}>
            <img src={imgPhotoBackground} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Title - Amazonia Route - left:63.52px, top:13.37px */}
        <div
          className="absolute flex items-center"
          style={{ left: "63.52px", top: "13.37px", width: "90.26px", height: "22.286px", paddingTop: "8.915px", paddingBottom: "4.457px" }}
        >
          <span className="text-[10.029px] font-medium text-[#09090b]" style={{ lineHeight: "15.6px" }}>Amazonia Route</span>
        </div>

        {/* 649 km - left:63.52px, top:56.83px translateY(-100%) */}
        <div
          className="absolute flex flex-col justify-end"
          style={{ left: "63.52px", top: "56.83px", transform: "translateY(-100%)", width: "36.215px", height: "6.686px" }}
        >
          <span className="text-[5.572px] text-[#71717a]" style={{ lineHeight: "normal" }}>649 km</span>
        </div>

        {/* Go to map - left:159.9px translateX(-100%), top:56.83px translateY(-100%) */}
        <div
          className="absolute flex flex-col justify-end text-right"
          style={{ left: "159.9px", top: "56.83px", transform: "translate(-100%, -100%)", width: "36.215px", height: "6.686px" }}
        >
          <span className="underline text-[5.572px] font-semibold text-black" style={{ lineHeight: "normal" }}>Go to map</span>
        </div>

        {/* Description - left:13.37px, top:73.55px */}
        <div
          className="absolute"
          style={{ left: "13.37px", top: "73.55px", width: "140.404px", height: "22.286px" }}
        >
          <div
            className="absolute flex flex-col justify-center text-[7.8px] text-[#71717a]"
            style={{ left: "0", top: "11.5px", transform: "translateY(-50%)", width: "140.404px", lineHeight: "11.143px" }}
          >
            We&apos;ve traveled around South America to find some treasures!
          </div>
        </div>

        {/* Progress bar - left:13.37px, top:109.2px */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "13.37px",
            top: "109.2px",
            width: "146.533px",
            height: "8.915px",
            borderRadius: "24px",
            border: "1px solid white",
            background: "linear-gradient(90deg, #3a559b 0%, #66af69 100%)",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)"
          }}
        >
          <div
            className="absolute flex flex-col justify-center text-center text-[5.572px] text-white font-medium"
            style={{ left: "calc(50% + 0.28px)", top: "3.46px", transform: "translate(-50%, -50%)", width: "60.173px", height: "8.915px", lineHeight: "11.143px" }}
          >
            100 %
          </div>
        </div>

        {/* 120 km - left:13.37px, top:145.29px translateY(-50%) */}
        <div
          className="absolute flex flex-col justify-center"
          style={{ left: "13.37px", top: "145.29px", transform: "translateY(-50%)", width: "27.858px" }}
        >
          <span className="text-[7.8px] font-semibold text-[#09090b]" style={{ lineHeight: "11.143px", letterSpacing: "0.0557px" }}>120 km</span>
        </div>

        {/* 53 hrs - left:159.9px translateX(-100%), top:145.29px translateY(-50%) */}
        <div
          className="absolute flex flex-col justify-center text-right"
          style={{ left: "159.9px", top: "145.29px", transform: "translate(-100%, -50%)", width: "27.858px" }}
        >
          <span className="text-[7.8px] font-semibold text-[#09090b]" style={{ lineHeight: "11.143px", letterSpacing: "0.0557px" }}>53 hrs</span>
        </div>

        {/* Medal preview - bottom:62.4px, left:calc(50%+0.28px), size:66.859px */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: "calc(50% + 0.28px)",
            bottom: "62.4px",
            width: "66.859px",
            height: "66.859px",
            borderRadius: "44.573px",
            border: "2.229px solid #eedfba",
            transform: "translateX(-50%)"
          }}
        >
          <div className="absolute" style={{ inset: "-25.83% -17.5% -7.5% -15.83%" }}>
            <img src={imgMedalPreview} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* In processing button - yellow gradient with shimmer */}
        <div
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            left: "13.37px",
            right: "13.37px",
            bottom: "28.97px",
            height: "20.058px",
            paddingTop: "4.457px",
            paddingBottom: "4.457px",
            borderRadius: "4.457px",
            background: "linear-gradient(90deg, #d4a853 0%, #f5d998 30%, #eedfba 50%, #f5d998 70%, #d4a853 100%)",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.15), inset 0px 1px 2px rgba(255,255,255,0.5)"
          }}
        >
          <span className="text-[7.8px] font-semibold text-[#5c4a1f]" style={{ lineHeight: "13.372px" }}>In processing...</span>
        </div>

        {/* Look at medal - left:50%, top:255.18px translateX(-50%) translateY(-100%) */}
        <div
          className="absolute flex flex-col justify-end text-center"
          style={{ left: "50%", top: "255.18px", transform: "translate(-50%, -100%)", width: "56.273px", height: "6.686px" }}
        >
          <span className="underline text-[5.572px] font-semibold text-black" style={{ lineHeight: "normal" }}>Look at the medal</span>
        </div>
      </div>
    </div>
  );
}


// Card 2 images (local) - from Figma node 1735:7743
const imgCard2Glow = "/images/card2-glow.svg";
const imgCard2FitbitLogo = "/images/card2-fitbit-logo.svg";
const imgCard2StravaLogo = "/images/card2-strava-logo.svg";

// Activity icons - fill: #f2f2f2
const card2ActivityIcons = [
  "/images/card2-act-swim.svg",
  "/images/card2-act-hike.svg",
  "/images/card2-act-run.svg",
  "/images/card2-act-bike.svg",
  "/images/card2-act-walk.svg",
  "/images/card2-act-climb.svg",
  "/images/card2-act-treadmill.svg",
];

// Activity icons specs from Figma (symmetrical: 1-2-3-4-3-2-1)
const activityIconSpecs = [
  { opacity: 0.6, size: 33.661, padding: 7.65, borderWidth: 1.53, borderRadius: 76.503 },
  { opacity: 0.72, size: 36.867, padding: 8.379, borderWidth: 1.676, borderRadius: 83.789 },
  { opacity: 0.84, size: 40.073, padding: 9.107, borderWidth: 1.821, borderRadius: 91.075 },
  { opacity: 1, size: 43.279, padding: 9.836, borderWidth: 1.967, borderRadius: 98.361 },
  { opacity: 0.84, size: 40.073, padding: 9.107, borderWidth: 1.821, borderRadius: 91.075 },
  { opacity: 0.72, size: 36.867, padding: 8.379, borderWidth: 1.676, borderRadius: 83.789 },
  { opacity: 0.6, size: 33.661, padding: 7.65, borderWidth: 1.53, borderRadius: 76.503 },
];

// Card 2 - Connect Applications (Figma node 1735:7743)
function Card2() {
  return (
    <div
      className="relative w-[398px] h-[320px] rounded-3xl overflow-hidden border border-[#b7b9e2]"
      style={{ background: "linear-gradient(to bottom, #5170d5, #cee9d8)", backdropFilter: "blur(6.131px)" }}
    >
      {/* 1. Glow effect - node 1735:7746 */}
      <div className="absolute" style={{ left: "57px", top: "63px", width: "282px", height: "77px" }}>
        <div className="absolute" style={{ inset: "-155.84% -42.55%" }}>
          <img src={imgCard2Glow} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* 3. Fitbit icon - node 1735:7772 - LEFT, BEHIND STRAVA */}
      <div
        className="absolute z-0"
        style={{ left: "calc(50% - 70px)", top: "66px", transform: "translateX(-50%)", width: "72px", height: "72px" }}
      >
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: "70.572px",
            height: "70.572px",
            background: "#00b0b9",
            borderRadius: "18.819px",
            boxShadow: "0px 3.088px 38.594px 0px #c0e2d6, inset 0.882px 0.882px 1.764px 0px rgba(255,255,255,0.48), inset -0.882px -0.882px 1.764px 0px rgba(255,255,255,0.48)"
          }}
        >
          <img src={imgCard2FitbitLogo} alt="Fitbit" style={{ width: "37.05px", height: "36.925px" }} />
        </div>
      </div>

      {/* 4. Garmin icon - node 1735:7780 - RIGHT, BEHIND STRAVA */}
      <div
        className="absolute z-0"
        style={{ left: "calc(50% + 70px)", top: "66px", transform: "translateX(-50%)", width: "72px", height: "72px" }}
      >
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: "70.432px",
            height: "70.432px",
            background: "#000000",
            borderRadius: "18.782px",
            boxShadow: "0px 3.081px 38.518px 0px #c0e2d6, inset 0.88px 0.88px 1.761px 0px rgba(255,255,255,0.48), inset -0.88px -0.88px 1.761px 0px rgba(255,255,255,0.48)"
          }}
        >
          <span className="text-white text-[11px] font-bold tracking-[0.05em]">GARMIN</span>
        </div>
      </div>

      {/* 2. Strava icon - node 1735:7797 - CENTER, LARGEST, IN FRONT */}
      <div
        className="absolute z-10"
        style={{ left: "50%", top: "54px", transform: "translateX(-50%)", width: "96px", height: "96px" }}
      >
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: "93.91px",
            height: "93.91px",
            background: "#fc4c02",
            borderRadius: "25.043px",
            boxShadow: "0px 4.109px 51.357px 0px #fcb471, inset 1.174px 1.174px 2.348px 0px rgba(255,255,255,0.48), inset -1.174px -1.174px 2.348px 0px rgba(255,255,255,0.48)"
          }}
        >
          <img src={imgCard2StravaLogo} alt="Strava" style={{ width: "42.258px", height: "58.513px" }} />
        </div>
      </div>

      {/* 5. Activity icons row - node 1735:7748 */}
      <div
        className="absolute flex flex-nowrap items-center gap-[5.246px]"
        style={{ left: "calc(50% - 0.11px)", top: "198.88px", transform: "translateX(-50%)", opacity: 0.6 }}
      >
        {activityIconSpecs.map((spec, i) => {
          const iconSize = spec.size - 2 * spec.padding; // Calculate actual icon size
          return (
            <div
              key={i}
              className="flex items-center shrink-0"
              style={{ opacity: spec.opacity }}
            >
              {/* Dashed border wrapper */}
              <div
                className="flex items-center justify-center"
                style={{
                  border: `${spec.borderWidth}px dashed rgba(255,255,255,0.36)`,
                  borderRadius: `${spec.borderRadius * 2}px`,
                  padding: `${spec.borderWidth}px`,
                }}
              >
                {/* White circle with shadow */}
                <div
                  className="bg-white flex items-center justify-center shrink-0 box-border"
                  style={{
                    width: `${spec.size}px`,
                    height: `${spec.size}px`,
                    padding: `${spec.padding}px`,
                    borderRadius: `${spec.borderRadius}px`,
                    boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Icon */}
                  <img
                    src={card2ActivityIcons[i]}
                    alt=""
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Distance display - node 1735:7805 */}
      <div
        className="absolute flex items-center"
        style={{ left: "calc(50% + 0.39px)", top: "259px", transform: "translateX(-50%)" }}
      >
        <div className="flex flex-col items-center text-center text-white w-[108px]">
          {/* 120 km - node 1735:7807 */}
          <div className="flex flex-col justify-center w-full" style={{ opacity: 0.84 }}>
            <p className="font-bold text-[20px] leading-none">120 km</p>
          </div>
          {/* Total distance - node 1735:7808 */}
          <div className="flex flex-col justify-center w-full" style={{ opacity: 0.6 }}>
            <p className="font-medium text-[10px]" style={{ lineHeight: "17.067px" }}>Total distance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Card 3 image - local file
const imgCard3NewFrame = "/images/card3-phone-new.png";

// Card 3 - Discover Content with Smooth Fade-in Animation
function Card3() {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger animation when card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={cardRef}
      className="relative w-[398px] h-[320px] rounded-3xl overflow-hidden transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)"
      }}
    >
      <img
        src={imgCard3NewFrame}
        alt="MyFinishLine App"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// Card 4 images (local)
const imgCard4MedalWithRibbon = "/images/card4-medal-with-ribbon.webp";
const imgCard4Glow = "/images/card4-glow.png";
const imgCard4Bg = "/images/card4-bg.webp";

// Card 4 - Medal Completion with Loading Animation
function Card4() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showMedal, setShowMedal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger animation when card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Progress animation when visible
  useEffect(() => {
    if (!isVisible) return;

    let currentProgress = 0;
    const duration = 2000; // 2 seconds to reach 100%
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        // Show medal with slight delay after reaching 100%
        setTimeout(() => setShowMedal(true), 300);
      }
      setProgress(Math.round(currentProgress));
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div
      ref={cardRef}
      className="relative w-[398px] h-[320px] rounded-3xl overflow-hidden border border-[#b7b9e2]"
      style={{ background: "linear-gradient(to bottom, #5170d5, #cee9d8)", backdropFilter: "blur(6.131px)" }}
    >
      {/* Background image with soft light blend */}
      <div
        className="absolute mix-blend-soft-light rounded-[16px] overflow-hidden opacity-30 pointer-events-none"
        style={{ left: "-1px", top: "calc(50% - 0.12px)", transform: "translateY(-50%)", width: "398px", height: "320px" }}
      >
        <img
          src={imgCard4Bg}
          alt=""
          className="absolute w-full max-w-none"
          style={{ height: "206.49%", left: "0", top: "-53.21%" }}
        />
      </div>

      {/* Glow effect - animated with medal */}
      <div
        className="absolute transition-all duration-700 ease-out"
        style={{
          left: "57px",
          top: "63px",
          width: "282px",
          height: "77px",
          opacity: showMedal ? 1 : 0,
          transform: showMedal ? "scale(1)" : "scale(0.5)"
        }}
      >
        <div className="absolute" style={{ inset: "-155.84% -42.55%" }}>
          <img src={imgCard4Glow} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Stats - 120 km */}
      <div
        className="absolute font-semibold text-[14px] text-white tracking-[0.1px] transition-opacity duration-500"
        style={{
          left: "21px",
          top: "31px",
          transform: "translateY(-50%)",
          lineHeight: "20px",
          opacity: showMedal ? 1 : 0.5
        }}
      >
        120 km
      </div>

      {/* Stats - 53 hrs */}
      <div
        className="absolute font-semibold text-[14px] text-white text-right tracking-[0.1px] transition-opacity duration-500"
        style={{
          left: "375px",
          top: "31px",
          transform: "translate(-100%, -50%)",
          width: "50px",
          lineHeight: "20px",
          opacity: showMedal ? 1 : 0.5
        }}
      >
        53 hrs
      </div>

      {/* Medal with ribbon container - animated appearance */}
      <div
        className="absolute transition-all duration-700 ease-out flex items-center justify-center"
        style={{
          left: "50%",
          top: "calc(50% - 30px)",
          transform: `translate(-50%, -50%) ${showMedal ? "scale(1) translateY(0)" : "scale(0) translateY(-50px)"}`,
          opacity: showMedal ? 1 : 0,
          width: "280px",
          height: "320px"
        }}
      >
        {/* Medal with ribbon image */}
        <img
          src={imgCard4MedalWithRibbon}
          alt="Amazonia Route Medal"
          className="object-contain pointer-events-none drop-shadow-xl"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Placeholder circle before medal appears */}
      <div
        className="absolute bg-white/20 border-2 border-white/30 border-dashed transition-opacity duration-300"
        style={{
          left: "50%",
          top: "calc(50% - 16px)",
          transform: "translate(-50%, -50%)",
          width: "224px",
          height: "224px",
          borderRadius: "50%",
          opacity: showMedal ? 0 : 1
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute"
        style={{
          left: "-1px",
          bottom: "-1.12px",
          width: "398px",
          height: "64px",
          background: "linear-gradient(to bottom, rgba(206,233,216,0), rgba(206,233,216,0.3))",
          backdropFilter: "blur(6px)"
        }}
      />

      {/* Progress bar with animation */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "21px",
          top: "281px",
          width: "354px",
          height: "16px",
          borderRadius: "24px",
          border: "1px solid white",
          background: "#e0e0e0",
          boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.15)"
        }}
      >
        {/* Progress fill */}
        <div
          className="absolute h-full transition-all duration-100 ease-linear"
          style={{
            left: 0,
            top: 0,
            width: `${progress}%`,
            background: "linear-gradient(to right, #3a559b, #66af69)",
            borderRadius: "24px"
          }}
        />
        {/* Percentage text */}
        <div
          className="absolute flex items-center justify-center font-medium text-[10px] text-white text-center"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "108px",
            height: "16px",
            lineHeight: "20px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}
        >
          {progress} %
        </div>
      </div>
    </div>
  );
}

const cardComponents = [Card1, Card2, Card3, Card4];

// Animated Step Item component
function AnimatedStepItem({
  step,
  index,
  CardComponent,
  onVisible
}: {
  step: typeof steps[0];
  index: number;
  CardComponent: React.ComponentType;
  onVisible: (index: number) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          onVisible(index);
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, index, onVisible]);

  return (
    <div
      ref={stepRef}
      className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10 h-auto lg:h-[320px]"
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.5s ease-out, visibility 0.5s ease-out"
      }}
    >
      {/* Mobile timeline badge - animated */}
      <div
        className="lg:hidden w-10 h-10 rounded-full bg-[#66af69] border-2 border-[#4a9a4e] flex items-center justify-center shrink-0 mb-2 shadow-sm transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0)"
        }}
      >
        <span className="font-mono text-lg text-white font-semibold leading-4">{step.number}</span>
      </div>

      {/* Text Content - animated */}
      <div
        className="flex flex-col gap-6 items-start justify-center h-full p-4 transition-all duration-700 ease-out"
        style={{
          width: "100%",
          maxWidth: "401px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-50px)"
        }}
      >
        <h3 className="text-white text-xl md:text-2xl font-semibold leading-8">
          {step.title}
        </h3>
        <p className="text-base text-white/60 leading-6">
          {step.description}
        </p>
      </div>

      {/* Card - animated */}
      <div
        className="shrink-0 transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "scale(1) translateX(0)"
            : "scale(0.8) translateX(50px)"
        }}
      >
        <div className="transform scale-[0.75] md:scale-90 lg:scale-100 origin-center lg:origin-left">
          <CardComponent />
        </div>
      </div>
    </div>
  );
}

// Animated Timeline component
function AnimatedTimeline({ visibleSteps }: { visibleSteps: boolean[] }) {
  return (
    <div className="hidden lg:flex flex-col items-center w-[38px] shrink-0">
      {/* Step 1 section */}
      <div className="flex flex-col gap-1 items-center h-[260px]">
        <div
          className="w-[3px] h-[80px] transition-all duration-1000"
          style={{
            background: visibleSteps[0]
              ? "linear-gradient(to bottom, white, rgba(58,85,157,0.7))"
              : "transparent",
            opacity: visibleSteps[0] ? 1 : 0
          }}
        />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-700"
          style={{
            background: visibleSteps[0] ? "#66af69" : "transparent",
            border: visibleSteps[0] ? "2px solid #4a9a4e" : "2px solid transparent",
            transform: visibleSteps[0] ? "scale(1)" : "scale(0)",
            opacity: visibleSteps[0] ? 1 : 0
          }}
        >
          <span className="font-mono text-lg text-white font-semibold leading-4">1</span>
        </div>
        <div
          className="w-[3px] h-[132px] transition-all duration-1000 delay-300"
          style={{
            background: visibleSteps[0]
              ? "linear-gradient(to bottom, rgba(58,85,157,0.3), rgba(58,85,157,0.7))"
              : "transparent",
            opacity: visibleSteps[0] ? 1 : 0
          }}
        />
      </div>

      {/* Connector 1-2 */}
      <div
        className="w-[3px] h-8 transition-all duration-700"
        style={{
          background: visibleSteps[1] ? "rgba(58,85,157,0.7)" : "transparent",
          opacity: visibleSteps[1] ? 1 : 0
        }}
      />

      {/* Step 2 section */}
      <div className="flex flex-col gap-1 items-center h-[320px]">
        <div
          className="w-[3px] h-[110px] transition-all duration-1000"
          style={{
            background: visibleSteps[1] ? "rgba(58,85,157,0.7)" : "transparent",
            opacity: visibleSteps[1] ? 1 : 0
          }}
        />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-700"
          style={{
            background: visibleSteps[1] ? "#66af69" : "transparent",
            border: visibleSteps[1] ? "2px solid #4a9a4e" : "2px solid transparent",
            transform: visibleSteps[1] ? "scale(1)" : "scale(0)",
            opacity: visibleSteps[1] ? 1 : 0
          }}
        >
          <span className="font-mono text-lg text-white font-semibold leading-4">2</span>
        </div>
        <div
          className="w-[3px] h-[162px] transition-all duration-1000 delay-300"
          style={{
            background: visibleSteps[1] ? "rgba(58,85,157,0.7)" : "transparent",
            opacity: visibleSteps[1] ? 1 : 0
          }}
        />
      </div>

      {/* Connector 2-3 */}
      <div
        className="w-[3px] h-8 transition-all duration-700"
        style={{
          background: visibleSteps[2] ? "rgba(58,85,157,0.7)" : "transparent",
          opacity: visibleSteps[2] ? 1 : 0
        }}
      />

      {/* Step 3 section */}
      <div className="flex flex-col gap-1 items-center h-[320px]">
        <div
          className="w-[3px] h-[80px] transition-all duration-1000"
          style={{
            background: visibleSteps[2] ? "rgba(58,85,157,0.7)" : "transparent",
            opacity: visibleSteps[2] ? 1 : 0
          }}
        />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-700"
          style={{
            background: visibleSteps[2] ? "#66af69" : "transparent",
            border: visibleSteps[2] ? "2px solid #4a9a4e" : "2px solid transparent",
            transform: visibleSteps[2] ? "scale(1)" : "scale(0)",
            opacity: visibleSteps[2] ? 1 : 0
          }}
        >
          <span className="font-mono text-lg text-white font-semibold leading-4">3</span>
        </div>
        <div
          className="w-[3px] h-[192px] transition-all duration-1000 delay-300"
          style={{
            background: visibleSteps[2] ? "rgba(58,85,157,0.7)" : "transparent",
            opacity: visibleSteps[2] ? 1 : 0
          }}
        />
      </div>

      {/* Step 4 section */}
      <div className="flex flex-col gap-1 items-center h-[320px]">
        <div
          className="w-[3px] h-[80px] transition-all duration-1000"
          style={{
            background: visibleSteps[3]
              ? "linear-gradient(to bottom, rgba(58,85,157,0.7), rgba(255,255,255,0))"
              : "transparent",
            opacity: visibleSteps[3] ? 1 : 0
          }}
        />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-700"
          style={{
            background: visibleSteps[3] ? "#66af69" : "transparent",
            border: visibleSteps[3] ? "2px solid #4a9a4e" : "2px solid transparent",
            transform: visibleSteps[3] ? "scale(1)" : "scale(0)",
            opacity: visibleSteps[3] ? 1 : 0
          }}
        >
          <span className="font-mono text-lg text-white font-semibold leading-4">4</span>
        </div>
        <div className="w-0 h-[80px]" />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState([false, false, false, false]);

  const handleStepVisible = useCallback((index: number) => {
    setVisibleSteps(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  return (
    <section id="how-it-works" className="flex flex-col items-center py-12 md:py-24 w-full">
      <div className="max-w-[1280px] px-4 md:px-24 w-full">
        {/* Header */}
        <div className="flex flex-col gap-3 items-center justify-center px-4 md:px-24 mb-8 md:mb-14">
          <div className="flex items-center justify-center w-full">
            <h2 className="font-semibold text-3xl md:text-[48px] text-center tracking-[-1px] md:tracking-[-1.92px] text-white leading-none">
              How it works
            </h2>
          </div>
          <div className="flex items-center justify-center w-full">
            <p className="font-normal text-sm md:text-base text-center text-white/60 leading-6">
              From choice to goal achievement step by step
            </p>
          </div>
        </div>

        {/* Steps with animated timeline */}
        <div className="flex gap-4 items-start justify-center max-w-[1024px] mx-auto px-4 md:px-16">
          {/* Animated Timeline */}
          <AnimatedTimeline visibleSteps={visibleSteps} />

          {/* Content area with animated steps */}
          <div className="flex-1 flex flex-col gap-4">
            {steps.map((step, index) => {
              const CardComponent = cardComponents[index];
              return (
                <AnimatedStepItem
                  key={step.number}
                  step={step}
                  index={index}
                  CardComponent={CardComponent}
                  onVisible={handleStepVisible}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
