"use client";

import { useState, useEffect, useCallback } from "react";

export type Language = "en" | "ru" | "es" | "pt" | "fr";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
];

const LANGUAGE_KEY = "app-language";

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (stored && languages.some((l) => l.code === stored)) {
      setLanguageState(stored);
    }
    setIsLoading(false);
  }, []);

  const setLanguage = useCallback(async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);

    // Update HTML lang attribute
    document.documentElement.lang = newLanguage;

    return true;
  }, []);

  const getCurrentLanguage = useCallback(() => {
    return languages.find((l) => l.code === language) || languages[0];
  }, [language]);

  return {
    language,
    setLanguage,
    getCurrentLanguage,
    languages,
    isLoading,
  };
};
