-- =====================================================
-- Your Type - Responses Table Creation Script
-- =====================================================
-- このSQLをSupabase SQL EditorまたはSupabase CLIで実行してください
--
-- テーブル構造:
-- - q1 ~ q50: 質問1-50の回答（0=Yes, 1=No, null=未回答）
-- - exit_at_question: 離脱した質問番号（完了時は51）
-- =====================================================

-- responsesテーブルの作成
CREATE TABLE responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  locale TEXT NOT NULL,
  q1 INTEGER,
  q2 INTEGER,
  q3 INTEGER,
  q4 INTEGER,
  q5 INTEGER,
  q6 INTEGER,
  q7 INTEGER,
  q8 INTEGER,
  q9 INTEGER,
  q10 INTEGER,
  q11 INTEGER,
  q12 INTEGER,
  q13 INTEGER,
  q14 INTEGER,
  q15 INTEGER,
  q16 INTEGER,
  q17 INTEGER,
  q18 INTEGER,
  q19 INTEGER,
  q20 INTEGER,
  q21 INTEGER,
  q22 INTEGER,
  q23 INTEGER,
  q24 INTEGER,
  q25 INTEGER,
  q26 INTEGER,
  q27 INTEGER,
  q28 INTEGER,
  q29 INTEGER,
  q30 INTEGER,
  q31 INTEGER,
  q32 INTEGER,
  q33 INTEGER,
  q34 INTEGER,
  q35 INTEGER,
  q36 INTEGER,
  q37 INTEGER,
  q38 INTEGER,
  q39 INTEGER,
  q40 INTEGER,
  q41 INTEGER,
  q42 INTEGER,
  q43 INTEGER,
  q44 INTEGER,
  q45 INTEGER,
  q46 INTEGER,
  q47 INTEGER,
  q48 INTEGER,
  q49 INTEGER,
  q50 INTEGER,
  exit_at_question INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成（パフォーマンス向上）
CREATE INDEX idx_responses_created_at ON responses(created_at);
CREATE INDEX idx_responses_exit_at_question ON responses(exit_at_question);
CREATE INDEX idx_responses_locale ON responses(locale);

-- RLS（Row Level Security）の設定
-- データ収集のみなので、INSERTのみ許可
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- データ分析用のビュー（離脱率計算）
CREATE VIEW exit_rate_by_question AS
SELECT
  exit_at_question,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM responses), 2) as percentage
FROM responses
GROUP BY exit_at_question
ORDER BY exit_at_question;

-- =====================================================
-- 実行後の確認コマンド
-- =====================================================
-- テーブルが作成されたか確認:
-- SELECT * FROM responses LIMIT 1;
--
-- ビューが作成されたか確認:
-- SELECT * FROM exit_rate_by_question;
-- =====================================================
