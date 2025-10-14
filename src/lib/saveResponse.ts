/**
 * 回答データをSupabaseに保存する関数
 */

import { supabase, isSupabaseReady, getSupabaseSetupMessage } from './supabase';
import type { SaveResponseParams, SaveResponseResult, ResponseData } from '@/types/response';

/**
 * 回答データをSupabaseのresponsesテーブルに保存
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
    // Supabaseの設定チェック
    if (!isSupabaseReady() || !supabase) {
      console.warn('Supabaseが設定されていません');
      console.log(getSupabaseSetupMessage());
      return {
        success: false,
        error: 'Supabaseが設定されていません。SETUP_GUIDE.mdを参照してください。',
      };
    }

    // 回答配列をq1-q50のオブジェクトに変換
    const responseData: Partial<ResponseData> = {
      username,
      locale,
      exit_at_question: exitAtQuestion,
    };

    // 50問分のデータを動的に設定
    for (let i = 0; i < 50; i++) {
      const questionKey = `q${i + 1}` as keyof ResponseData;
      const answer = answers[i];
      // @ts-expect-error - 動的なプロパティ割り当て
      responseData[questionKey] = answer !== undefined ? answer : null;
    }

    // Supabaseにデータを挿入
    const { data, error } = await supabase
      .from('responses')
      .insert([responseData])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase保存エラー:', error);
      return {
        success: false,
        error: `データの保存に失敗しました: ${error.message}`,
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
      },
    };
  } catch (error) {
    console.error('予期しないエラー:', error);
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
