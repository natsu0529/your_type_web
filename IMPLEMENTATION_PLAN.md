# Your Type データ収集フォーム 実装計画

## プロジェクト概要
- **目的**: 性格分類アルゴリズムのための機械学習データ収集
- **機能**: 50問の質問に対する回答とユーザー離脱率の計測
- **バックエンド**: Supabase（直接接続、認証なし）
- **将来の拡張**: FastAPIでアルゴリズムを実装予定

---

## データベース設計

### Supabaseテーブル: `responses`

| カラム名 | 型 | 説明 |
|---------|-----|------|
| `id` | uuid | 主キー（自動生成） |
| `username` | text | ユーザー名 |
| `locale` | text | 言語設定（ja/en） |
| `q1` ~ `q50` | integer | 質問1-50の回答（0=Yes, 1=No, null=未回答） |
| `exit_at_question` | integer | 離脱した質問番号（完了時は51） |
| `created_at` | timestamp | 回答日時（自動生成） |

### データフロー
```
ユーザー → 回答/離脱 → Supabase → 将来的にML分析
```

---

## 実装タスク（チェックリスト）

### Phase 1: 環境セットアップ
- [ ] **1.1** Supabaseクライアントライブラリのインストール
  ```bash
  npm install @supabase/supabase-js
  ```
- [ ] **1.2** 環境変数ファイル（`.env.local`）の作成
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] **1.3** `.gitignore`に`.env.local`が含まれているか確認
- [ ] **1.4** Supabaseプロジェクトの作成（Web UI）
- [ ] **1.5** `responses`テーブルのSQL作成と実行

### Phase 2: データ構造の準備
- [ ] **2.1** 質問データファイルの作成
  - ファイル: `src/data/questions.ts`
  - 構造: `{ id: number, ja: string, en: string }[]`
  - 50問の質問を配列で定義
- [ ] **2.2** 型定義ファイルの作成
  - ファイル: `src/types/response.ts`
  - `ResponseData`型の定義（q1-q50, exit_at_question）
- [ ] **2.3** Supabaseクライアントの初期化
  - ファイル: `src/lib/supabase.ts`
  - クライアントインスタンスのエクスポート

### Phase 3: データ保存機能の実装
- [ ] **3.1** データ保存用ユーティリティ関数の作成
  - ファイル: `src/lib/saveResponse.ts`
  - 関数: `saveResponse(username, locale, answers, exitAtQuestion)`
  - 回答配列を`q1`-`q50`のオブジェクトに変換
  - Yes=0, No=1, 未回答=nullに変換
- [ ] **3.2** エラーハンドリングの実装
  - ネットワークエラー
  - Supabaseエラー
  - ユーザーへのフィードバック表示
- [ ] **3.3** 保存成功/失敗時の通知UI
  - 成功: 結果ページへ遷移
  - 失敗: エラーメッセージ表示 + リトライオプション

### Phase 4: 離脱ボタンの実装
- [ ] **4.1** 離脱ボタンコンポーネントの作成
  - ファイル: `src/components/ExitButton.tsx`
  - 位置: 画面上部または質問カード近く
  - デザイン: 目立ちすぎず、アクセス可能
- [ ] **4.2** 離脱確認ダイアログの実装
  - 「本当に終了しますか？」の確認
  - 「はい」「いいえ」ボタン
- [ ] **4.3** 離脱時のデータ保存処理
  - 現在の回答までを保存
  - 残りの質問をnullで埋める
  - `exit_at_question`に現在の質問番号を設定
- [ ] **4.4** 離脱後の画面遷移
  - オプションA: 「ご協力ありがとうございました」ページ
  - オプションB: トップページへ戻る
  - どちらか決定

### Phase 5: メインアプリケーションの更新
- [ ] **5.1** `page.tsx`の状態管理を更新
  - 回答形式をboolean[]からnumber[]に変更（0/1）
  - 離脱フラグの追加
- [ ] **5.2** `handleAnswer`関数の修正
  - Yes → 0, No → 1で保存
- [ ] **5.3** 新しい`handleExit`関数の作成
  - 離脱確認
  - 部分的な回答データの保存
  - 状態のリセット
- [ ] **5.4** 質問数を5から50に変更
  - `SAMPLE_QUESTIONS`を`questions`データに置き換え
- [ ] **5.5** CardStackコンポーネントへの離脱ボタン追加
  - propsで`onExit`を渡す

### Phase 6: UI/UXの調整
- [ ] **6.1** プログレスバーの更新
  - 50問対応に変更
  - パーセンテージ表示の追加（例: 10/50 - 20%）
- [ ] **6.2** 質問カードのデザイン調整
  - 長い質問文に対応（スクロールまたは自動リサイズ）
- [ ] **6.3** 離脱ボタンのスタイリング
  - 既存のデザインシステムに合わせる
  - レスポンシブ対応
- [ ] **6.4** ローディング状態の追加
  - データ保存中のスピナー表示
  - ボタンの無効化

### Phase 7: 多言語対応の更新
- [ ] **7.1** `ja.json`の更新
  - 質問数を50に変更
  - 離脱関連のテキスト追加
    - `exitButton`: "終了する"
    - `exitConfirm`: "本当に終了しますか？"
    - `exitThankYou`: "ご協力ありがとうございました"
