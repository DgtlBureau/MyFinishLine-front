"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const logoImg = "/images/mfl-logo-new.png";

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
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-[60px] md:h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={logoImg}
                alt="MyFinishLine"
                className="h-5 md:h-6 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-[#09090b] hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#09090b] hover:text-black transition-colors"
            >
              Sign in
            </Link>
            <a
              href="#level-up"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#18181b] rounded-full hover:bg-[#27272a] transition-colors"
            >
              Get started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#09090b] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-2 border-t border-gray-100">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#09090b]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <a
                  href="#level-up"
                  className="mx-4 px-4 py-2 text-sm font-medium text-white bg-[#18181b] rounded-full text-center"
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
