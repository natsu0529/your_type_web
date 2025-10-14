/**
 * 回答データの型定義
 */

/**
 * Supabaseに保存する回答データの型
 * q1-q50: 質問への回答（0=Yes, 1=No, null=未回答）
 * exit_at_question: 離脱した質問番号（完了時は51）
 */
export interface ResponseData {
  username: string;
  locale: string;
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: number | null;
  q10: number | null;
  q11: number | null;
  q12: number | null;
  q13: number | null;
  q14: number | null;
  q15: number | null;
  q16: number | null;
  q17: number | null;
  q18: number | null;
  q19: number | null;
  q20: number | null;
  q21: number | null;
  q22: number | null;
  q23: number | null;
  q24: number | null;
  q25: number | null;
  q26: number | null;
  q27: number | null;
  q28: number | null;
  q29: number | null;
  q30: number | null;
  q31: number | null;
  q32: number | null;
  q33: number | null;
  q34: number | null;
  q35: number | null;
  q36: number | null;
  q37: number | null;
  q38: number | null;
  q39: number | null;
  q40: number | null;
  q41: number | null;
  q42: number | null;
  q43: number | null;
  q44: number | null;
  q45: number | null;
  q46: number | null;
  q47: number | null;
  q48: number | null;
  q49: number | null;
  q50: number | null;
  exit_at_question: number;
}

/**
 * 回答の値
 * YES: 0
 * NO: 1
 */
export enum AnswerValue {
  YES = 0,
  NO = 1,
}

/**
 * 回答データを保存する関数のパラメータ
 */
export interface SaveResponseParams {
  username: string;
  locale: string;
  answers: (number | null)[];
  exitAtQuestion: number;
}

/**
 * 保存結果
 */
export interface SaveResponseResult {
  success: boolean;
  error?: string;
  data?: {
    id: string;
  };
}
