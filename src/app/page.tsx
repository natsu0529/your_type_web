'use client';

import { useState } from 'react';
import UsernameInput from '@/components/UsernameInput';
import CardStack from '@/components/CardStack';
import ActionButtons from '@/components/ActionButtons';
import ProgressBar from '@/components/ProgressBar';
import ResultPage from '@/components/ResultPage';

// 仮の質問データ（50問）
const SAMPLE_QUESTIONS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  text: `これは質問 ${i + 1} です。あなたはこの状況に当てはまりますか？`,
}));

type AppState = 'username' | 'questions' | 'result';

export default function Home() {
  const [state, setState] = useState<AppState>('username');
  const [username, setUsername] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [resultType, setResultType] = useState('');

  const handleStart = (name: string) => {
    setUsername(name);
    setState('questions');
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 >= SAMPLE_QUESTIONS.length) {
      // 全質問完了 - 仮の結果タイプを設定
      const types = [
        'INTJ', 'INTP', 'ENTJ', 'ENTP',
        'INFJ', 'INFP', 'ENFJ', 'ENFP',
        'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
        'ISTP', 'ISFP', 'ESTP', 'ESFP',
      ];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setResultType(randomType);
      setState('result');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestart = () => {
    setState('username');
    setUsername('');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResultType('');
  };

  if (state === 'username') {
    return <UsernameInput onStart={handleStart} />;
  }

  if (state === 'result') {
    return <ResultPage username={username} type={resultType} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-pink-light)] via-[var(--color-yellow-light)] to-[var(--color-blue-light)] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Your Type</h1>
        <p className="text-center text-white mb-8">{username} さん</p>

        <ProgressBar current={currentQuestionIndex + 1} total={SAMPLE_QUESTIONS.length} />

        <CardStack
          questions={SAMPLE_QUESTIONS.slice(currentQuestionIndex, currentQuestionIndex + 3)}
          onComplete={(stackAnswers) => {
            // CardStackから返された回答を処理
            stackAnswers.forEach((answer) => handleAnswer(answer));
          }}
        />

        <ActionButtons
          onNo={() => handleAnswer(false)}
          onYes={() => handleAnswer(true)}
        />

        <div className="text-center mt-8">
          <p className="text-white text-sm">
            左にスワイプ = No / 右にスワイプ = Yes
          </p>
        </div>
      </div>
    </div>
  );
}
