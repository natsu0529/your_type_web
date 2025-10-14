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
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200 responsive-text-sm font-medium border border-gray-200"
      aria-label={t.exit.button}
    >
      {t.exit.button}
    </button>
  );
}
