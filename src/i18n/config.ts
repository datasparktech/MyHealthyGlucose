import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import hi from "./locales/hi/common.json";
import es from "./locales/es/common.json";

/**
 * Supported languages. Each entry is one JSON file of translated strings.
 * To add a language: create src/i18n/locales/<code>/common.json (copy en/
 * as a template), import it below, add it to `resources` and `LANGUAGES`.
 *
 * Coverage note: translations currently cover shared site chrome (nav,
 * footer, homepage hero) as a working proof of concept. Blog posts, guides,
 * and tool-specific copy are still English-only and are translated
 * incrementally — see docs/SETUP-i18n.md.
 */
export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "es", label: "Spanish", native: "Español" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      hi: { common: hi },
      es: { common: es },
    },
    fallbackLng: "en",
    defaultNS: "common",
    supportedLngs: LANGUAGES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      // Check a manual override first, then browser/OS language, then fall back to English
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "mhg-lang",
      caches: ["localStorage"],
    },
  });

export default i18n;
