'use client';

import { useState } from 'react';
import QuestionCard from './QuestionCard';

interface Question {
  id: number;
  text: string;
}

interface CardStackProps {
  questions: Question[];
  onComplete: (answers: boolean[]) => void;
}

export default function CardStack({ questions, onComplete }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleSwipe = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      onComplete(newAnswers);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const visibleCards = questions.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ height: 'clamp(300px, 55vh, 500px)' }}>
      {visibleCards.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question.text}
          questionNumber={currentIndex + index + 1}
          totalQuestions={questions.length}
          onSwipe={index === 0 ? handleSwipe : () => {}}
          zIndex={visibleCards.length - index}
          offset={index}
        />
      ))}
    </div>
  );
}
