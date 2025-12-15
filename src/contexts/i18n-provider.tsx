"use client";

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

type Locale = 'en' | 'ar';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  dir: 'ltr' | 'rtl';
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messages: { [key in Locale]: any } = {
  en: enMessages,
  ar: arMessages,
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && ['en', 'ar'].includes(storedLocale)) {
      setLocale(storedLocale);
    }
    setIsMounted(true);
  }, []);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (isMounted) {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
      localStorage.setItem('locale', locale);
    }
  }, [locale, dir, isMounted]);

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }): string => {
    const getNestedValue = (obj: any, path: string) =>
      path.split('.').reduce((acc, part) => acc && acc[part], obj);

    let translated = getNestedValue(messages[locale], key) || getNestedValue(messages.en, key) || key;

    if (replacements) {
        Object.keys(replacements).forEach(r_key => {
            translated = translated.replace(`{${r_key}}`, String(replacements[r_key]));
        });
    }
    
    return translated;
  }, [locale]);


  const value = { locale, setLocale, t, dir };

  if (!isMounted) {
    return null;
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}
