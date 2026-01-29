"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { translations, TranslationKeys } from "@/app/i18n";

export type Language = "en" | "ru" | "es" | "pt" | "fr";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const languageOptions: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
];

const LANGUAGE_KEY = "app-language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  getCurrentLanguage: () => LanguageOption;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY) as Language | null;
    if (stored && languageOptions.some((l) => l.code === stored)) {
      setLanguageState(stored);
      document.documentElement.lang = stored;
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
    document.documentElement.lang = newLanguage;
  }, []);

  const getCurrentLanguage = useCallback(() => {
    return languageOptions.find((l) => l.code === language) || languageOptions[0];
  }, [language]);

  const t = translations[language];

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getCurrentLanguage,
        languages: languageOptions,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
