"use client";

import Link from "next/link";
import Image from "next/image";
import BackButton from "../components/Shared/BackButton/BackButton";
import PolicyPageTransition from "../components/Shared/PolicyPageTransition/PolicyPageTransition";
import { ToastContainerClient } from "../components/Shared/ToastContainerClient";
import "../globals.css";

export default function WithoutHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a2a4a] via-[#2a4a6a] to-[#1a3a3a]">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B5CC6]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4DA67A]/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#5170D5]/20 blur-[100px] pointer-events-none" />
      <div className="relative z-10">
        {/* Header - mobile only */}
        <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-sm lg:hidden">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-center relative">
            <BackButton />
            <Link href="/" className="block">
              <Image
                src="/images/logo-line.png"
                alt="MyFinishLine"
                width={957}
                height={489}
                className="h-5 sm:h-7 md:h-8 w-auto"
              />
            </Link>
          </div>
        </header>
        <PolicyPageTransition>{children}</PolicyPageTransition>
      </div>
      <ToastContainerClient />
    </div>
  );
}
