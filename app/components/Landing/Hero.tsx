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
    <section className="flex flex-col items-center pt-20 md:pt-28 pb-8 md:pb-[60px] w-full">
      <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-4 md:gap-6 items-center justify-center w-full px-4 md:px-8">
          {/* Main Headline */}
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] text-center tracking-[-1px] md:tracking-[-2.4px] max-w-[880px] text-white leading-tight md:leading-none">
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
          <p className="font-normal text-sm sm:text-base md:text-lg lg:text-[20px] text-center text-white/70 leading-relaxed md:leading-7 max-w-[880px]">
            Train, progress, explore the world, and become the hero of your own global journey —
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            step into a global experience where the first quest sets everything in motion.
          </p>

          {/* CTA Button */}
          <a
            href="#level-up"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] rounded-md hover:from-[#3B5CC6]/90 hover:to-[#4DA67A]/90 transition-colors"
          >
            Start the Adventure
            <ArrowRight size={16} className="text-[#fafafa]" />
          </a>
        </div>

        {/* Map Image Section */}
        <div className="relative w-full h-[220px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
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
              className="absolute h-full w-full top-0 left-0 object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Seamless edge fade - all sides */}
          <div
            className="absolute -inset-[1px] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 50% 45%, rgba(26,42,74,0) 30%, rgba(26,42,74,0.3) 50%, rgba(26,42,74,0.7) 65%, rgba(26,42,74,1) 82%),
                linear-gradient(to bottom, rgba(26,42,74,0) 55%, rgba(26,42,74,0.5) 75%, rgba(26,42,74,1) 92%),
                linear-gradient(to top, rgba(26,42,74,0) 75%, rgba(26,42,74,0.5) 88%, rgba(26,42,74,1) 100%),
                linear-gradient(to right, rgba(26,42,74,1) 0%, rgba(26,42,74,0.8) 6%, rgba(26,42,74,0.3) 14%, rgba(26,42,74,0) 23%),
                linear-gradient(to left, rgba(26,42,74,1) 0%, rgba(26,42,74,0.8) 6%, rgba(26,42,74,0.3) 14%, rgba(26,42,74,0) 23%)
              `,
            }}
          />

          {/* Left blur */}
          <div
            className="absolute top-0 left-0 h-full w-[80px] md:w-[140px] backdrop-blur-[20px] pointer-events-none"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black, transparent)",
              maskImage: "linear-gradient(to right, black, transparent)",
            }}
          />

          {/* Right blur */}
          <div
            className="absolute top-0 right-0 h-full w-[80px] md:w-[140px] backdrop-blur-[20px] pointer-events-none"
            style={{
              WebkitMaskImage: "linear-gradient(to left, black, transparent)",
              maskImage: "linear-gradient(to left, black, transparent)",
            }}
          />

          {/* Raccoon with Speech Bubble - hidden on mobile */}
          <div className="hidden md:flex absolute right-4 lg:right-[100px] top-[45px] items-start gap-0">
            {/* Speech Bubble with animation */}
            <div
              className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-[12472px] px-3 lg:px-5 py-2 lg:py-3 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.24)] w-[140px] lg:w-[178px] h-[55px] lg:h-[67px] flex flex-col items-center justify-center transition-all duration-500 ease-out"
              style={{
                opacity: animationStage >= 3 ? 1 : 0,
                transform: animationStage >= 3
                  ? "scale(1) translateY(0)"
                  : "scale(0.7) translateY(15px)",
              }}
            >
              {/* Text with fade animation */}
              <p
                className="font-semibold text-sm lg:text-[18px] text-white leading-normal text-center whitespace-nowrap transition-opacity duration-500 ease-out"
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
                className="absolute bottom-[-12px] right-[29px] -z-10 transition-opacity duration-300"
                style={{
                  opacity: animationStage >= 3 ? 1 : 0,
                }}
              >
                <svg width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0C8 0 15 8 20 17C15 12 8 10 0 10V0Z" fill="rgba(255,255,255,0.15)"/>
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
