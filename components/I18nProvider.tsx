"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale, Translations } from "@/lib/types";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  translations,
}: PropsWithChildren<{ translations: Translations }>) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("alfamito_locale");
    if (storedLocale === "fr" || storedLocale === "pt") {
      setLocaleState(storedLocale);
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    function setLocale(nextLocale: Locale) {
      setLocaleState(nextLocale);
      window.localStorage.setItem("alfamito_locale", nextLocale);
      document.documentElement.lang = nextLocale === "pt" ? "pt-BR" : "fr";
    }

    function t(key: string) {
      return translations[locale][key] ?? translations.fr[key] ?? key;
    }

    return { locale, setLocale, t };
  }, [locale, translations]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
