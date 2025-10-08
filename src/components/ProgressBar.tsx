interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-2">
      <div className="flex justify-between mb-1">
        <span className="responsive-text-xs font-medium text-white">
          {current} / {total}
        </span>
        <span className="responsive-text-xs font-medium text-white">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
