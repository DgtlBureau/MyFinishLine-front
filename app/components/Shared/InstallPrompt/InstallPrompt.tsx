"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "pwa-install-dismissed";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if ((navigator as any).standalone) return;

    // Don't show if dismissed this session
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768;
    if (!isMobile || !isSmallScreen) return;

    setDismissed(false);

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isSafari = /Safari/i.test(navigator.userAgent) && !/CriOS|FxiOS|Chrome/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      setShowIOSPrompt(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      handleDismiss();
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setClosing(true);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem(DISMISSED_KEY, "1");
    }, 400);
  };

  if (dismissed || (!deferredPrompt && !showIOSPrompt)) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-400 ${
        closing ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-sm mx-auto bg-white/25 backdrop-blur-2xl backdrop-saturate-200 border border-white/40 rounded-2xl shadow-2xl shadow-black/10 pl-0 pr-4 py-0 flex items-stretch gap-3 overflow-hidden">
        <Image
          src="/icons/icon-192x192.png"
          width={96}
          height={96}
          alt="MyFinishLine"
          className="w-auto h-full aspect-square rounded-l-2xl shrink-0 object-cover"
        />
        <div className="flex-1 min-w-0 py-5">
          <p className="font-semibold text-white text-base drop-shadow-sm">MyFinishLine</p>
          {showIOSPrompt ? (
            <p className="text-sm text-white/60 mt-1">
              Tap <Share className="inline w-4 h-4 -mt-0.5 text-blue-500" /> then{" "}
              <span className="font-medium">&quot;Add to Home Screen&quot;</span>
            </p>
          ) : (
            <p className="text-sm text-white/60 mt-1">
              Add to your home screen for quick access
            </p>
          )}
        </div>
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="shrink-0 bg-gradient-to-r from-[#3B5CC6] to-[#4DA67A] text-white text-base font-semibold px-5 py-3 rounded-xl"
          >
            Install
          </button>
        )}
        <button
          onClick={handleDismiss}
          className="shrink-0 p-2 text-white/50 hover:text-white/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
