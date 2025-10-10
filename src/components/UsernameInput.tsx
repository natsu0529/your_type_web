'use client';

import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

interface UsernameInputProps {
  onStart: (username: string) => void;
}

export default function UsernameInput({ onStart }: UsernameInputProps) {
  const { t } = useLocale();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStart(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <div className="w-full max-w-2xl flex items-center justify-center px-8 sm:px-16">
        {/* メインカード */}
        <div className="rounded-[2.5rem] shadow-2xl responsive-p-8 border-4 border-[var(--color-black)] w-full flex flex-col gap-4 overflow-hidden">
          {/* ヘッダーセクション */}
          <div className="text-center mb-4">
            <h1 className="responsive-text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-light)] via-[var(--color-green-light)] to-[var(--color-pink-light)] mb-2 tracking-tight">
              {t.usernameInput.title}
            </h1>

            <p className="responsive-text-lg text-gray-600 font-medium mb-2">
              {t.usernameInput.subtitle}
            </p>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-yellow-light)] to-[var(--color-pink-light)] px-4 py-1.5 rounded-full">
              <span className="responsive-text-xs font-bold text-[var(--color-black)]">{t.usernameInput.questionCount}</span>
              <span className="text-gray-600">•</span>
              <span className="responsive-text-xs font-bold text-[var(--color-black)]">{t.usernameInput.typeCount}</span>
            </div>
          </div>

          {/* フォームセクション */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <label htmlFor="username" className="block responsive-text-sm font-bold text-[var(--color-black)] mb-2 text-center">
                {t.usernameInput.inputLabel}
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-2/3 md:w-80 px-4 py-2 border-3 border-gray-200 rounded-[20px] focus:border-[var(--color-blue-light)] focus:ring-4 focus:ring-[var(--color-blue-light)]/20 focus:outline-none transition-all responsive-text-base font-medium text-center shadow-sm"
                placeholder={t.usernameInput.inputPlaceholder}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-2/3 md:w-80 bg-gradient-to-r from-[var(--color-blue-light)] via-[var(--color-green-light)] to-[var(--color-blue-light)] bg-[length:200%_100%] text-[var(--color-white)] font-black responsive-text-base py-2.5 rounded-[20px] shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-right"
              >
                {t.usernameInput.startButton}
              </button>
            </div>
          </form>

          {/* フッターセクション */}
          <div className="flex justify-center items-center flex-shrink-0">
            <img src="/your_type_img.svg" alt="Your Type" className="responsive-size-logo max-w-full object-contain" />
          </div>

          {/* 装飾的な要素 */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-blue-light)]/30 via-[var(--color-green-light)]/30 to-[var(--color-pink-light)]/30 px-4 py-2 rounded-[20px] border-2 border-[var(--color-blue-light)]/50 shadow-md">
              <span className="responsive-text-sm font-bold text-gray-700">{t.usernameInput.swipeHint}</span>
              <span className="text-xl">👆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
