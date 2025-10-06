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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[var(--color-pink-light)] via-[var(--color-yellow-light)] to-[var(--color-blue-light)]">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Your Type</h1>
          <p className="text-center text-gray-600 mb-8">
            50の質問であなたを16のタイプに分類します
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                ユーザー名を入力してください
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--color-blue-light)] focus:outline-none transition-colors"
                placeholder="例: Taro Yamada"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              診断を始める
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            ログイン不要・匿名で診断できます
          </p>
        </div>
      </div>
    </div>
  );
}
