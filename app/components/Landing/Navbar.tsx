"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const logoImg = "/images/mfl-logo-new.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Amazonia Route", href: "#quest" },
    { name: "Challenges", href: "#challenges" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Blog", href: "#blog" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#2a3a6b]/40 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-[60px] md:h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={logoImg}
                alt="MyFinishLine"
                className="h-5 md:h-6 w-auto drop-shadow-md"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:text-white/80 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:text-white/80 transition-colors"
            >
              Sign in
            </Link>
            <a
              href="#level-up"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-white/20 backdrop-blur-xl border border-white/30 rounded-full hover:bg-white/30 transition-all drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            >
              Get started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-white hover:bg-white/20 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="px-4 py-3 text-base font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:bg-white/15 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-3 border-t border-white/20">
                <Link
                  href="/login"
                  className="mx-4 px-4 py-3 text-base font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl text-center hover:bg-white/25 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <a
                  href="#level-up"
                  className="mx-4 px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] border border-white/30 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
