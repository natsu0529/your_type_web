'use client';

import { useState } from 'react';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onSwipe: (answer: boolean) => void;
  zIndex?: number;
  offset?: number;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onSwipe,
  zIndex = 0,
  offset = 0,
}: QuestionCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = 100;

    if (Math.abs(position.x) > threshold) {
      const answer = position.x > 0;
      onSwipe(answer);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newX = touch.clientX - startPos.x;
    const newY = touch.clientY - startPos.y;
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 100;

    if (Math.abs(position.x) > threshold) {
      const answer = position.x > 0;
      onSwipe(answer);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleButtonClick = (answer: boolean) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const targetX = answer ? 300 : -300;
    setPosition({ x: targetX, y: 0 });

    setTimeout(() => {
      onSwipe(answer);
      setIsAnimating(false);
    }, 300);
  };

  const rotation = position.x * 0.1;

  return (
    <div
      className="absolute w-full max-w-lg mx-auto touch-none select-none cursor-grab active:cursor-grabbing"
      style={{
        height: 'clamp(300px, 55vh, 500px)',
        transform: `translateX(${position.x}px) translateY(${position.y + offset * 10}px) rotate(${rotation}deg) scale(${1 - offset * 0.05})`,
        zIndex,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white/100 rounded-[50px] shadow-2xl p-6 sm:p-8 border-4 border-[var(--color-pink-light)] h-full flex flex-col justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center mb-3">
          <span className="responsive-text-sm font-medium text-gray-500">
            Question {questionNumber} / {totalQuestions}
          </span>
        </div>

        <div className="text-center flex-1 flex items-center justify-center px-4">
          <p className="responsive-text-3xl font-bold text-gray-800">{question}</p>
        </div>

        {/* ボタン */}
        <div className="flex justify-center mt-4" style={{ gap: '128px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick(false);
            }}
            className="responsive-text-2xl font-bold px-8 py-3 rounded-full border-4 border-[var(--color-pink-light)] text-[var(--color-pink-light)] bg-white hover:bg-[var(--color-pink-light)] hover:text-white transition-colors duration-200"
          >
            NO
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick(true);
            }}
            className="responsive-text-2xl font-bold px-8 py-3 rounded-full border-4 border-[var(--color-green-light)] text-[var(--color-green-light)] bg-white hover:bg-[var(--color-green-light)] hover:text-white transition-colors duration-200"
          >
            YES
          </button>
        </div>
      </div>

      {/* NOラベル - 右下に配置 */}
      <div
        className="absolute responsive-text-4xl font-black border-4 border-[var(--color-pink-light)] text-[var(--color-pink-light)] bg-white/90 px-4 py-2 rotate-[-20deg] rounded-xl shadow-xl z-50"
        style={{
          bottom: '1rem',
          right: '1rem',
          opacity: (isDragging || isAnimating) && position.x < 0 ? Math.min(Math.abs(position.x) / 100, 1) : 0
        }}
      >
        NO
      </div>
      {/* YESラベル - 左下に配置 */}
      <div
        className="absolute responsive-text-4xl font-black border-4 border-[var(--color-green-light)] text-[var(--color-green-light)] bg-white/90 px-4 py-2 rotate-[20deg] rounded-xl shadow-xl z-50"
        style={{
          bottom: '1rem',
          left: '1rem',
          opacity: (isDragging || isAnimating) && position.x > 0 ? Math.min(position.x / 100, 1) : 0
        }}
      >
        YES
      </div>
    </div>
  );
}
