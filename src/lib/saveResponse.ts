/**
 * 回答データをFirebaseに保存する関数
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestoreDB, isFirebaseReady, getFirebaseSetupMessage } from './firebase';
import type { SaveResponseParams, SaveResponseResult, ResponseData } from '@/types/response';

/**
 * 回答データをFirestoreのresponsesコレクションに保存
 *
 * @param params - 保存パラメータ
 * @param params.username - ユーザー名
 * @param params.locale - 言語設定 (ja/en)
 * @param params.answers - 回答配列 (0=Yes, 1=No, null=未回答)
 * @param params.exitAtQuestion - 離脱した質問番号 (完了時は51)
 * @returns 保存結果
 */
export async function saveResponse({
  username,
  locale,
  answers,
  exitAtQuestion,
}: SaveResponseParams): Promise<SaveResponseResult> {
  try {
    // Firebaseの設定チェック
    const db = getFirestoreDB();
    if (!isFirebaseReady() || !db) {
      console.warn('Firebaseが設定されていません');
      console.log(getFirebaseSetupMessage());
      return {
        success: false,
        error: 'Firebaseが設定されていません。SETUP_GUIDE.mdを参照してください。',
      };
    }

    // 回答配列をq1-q50のオブジェクトに変換
    const responseData: Partial<ResponseData> & { created_at?: unknown } = {
      username,
      locale,
      exit_at_question: exitAtQuestion,
      created_at: serverTimestamp(),
    };

    // 50問分のデータを動的に設定
    for (let i = 0; i < 50; i++) {
      const questionKey = `q${i + 1}` as keyof ResponseData;
      const answer = answers[i];
      // @ts-expect-error - 動的なプロパティ割り当て
      responseData[questionKey] = answer !== undefined ? answer : null;
    }

    // Firestoreにデータを追加
    const docRef = await addDoc(collection(db, 'responses'), responseData);

    return {
      success: true,
      data: {
        id: docRef.id,
      },
    };
  } catch (error) {
    console.error('Firebase保存エラー:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '不明なエラーが発生しました',
    };
  }
}

/**
 * 離脱時の回答データを保存
 * 現在の回答までを保存し、残りはnullで埋める
 *
 * @param username - ユーザー名
 * @param locale - 言語設定
 * @param answers - 現在までの回答配列
 * @param exitAtQuestion - 離脱した質問番号
 */
export async function savePartialResponse(
  username: string,
  locale: string,
  answers: (number | null)[],
  exitAtQuestion: number
): Promise<SaveResponseResult> {
  // 50問分の配列を作成（未回答部分はnull）
  const fullAnswers: (number | null)[] = Array(50).fill(null);

  // 回答済みの部分をコピー
  for (let i = 0; i < answers.length && i < 50; i++) {
    fullAnswers[i] = answers[i];
  }

  return saveResponse({
    username,
    locale,
    answers: fullAnswers,
    exitAtQuestion,
  });
}
