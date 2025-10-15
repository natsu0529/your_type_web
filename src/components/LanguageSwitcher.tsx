'use client';

import { useLocale } from '@/contexts/LocaleContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div style={{ position: 'fixed', top: '5rem', right: '1rem', left: 'auto' }} className="z-50">
      <div className="flex gap-2">
        <button
          onClick={() => setLocale('ja')}
          className={`px-6 py-3 rounded-xl font-bold text-base transition-all shadow-lg ${
            locale === 'ja'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          🇯🇵 日本語
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`px-6 py-3 rounded-xl font-bold text-base transition-all shadow-lg ${
            locale === 'en'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          🇬🇧 English
        </button>
      </div>
    </div>
  );
}
