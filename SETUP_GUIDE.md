# Your Type - セットアップガイド

## 実装完了ステータス ✅

すべてのフェーズが完了しました！

- ✅ Phase 1: 環境セットアップ
- ✅ Phase 2: データ構造の準備
- ✅ Phase 3: データ保存機能
- ✅ Phase 4: 離脱ボタン実装
- ✅ Phase 5: メインアプリ更新（50問対応）
- ✅ Phase 6: UI/UX調整
- ✅ Phase 7: 多言語対応更新
- ✅ Phase 8: 結果ページ更新
- ✅ Phase 9: テストとデバッグ
- ✅ Phase 10: ドキュメント更新

---

## 🚀 セットアップ手順

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. Project Settings > API から以下の情報を取得：
   - `Project URL`
   - `anon/public key`

### 2. Supabaseデータベースの設定

1. Supabase ダッシュボードの **SQL Editor** を開く
2. `supabase/create_responses_table.sql` の内容をコピー＆ペースト
3. **RUN** を押してテーブルを作成

### 3. 環境変数の設定

`.env.local` ファイルを編集して、Supabaseの情報を設定：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス

---

## 📊 実装された機能

### データ収集機能
- ✅ 50問の質問（日本語・英語）
- ✅ Yes/No回答（0=Yes, 1=No）
- ✅ 回答データのSupabase保存
- ✅ ユーザー名の記録
- ✅ 言語設定の記録

### 離脱率計測機能
- ✅ 離脱ボタン（画面右上）
- ✅ 離脱確認ダイアログ
- ✅ 部分回答の保存（nullで未回答を表現）
- ✅ 離脱した質問番号の記録（exit_at_question）

### UI/UX
- ✅ スワイプ操作対応
- ✅ 進捗表示（現在の質問番号 / 50）
- ✅ 保存中のローディング表示
- ✅ エラーハンドリング
- ✅ レスポンシブデザイン

### 多言語対応
- ✅ 日本語
- ✅ 英語
- ✅ リアルタイム切り替え

---

## 📁 ファイル構造

```
your_type_web/
├── src/
│   ├── app/
│   │   └── page.tsx                    # メインアプリケーション
│   ├── components/
│   │   ├── ExitButton.tsx              # 離脱ボタン
│   │   ├── ExitConfirmDialog.tsx       # 離脱確認ダイアログ
│   │   ├── QuestionCard.tsx
│   │   ├── CardStack.tsx
│   │   ├── ActionButtons.tsx
│   │   └── ...
│   ├── data/
│   │   └── questions.ts                # 50問の質問データ
│   ├── lib/
│   │   ├── supabase.ts                 # Supabaseクライアント
│   │   └── saveResponse.ts             # データ保存関数
│   ├── types/
│   │   └── response.ts                 # 型定義
│   └── locales/
│       ├── ja.json                     # 日本語翻訳
│       └── en.json                     # 英語翻訳
├── supabase/
│   └── create_responses_table.sql      # テーブル作成SQL
├── .env.local                          # 環境変数
├── IMPLEMENTATION_PLAN.md              # 実装計画書
└── SETUP_GUIDE.md                      # このファイル
```

---

## 🗄️ データベーススキーマ

### `responses` テーブル

| カラム | 型 | 説明 |
|--------|-----|------|
| `id` | UUID | 主キー |
| `username` | TEXT | ユーザー名 |
| `locale` | TEXT | 言語（ja/en） |
| `q1` ~ `q50` | INTEGER | 質問1-50の回答（0=Yes, 1=No, null=未回答） |
| `exit_at_question` | INTEGER | 離脱した質問番号（完了時は51） |
| `created_at` | TIMESTAMP | 回答日時 |

---

## 📈 データ分析クエリ例

### 離脱率の計算
```sql
SELECT
  ROUND(COUNT(CASE WHEN exit_at_question < 51 THEN 1 END) * 100.0 / COUNT(*), 2) as exit_rate_percent
FROM responses;
```

### 質問ごとの離脱数
```sql
SELECT
  exit_at_question,
  COUNT(*) as exit_count
FROM responses
WHERE exit_at_question < 51
GROUP BY exit_at_question
ORDER BY exit_at_question;
```

### 完了率
```sql
SELECT
  ROUND(COUNT(CASE WHEN exit_at_question = 51 THEN 1 END) * 100.0 / COUNT(*), 2) as completion_rate
FROM responses;
```

### 質問別のYes/No分布
```sql
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

---

## ⚠️ 注意事項

### セキュリティ
- ✅ ユーザー認証は不要（匿名データ収集）
- ✅ Supabase RLSでINSERTのみ許可
- ✅ `.env.local`は`.gitignore`に含まれている

### データ形式
- ✅ Yes = 0, No = 1（必ず守ってください）
- ✅ 未回答 = null
- ✅ 完了時の`exit_at_question` = 51
- ✅ 離脱時の`exit_at_question` = 離脱した質問番号（1-50）

### 将来の拡張
- 📌 FastAPIとの統合準備済み
- 📌 型定義の共有が可能
- 📌 データ構造は変更不要

---

## 🐛 トラブルシューティング

### Supabase接続エラー
1. `.env.local`の設定を確認
2. Supabase URLとAnon Keyが正しいか確認
3. テーブルが作成されているか確認

### ビルドエラー
1. `npm install`を再実行
2. `.next`フォルダを削除して再ビルド
3. Node.jsのバージョンを確認（18.18.0以上推奨）

### データが保存されない
1. ブラウザのコンソールでエラーを確認
2. Supabase RLSポリシーを確認
3. ネットワーク接続を確認

---

## 📞 サポート

質問や問題がある場合は、以下を確認してください：

1. `IMPLEMENTATION_PLAN.md` - 詳細な実装計画
2. `supabase/create_responses_table.sql` - データベース定義
3. Supabaseダッシュボードのログ

---

**作成日**: 2025-10-14
**最終更新**: 2025-10-14
**ステータス**: 実装完了 ✅
