import { en, TranslationKeys } from "./translations/en";
import { ru } from "./translations/ru";
import { es } from "./translations/es";
import { pt } from "./translations/pt";
import { fr } from "./translations/fr";
import { Language } from "@/app/hooks/useLanguage";

export const translations: Record<Language, TranslationKeys> = {
  en,
  ru,
  es,
  pt,
  fr,
};

export type { TranslationKeys };
