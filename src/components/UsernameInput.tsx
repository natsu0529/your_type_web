'use client';

import { useState } from 'react';

interface UsernameInputProps {
  onStart: (username: string) => void;
}

export default function UsernameInput({ onStart }: UsernameInputProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onStart(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--color-pink-light)] via-[var(--color-yellow-light)] to-[var(--color-blue-light)] p-4">
      <div className="w-full max-w-lg">
        {/* メインカード */}
        <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] shadow-2xl p-8 sm:p-12 border-4 border-white">
          {/* ヘッダーセクション */}
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-blue-light)] via-[var(--color-green-light)] to-[var(--color-pink-light)] mb-4 tracking-tight">
              Your Type
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 font-medium mb-2">
              あなたは、どのタイプ？
            </p>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-yellow-light)] to-[var(--color-pink-light)] px-6 py-2 rounded-full">
              <span className="text-sm font-bold text-gray-800">5つの質問</span>
              <span className="text-gray-600">•</span>
              <span className="text-sm font-bold text-gray-800">1つのタイプ</span>
            </div>
          </div>

          {/* フォームセクション */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="username" className="block text-base font-bold text-gray-800 mb-3 text-center">
                まずは、あなたの名前を教えてください
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-2/3 md:w-80 px-6 py-2.5 border-3 border-gray-200 rounded-[20px] focus:border-[var(--color-blue-light)] focus:ring-4 focus:ring-[var(--color-blue-light)]/20 focus:outline-none transition-all text-lg font-medium text-center shadow-sm"
                placeholder="山田 太郎"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-2/3 md:w-80 bg-gradient-to-r from-[var(--color-blue-light)] via-[var(--color-green-light)] to-[var(--color-blue-light)] bg-[length:200%_100%] text-white font-black text-lg py-3 rounded-[20px] shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-right"
              >
                診断をスタート ✨
              </button>
            </div>
          </form>

          {/* フッターセクション */}
          <div className="mt-8 text-center">
            <img src="/your_type_img.svg" alt="Your Type" className="h-12 w-12 mx-auto" />
          </div>
        </div>

        {/* 装飾的な要素 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/80 font-medium">
            スワイプで簡単に答えられます 👆
          </p>
        </div>
      </div>
    </div>
  );
}
