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

  const rotation = position.x * 0.1;

  return (
    <div
      className="absolute w-full max-w-md touch-none select-none cursor-grab active:cursor-grabbing"
      style={{
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
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[var(--color-pink-light)]">
        <div className="text-center mb-6">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} / {totalQuestions}
          </span>
        </div>

        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-gray-800">{question}</p>
        </div>

        {isDragging && (
          <div className="flex justify-between items-center">
            <div
              className="transition-opacity"
              style={{ opacity: position.x < 0 ? Math.abs(position.x) / 100 : 0 }}
            >
              <span className="text-4xl font-bold text-[var(--color-pink-light)]">NO</span>
            </div>
            <div
              className="transition-opacity"
              style={{ opacity: position.x > 0 ? position.x / 100 : 0 }}
            >
              <span className="text-4xl font-bold text-[var(--color-green-light)]">YES</span>
            </div>
          </div>
        )}
      </div>

      {isDragging && (
        <>
          <div
            className="absolute top-4 left-4 text-6xl font-black border-4 border-[var(--color-pink-light)] text-[var(--color-pink-light)] px-4 py-2 rotate-[-20deg]"
            style={{ opacity: position.x < 0 ? Math.abs(position.x) / 100 : 0 }}
          >
            NO
          </div>
          <div
            className="absolute top-4 right-4 text-6xl font-black border-4 border-[var(--color-green-light)] text-[var(--color-green-light)] px-4 py-2 rotate-[20deg]"
            style={{ opacity: position.x > 0 ? position.x / 100 : 0 }}
          >
            YES
          </div>
        </>
      )}
    </div>
  );
}
