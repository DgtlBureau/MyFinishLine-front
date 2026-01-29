"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const heroMapImg = "/images/hero-map.png";
const raccoonImg = "/images/mascot.png";
const speechBubbleImg = "";

// Images to preload
const imagesToPreload = [heroMapImg, raccoonImg, speechBubbleImg];

export default function Hero() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  // Preload all images before starting animation
  const preloadImages = useCallback(() => {
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Start animation sequence after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    // Stage 1: Map appears (starts immediately after images loaded)
    setAnimationStage(1);

    // Stage 2: Raccoon appears (after 800ms)
    const timer1 = setTimeout(() => setAnimationStage(2), 800);

    // Stage 3: Speech bubble appears (after 1300ms)
    const timer2 = setTimeout(() => setAnimationStage(3), 1300);

    // Stage 4: Text appears (after 1800ms)
    const timer3 = setTimeout(() => setAnimationStage(4), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [imagesLoaded]);

  return (
    <section className="flex flex-col items-center py-8 md:py-[60px] w-full">
      <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-4 md:gap-6 items-center justify-center w-full px-4 md:px-8">
          {/* Main Headline */}
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] text-center tracking-[-1px] md:tracking-[-2.4px] max-w-[880px] text-black leading-tight md:leading-none">
            Is a story-driven virtual fitness quest where movement unlocks the{" "}
            <span
              className="bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(131deg, rgb(59, 85, 157) 47.5%, rgb(102, 175, 105) 64%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              journey
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-normal text-sm sm:text-base md:text-lg lg:text-[20px] text-center text-[#333] opacity-96 leading-relaxed md:leading-7 max-w-[880px]">
            Train, progress, explore the world, and become the hero of your own global journey —
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            step into a global experience where the first quest sets everything in motion.
          </p>

          {/* CTA Button */}
          <a
            href="#level-up"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#fafafa] bg-[#18181b] rounded-md hover:bg-[#27272a] transition-colors"
          >
            Start the Adventure
            <ArrowRight size={16} className="text-[#fafafa]" />
          </a>
        </div>

        {/* Map Image Section */}
        <div className="relative w-full max-w-[1440px] h-[220px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {/* Map Image with animation */}
          <div
            className="absolute inset-0 overflow-hidden transition-all duration-1000 ease-out"
            style={{
              opacity: animationStage >= 1 ? 1 : 0,
              transform: animationStage >= 1 ? "scale(1)" : "scale(0.95)",
            }}
          >
            <img
              src={heroMapImg}
              alt="South America Adventure Map"
              className="absolute h-full sm:h-[124%] w-full sm:w-[90%] md:w-[77%] left-0 sm:left-[5%] md:left-[11%] top-0 object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Gradient Overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 50% 43%, rgba(255,255,255,0) 82%, rgba(255,255,255,1) 100%),
                linear-gradient(45deg, rgba(255, 255, 255, 0) 66%, rgb(255, 255, 255) 91%),
                linear-gradient(-44deg, rgba(255, 255, 255, 0) 78%, rgb(255, 255, 255) 91%),
                linear-gradient(90deg, rgba(255, 255, 255, 0) 79%, rgb(255, 255, 255) 87%),
                linear-gradient(270deg, rgba(255, 255, 255, 0) 79%, rgb(255, 255, 255) 87%),
                linear-gradient(180deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 16%)
              `,
            }}
          />

          {/* Bottom blur gradient */}
          <div
            className="absolute bottom-0 left-0 w-full h-[50px] md:h-[71px] backdrop-blur-[12px]"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.6) 50%, white)",
            }}
          />

          {/* Top blur gradient */}
          <div
            className="absolute top-0 left-0 w-full h-[30px] md:h-[45px] backdrop-blur-[12px]"
            style={{
              background: "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.6) 50%, white)",
            }}
          />

          {/* Raccoon with Speech Bubble - hidden on mobile */}
          <div className="hidden md:flex absolute right-4 lg:right-[100px] top-[45px] items-start gap-0">
            {/* Speech Bubble with animation */}
            <div
              className="relative bg-[#f4f4f5] rounded-[12472px] px-3 lg:px-5 py-2 lg:py-3 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.24)] w-[140px] lg:w-[178px] h-[55px] lg:h-[67px] flex flex-col items-center justify-center transition-all duration-500 ease-out"
              style={{
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3
                  ? "scale(1) translateY(0)"
                  : "scale(0.7) translateY(15px)",
              }}
            >
              {/* Text with fade animation */}
              <p
                className="font-semibold text-sm lg:text-[18px] text-[#231f20] leading-normal text-center whitespace-nowrap transition-opacity duration-500 ease-out"
                style={{
                  opacity: animationStage >= 4 ? 1 : 0,
                }}
              >
                Let&apos;s go
                <br />
                on an adventure!
              </p>
              {/* Speech bubble tail */}
              <div
                className="absolute bottom-[-12px] right-[29px] transition-opacity duration-300"
                style={{
                  opacity: animationStage >= 3 ? 1 : 0,
                }}
              >
                <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0C8 0 15 8 20 17C15 12 8 10 0 10V0Z" fill="#f4f4f5"/>
                </svg>
              </div>
            </div>

            {/* Raccoon with bounce animation */}
            <div
              className="w-[100px] lg:w-[158px] h-[97px] lg:h-[153px] ml-[-10px] mt-[24px] transition-all duration-700 ease-out"
              style={{
                opacity: animationStage >= 2 ? 1 : 0,
                transform: animationStage >= 2
                  ? "translateY(0) scale(1)"
                  : "translateY(40px) scale(0.8)",
              }}
            >
              <img
                src={raccoonImg}
                alt="Raccoon mascot"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
