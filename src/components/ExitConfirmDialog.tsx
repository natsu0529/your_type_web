/**
 * 離脱確認ダイアログコンポーネント
 */

'use client';

import { useLocale } from '@/contexts/LocaleContext';

interface ExitConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitConfirmDialog({ isOpen, onConfirm, onCancel }: ExitConfirmDialogProps) {
  const { t } = useLocale();

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 p-4"
      style={{ position: 'fixed' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {t.exit.confirmTitle}
        </h2>
        <p className="text-base text-gray-700 mb-8 text-center">
          {t.exit.confirmMessage}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-base font-medium order-2 sm:order-1"
          >
            {t.exit.cancelButton}
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-base font-medium order-1 sm:order-2"
          >
            {t.exit.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
}
