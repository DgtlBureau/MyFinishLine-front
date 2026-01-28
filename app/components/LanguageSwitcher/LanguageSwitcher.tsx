"use client";

import { useI18n } from "@/app/lib/i18n/context";
import { Locale, locales } from "@/app/lib/i18n/config";

const languageNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
};

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {languageNames[loc]}
        </option>
      ))}
    </select>
  );
}
