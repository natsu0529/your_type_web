'use client';

interface ActionButtonsProps {
  onNo: () => void;
  onYes: () => void;
}

export default function ActionButtons({ onNo, onYes }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      <button
        onClick={onNo}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-[var(--color-pink-light)] shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
        aria-label="No"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--color-pink-light)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={onYes}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-[var(--color-green-light)] shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
        aria-label="Yes"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--color-green-light)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
  );
}
