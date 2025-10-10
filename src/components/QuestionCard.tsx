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
      <div className="rounded-[50px] shadow-2xl p-6 sm:p-8 border-4 border-[var(--color-pink-light)] h-full flex flex-col justify-center" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="mb-6">
          <div className="flex justify-center items-center mb-3" style={{ gap: '128px' }}>
            <div className="bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] rounded-full px-6 py-2 shadow-lg">
              <span className="responsive-text-lg font-bold text-[var(--color-white)]">
                Question {questionNumber} / {totalQuestions}
              </span>
            </div>
            <div className="bg-gradient-to-r from-[var(--color-pink-light)] to-[var(--color-yellow-light)] rounded-full px-5 py-2 shadow-lg">
              <span className="responsive-text-lg font-bold text-[var(--color-black)]">
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-blue-light)] to-[var(--color-green-light)] transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center flex-1 flex items-center justify-center px-4">
          <p className="responsive-text-3xl font-bold text-[var(--color-black)]">{question}</p>
        </div>

        {/* ボタン */}
        <div className="flex justify-center mt-4" style={{ gap: '128px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick(false);
            }}
            className="responsive-text-2xl font-bold px-8 py-3 rounded-full border-4 border-[var(--color-pink-light)] text-[var(--color-pink-light)] bg-[var(--color-white)] hover:bg-[var(--color-pink-light)] hover:text-[var(--color-white)] transition-colors duration-200"
          >
            NO
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick(true);
            }}
            className="responsive-text-2xl font-bold px-8 py-3 rounded-full border-4 border-[var(--color-green-light)] text-[var(--color-green-light)] bg-[var(--color-white)] hover:bg-[var(--color-green-light)] hover:text-[var(--color-white)] transition-colors duration-200"
          >
            YES
          </button>
        </div>
      </div>

      {/* NOラベル - 右下に配置 */}
      <div
        className="absolute responsive-text-4xl font-black border-4 border-[var(--color-pink-light)] text-[var(--color-pink-light)] px-4 py-2 rotate-[-20deg] rounded-xl shadow-xl z-50"
        style={{
          bottom: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          opacity: (isDragging || isAnimating) && position.x < 0 ? Math.min(Math.abs(position.x) / 100, 1) : 0
        }}
      >
        NO
      </div>
      {/* YESラベル - 左下に配置 */}
      <div
        className="absolute responsive-text-4xl font-black border-4 border-[var(--color-green-light)] text-[var(--color-green-light)] px-4 py-2 rotate-[20deg] rounded-xl shadow-xl z-50"
        style={{
          bottom: '1rem',
          left: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          opacity: (isDragging || isAnimating) && position.x > 0 ? Math.min(position.x / 100, 1) : 0
        }}
      >
        YES
      </div>
    </div>
  );
}
