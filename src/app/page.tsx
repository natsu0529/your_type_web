'use client';

import { useState } from 'react';
import UsernameInput from '@/components/UsernameInput';
import CardStack from '@/components/CardStack';
import ActionButtons from '@/components/ActionButtons';
import ExitButton from '@/components/ExitButton';
import ExitConfirmDialog from '@/components/ExitConfirmDialog';
import { useLocale } from '@/contexts/LocaleContext';
import { questions, TOTAL_QUESTIONS } from '@/data/questions';
import { saveResponse, savePartialResponse } from '@/lib/saveResponse';
import { AnswerValue } from '@/types/response';
import { isSupabaseReady } from '@/lib/supabase';

type AppState = 'username' | 'questions' | 'saving' | 'exited';

export default function Home() {
  const { t, locale } = useLocale();
  const [state, setState] = useState<AppState>('username');
  const [username, setUsername] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleStart = (name: string) => {
    setUsername(name);
    setState('questions');
  };

  const handleAnswer = async (answer: boolean) => {
    // Yes=0, No=1に変換
    const answerValue = answer ? AnswerValue.YES : AnswerValue.NO;
    const newAnswers = [...answers, answerValue];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
      // 全質問完了 - データを保存
      setState('saving');

      const result = await saveResponse({
        username,
        locale,
        answers: newAnswers,
        exitAtQuestion: 51, // 完了時は51
      });

      if (result.success) {
        setState('exited'); // 完了時も感謝画面を表示
      } else {
        setSaveError(result.error || '保存に失敗しました');
        setState('exited');
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleExitClick = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirm = async () => {
    setShowExitDialog(false);
    setState('saving');

    // 現在の質問番号（1-indexed）
    const exitAtQuestion = currentQuestionIndex + 1;

    // 部分的な回答を保存
    const result = await savePartialResponse(
      username,
      locale,
      answers,
      exitAtQuestion
    );

    if (result.success) {
      setState('exited');
    } else {
      setSaveError(result.error || '保存に失敗しました');
      setState('exited');
    }
  };

  const handleExitCancel = () => {
    setShowExitDialog(false);
  };

  const handleRestart = () => {
    setState('username');
    setUsername('');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSaveError(null);
  };

  if (state === 'username') {
    return (
      <>
        {!isSupabaseReady() && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg z-50 max-w-md text-center">
            ⚠️ Supabase未設定（SETUP_GUIDE.md参照）
          </div>
        )}
        <UsernameInput onStart={handleStart} />
      </>
    );
  }

  if (state === 'saving') {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="responsive-text-xl text-[var(--color-white)]">
            {t.app.saving || '保存中...'}
          </p>
        </div>
      </div>
    );
  }

  if (state === 'exited') {
    return (
      <div className="h-screen w-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="responsive-text-3xl font-bold text-[var(--color-white)] mb-4">
            {t.exit.thankYou || 'ご協力ありがとうございました'}
          </h1>
          <p className="responsive-text-base text-[var(--color-white)] mb-6">
            {t.exit.thankYouMessage || 'あなたの回答は正常に保存されました。'}
          </p>
          {saveError && (
            <p className="responsive-text-sm text-red-400 mb-4">
              {saveError}
            </p>
          )}
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-white)] rounded-lg hover:opacity-90 transition-opacity duration-200 responsive-text-base font-medium"
          >
            {t.exit.restartButton || 'もう一度始める'}
          </button>
        </div>
      </div>
    );
  }

  // 質問画面
  return (
    <>
      <ExitButton onClick={handleExitClick} />
      <ExitConfirmDialog
        isOpen={showExitDialog}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />

      <div className="h-screen w-screen overflow-hidden flex flex-col py-4">
        <div className="container mx-auto flex-1 flex flex-col justify-between">
          <div className="text-center">
            <h1 className="responsive-text-3xl font-bold text-[var(--color-white)] mb-1">{t.app.title}</h1>
            <p className="responsive-text-4xl font-black text-[var(--color-black)] drop-shadow-lg">
              {username} {locale === 'ja' ? 'さん' : ''}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <CardStack
              questions={questions.slice(currentQuestionIndex, currentQuestionIndex + 3).map(q => ({
                id: q.id,
                text: locale === 'ja' ? q.ja : q.en,
              }))}
              startQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={TOTAL_QUESTIONS}
              onComplete={() => {
                // CardStackからの回答は使わず、ActionButtonsで処理
              }}
            />
          </div>

          <div className="space-y-2">
            <ActionButtons
              onNo={async () => await handleAnswer(false)}
              onYes={async () => await handleAnswer(true)}
            />

            <div className="text-center">
              <p className="text-[var(--color-white)] responsive-text-sm">
                {t.app.swipeInstruction}
              </p>
              <p className="text-[var(--color-white)] responsive-text-xs opacity-75 mt-1">
                {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
