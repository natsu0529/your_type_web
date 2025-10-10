'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import jaTranslations from '@/locales/ja.json';
import enTranslations from '@/locales/en.json';

type Locale = 'ja' | 'en';

type Translations = typeof jaTranslations;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations: Record<Locale, Translations> = {
  ja: jaTranslations,
  en: enTranslations,
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ja');

  const value: LocaleContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
