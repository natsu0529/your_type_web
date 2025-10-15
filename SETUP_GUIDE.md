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

### 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com) にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクト設定から以下の情報を取得：
   - `API Key`
   - `Auth Domain`
   - `Project ID`
   - `Storage Bucket`
   - `Messaging Sender ID`
   - `App ID`

### 2. Firestore Databaseの設定

1. Firebase コンソールで **Firestore Database** を選択
2. **データベースの作成** をクリック
3. **テストモードで開始** を選択（開発中のみ）
4. ロケーションを選択（asia-northeast1を推奨）
5. **有効にする** をクリック

**セキュリティルールの設定:**

Firestore のルールを以下のように設定してください（開発後は適切に調整）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /responses/{document=**} {
      allow create: if true;  // 誰でも書き込み可能（データ収集用）
      allow read: if false;   // 読み取りは禁止
    }
  }
}
```

### 3. 環境変数の設定

`.env.local` ファイルを編集して、Firebaseの情報を設定：

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
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
- ✅ 回答データのFirestore保存
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
│   │   ├── firebase.ts                 # Firebaseクライアント
│   │   └── saveResponse.ts             # データ保存関数
│   ├── types/
│   │   └── response.ts                 # 型定義
│   └── locales/
│       ├── ja.json                     # 日本語翻訳
│       └── en.json                     # 英語翻訳
├── .env.local                          # 環境変数
├── IMPLEMENTATION_PLAN.md              # 実装計画書
└── SETUP_GUIDE.md                      # このファイル
```

---

## 🗄️ データベーススキーマ

### `responses` コレクション (Firestore)

| フィールド | 型 | 説明 |
|--------|-----|------|
| `username` | string | ユーザー名 |
| `locale` | string | 言語（ja/en） |
| `q1` ~ `q50` | number \| null | 質問1-50の回答（0=Yes, 1=No, null=未回答） |
| `exit_at_question` | number | 離脱した質問番号（完了時は51） |
| `created_at` | timestamp | 回答日時 |

**注意:** FirestoreではドキュメントIDが自動生成されます。

---

## 📈 データ分析

Firestoreのデータは、Firebase Consoleから確認できます。また、以下の方法でデータを分析できます：

### 方法1: Firebase Consoleで直接確認
1. Firebase Console > Firestore Database
2. `responses` コレクションを開く
3. ドキュメントを1つずつ確認

### 方法2: Firestore エクスポート機能
1. Firebase Console > Firestore Database > データをエクスポート
2. Cloud Storage にエクスポート
3. BigQuery にインポートして SQL で分析

### 方法3: Cloud Functions でデータ集計
Node.js や Python を使って、Firestore のデータを集計する Cloud Functions を作成できます。

**分析例:**
- 離脱率の計算
- 質問ごとの離脱数
- 完了率
- 質問別のYes/No分布

---

## ⚠️ 注意事項

### セキュリティ
- ✅ ユーザー認証は不要（匿名データ収集）
- ✅ Firestore Security RulesでCREATEのみ許可
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

### Firebase接続エラー
1. `.env.local`の設定を確認
2. Firebase API KeyとProject IDが正しいか確認
3. Firestore Databaseが有効化されているか確認
4. Firebase Consoleでプロジェクトが選択されているか確認

### ビルドエラー
1. `npm install`を再実行
2. `.next`フォルダを削除して再ビルド
3. Node.jsのバージョンを確認（18.18.0以上推奨）

### データが保存されない
1. ブラウザのコンソールでエラーを確認
2. Firestore Security Rulesを確認
3. ネットワーク接続を確認
4. Firebase Consoleでクォータ制限を確認

---

## 📞 サポート

質問や問題がある場合は、以下を確認してください：

1. `IMPLEMENTATION_PLAN.md` - 詳細な実装計画
2. Firebase Console - Firestore Database
3. Firebase Consoleのログ（Cloud Functions > ログ）

---

**作成日**: 2025-10-14
**最終更新**: 2025-10-14
**ステータス**: 実装完了 ✅
