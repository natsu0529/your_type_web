/**
 * 離脱ボタンコンポーネント
 */

'use client';

import { useLocale } from '@/contexts/LocaleContext';

interface ExitButtonProps {
  onClick: () => void;
}

export default function ExitButton({ onClick }: ExitButtonProps) {
  const { t } = useLocale();

  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-50 px-6 py-3 bg-white text-gray-800 rounded-xl shadow-lg hover:bg-gray-100 transition-colors duration-200 text-base font-bold border-2 border-gray-300"
      aria-label={t.exit.button}
    >
      {t.exit.button}
    </button>
  );
}
