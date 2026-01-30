import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BackButton from "../components/Shared/BackButton/BackButton";
import PolicyPageTransition from "../components/Shared/PolicyPageTransition/PolicyPageTransition";
import "../globals.css";

export const metadata: Metadata = {
  title: "MyFinishLine",
  description: "Combine sports and pleasure",
};

export default function WithoutHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(to bottom,
        #5170D5 0%,
        #5575D5 8%,
        #5A7AD6 15%,
        #6080D6 22%,
        #6888D4 28%,
        #7090D0 34%,
        #7A9BC8 40%,
        #85A6C4 46%,
        #8FAEC0 52%,
        #99B6BC 58%,
        #A3BEB8 64%,
        #ADC6B4 70%,
        #B7CEB0 76%,
        #C1D6AC 82%,
        #CBDEA8 88%,
        #CEE9D8 100%
      )`
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/30 shadow-sm">
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
  );
}
