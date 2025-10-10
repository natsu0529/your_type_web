'use client';

import { useState } from 'react';
import UsernameInput from '@/components/UsernameInput';
import CardStack from '@/components/CardStack';
import ActionButtons from '@/components/ActionButtons';
import ResultPage from '@/components/ResultPage';
import { useLocale } from '@/contexts/LocaleContext';

// 仮の質問データ（5問でテスト）
const SAMPLE_QUESTIONS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  text: `質問${i + 1}`,
}));

type AppState = 'username' | 'questions' | 'result';

export default function Home() {
  const { t, locale } = useLocale();
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
      // 全質問完了 - 固定の結果タイプを設定
      setResultType('サンプルタイプ');
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
    <div className="h-screen w-screen overflow-hidden flex flex-col py-4">
      <div className="container mx-auto px-8 sm:px-16 flex-1 flex flex-col justify-between">
        <div className="text-center">
          <h1 className="responsive-text-3xl font-bold text-[var(--color-white)] mb-1">{t.app.title}</h1>
          <p className="responsive-text-4xl font-black text-[var(--color-black)] drop-shadow-lg">
            {username} {locale === 'ja' ? 'さん' : ''}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <CardStack
            questions={SAMPLE_QUESTIONS.slice(currentQuestionIndex, currentQuestionIndex + 3)}
            startQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={SAMPLE_QUESTIONS.length}
            onComplete={(stackAnswers) => {
              // CardStackから返された回答を処理
              stackAnswers.forEach((answer) => handleAnswer(answer));
            }}
          />
        </div>

        <div className="space-y-2">
          <ActionButtons
            onNo={() => handleAnswer(false)}
            onYes={() => handleAnswer(true)}
          />

          <div className="text-center">
            <p className="text-[var(--color-white)] responsive-text-sm">
              {t.app.swipeInstruction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