- [ ] **7.2** `en.json`の更新
  - 質問数を50に変更
  - 離脱関連のテキスト追加
    - `exitButton`: "Exit"
    - `exitConfirm`: "Are you sure you want to exit?"
    - `exitThankYou`: "Thank you for your participation"

### Phase 8: 結果ページの更新
- [ ] **8.1** `ResultPage.tsx`の修正
  - 完了時と離脱時で異なるメッセージを表示
  - 完了時: 診断結果
  - 離脱時: 協力感謝のメッセージ
- [ ] **8.2** 離脱後の結果ページ
  - データ保存成功メッセージ
  - 「最初から始める」ボタン

### Phase 9: テストとデバッグ
- [ ] **9.1** ローカル環境でのテスト
  - [ ] 50問すべてに回答して完了
  - [ ] 途中で離脱（複数の質問番号で試す）
  - [ ] Supabaseでデータ確認
  - [ ] Yes=0, No=1の変換確認
  - [ ] nullの正しい挿入確認
  - [ ] `exit_at_question`の値確認
- [ ] **9.2** 多言語切り替えテスト
  - [ ] 日本語で回答
  - [ ] 英語で回答
  - [ ] 途中で言語切り替え
- [ ] **9.3** エラーケースのテスト
  - [ ] ネットワークオフライン時
  - [ ] Supabase接続エラー時
  - [ ] 不正なデータ形式
- [ ] **9.4** モバイル対応テスト
  - [ ] レスポンシブデザイン確認
  - [ ] スワイプ動作確認
  - [ ] 離脱ボタンのタップ領域確認

### Phase 10: ドキュメント作成
- [ ] **10.1** README.mdの更新
  - セットアップ手順
  - 環境変数の説明
  - Supabaseテーブル作成SQL
- [ ] **10.2** データベーススキーマのドキュメント
  - テーブル構造の説明
  - データ型の詳細
- [ ] **10.3** データ分析用のSQLクエリ例
  - 離脱率の計算
  - 質問別の回答分布
  - 言語別の統計

---

## Supabaseテーブル作成SQL

```sql
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

-- RLS（Row Level Security）の設定（任意）
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
```

---

## データ分析用SQLクエリ例

### 1. 離脱率の計算
```sql
-- 全体の離脱率
SELECT
  ROUND(COUNT(CASE WHEN exit_at_question < 51 THEN 1 END) * 100.0 / COUNT(*), 2) as exit_rate_percent
FROM responses;

-- 質問ごとの離脱数
SELECT
  exit_at_question,
  COUNT(*) as exit_count
FROM responses
WHERE exit_at_question < 51
GROUP BY exit_at_question
ORDER BY exit_at_question;
```

### 2. 質問別の回答分布
```sql
-- 質問1のYes/No分布
SELECT
  CASE
    WHEN q1 = 0 THEN 'Yes'
    WHEN q1 = 1 THEN 'No'
    ELSE 'No Answer'
  END as answer,
  COUNT(*) as count
FROM responses
GROUP BY q1;
```

### 3. 完了率
```sql
-- 全問完了したユーザーの割合
SELECT
  ROUND(COUNT(CASE WHEN exit_at_question = 51 THEN 1 END) * 100.0 / COUNT(*), 2) as completion_rate
FROM responses;
```

---

## ファイル構造

```
your_type_web/
├── src/
│   ├── app/
│   │   ├── page.tsx (更新: メイン状態管理、50問対応)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ExitButton.tsx (新規: 離脱ボタン)
│   │   ├── ExitConfirmDialog.tsx (新規: 離脱確認)
│   │   ├── ExitThankYouPage.tsx (新規: 離脱後のページ)
│   │   ├── QuestionCard.tsx
│   │   ├── CardStack.tsx (更新: onExit追加)
│   │   ├── ActionButtons.tsx
│   │   ├── ProgressBar.tsx (更新: 50問対応)
│   │   ├── ResultPage.tsx (更新: 離脱/完了分岐)
│   │   └── ...
│   ├── data/
│   │   └── questions.ts (新規: 50問の質問データ)
│   ├── lib/
│   │   ├── supabase.ts (新規: Supabaseクライアント)
│   │   └── saveResponse.ts (新規: データ保存関数)
│   ├── types/
│   │   └── response.ts (新規: 型定義)
│   └── locales/
│       ├── ja.json (更新: 離脱関連テキスト)
│       └── en.json (更新: 離脱関連テキスト)
├── .env.local (新規: 環境変数)
├── .gitignore (確認: .env.localが含まれているか)
└── IMPLEMENTATION_PLAN.md (このファイル)
```

---

## 次のステップ

1. **Supabaseプロジェクトの作成**（Web UIで実施）
2. **50問の質問データの準備**（テキストまたはスプレッドシート）
3. **環境変数の設定**（Supabase URL & Anon Key）
4. **実装開始**（このチェックリストに沿って進める）

---

## 注意事項

- ✅ ユーザー認証は不要（匿名でのデータ収集）
- ✅ Supabase RLSでINSERTのみ許可（セキュリティ）
- ✅ Yes=0, No=1のマッピングを厳守
- ✅ 離脱時はnullで未回答を表現
- ✅ `exit_at_question`は必須（完了時は51）
- ⚠️ プロダクション環境では環境変数を適切に管理
- ⚠️ 将来のFastAPI統合を考慮した設計

---

**作成日**: 2025-10-14
**最終更新**: 2025-10-14
