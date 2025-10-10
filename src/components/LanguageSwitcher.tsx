'use client';

import { useLocale } from '@/contexts/LocaleContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLocale(locale === 'ja' ? 'en' : 'ja')}
        className="bg-[var(--color-white)] border-2 border-[var(--color-blue-light)] rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 font-bold text-[var(--color-black)] responsive-text-sm"
      >
        {locale === 'ja' ? 'EN' : 'JP'}
      </button>
    </div>
  );
}
