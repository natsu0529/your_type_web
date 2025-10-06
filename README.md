# your_type-frontend

**AI-Powered Self-Categorization App (フロントエンド)**

| Status                                 | Version | License |
| -------------------------------------- | ------- | ------- |
| MVP Development (バイブコーディング中) | v0.1.0  | MIT     |

## 🎯 概要と役割 (Overview & Role)

本リポジリは、診断エンジン your_type-api からのデータを受け取り、スワイプによる最高のユーザー体験（UX）と多言語対応 UI を提供する役割を担います。TypeScript の型安全性を活かし、API の型定義を共有することで堅牢性を確保します。

## ✨ 主な特徴 (Key Features)

- **🔥 Tinder ライクなスワイプ UX**: 質問への Yes/No 回答を、フリクションの少ない直感的なスワイプ操作で実現します。
- **🌏 日英シームレスな多言語 UI**: Next.js の i18n 機能に基づき、UI のテキストを日英で瞬時に切り替えます。
- **🚫 認証不要のシンプル設計**: ログイン機能を排除し、ユーザー名入力だけで即座に診断を開始できます。
- **📜 結果ページ (PDF 代替)**: 診断結果（16 タイプ）を、シェアおよびスクリーンショット保存に適した美しいデザインで表示します。

## ⚙️ 技術スタック (Tech Stack)

| カテゴリ       | 技術名                   | 採用理由                                                              |
| -------------- | ------------------------ | --------------------------------------------------------------------- |
| フレームワーク | Next.js (TypeScript)     | Vercel へのデプロイ容易性、ルーティング、API との型安全な連携のため。 |
| UI/CSS         | shadcn/ui & Tailwind CSS | デザイナー不要でプロフェッショナルな UI を迅速に構築するため。        |
| パッケージ管理 | npm                      | 標準的な依存関係の管理とスクリプト実行。                              |

## 🛣️ 開発ロードマップ (Frontend Development Roadmap)

バイブコーディングを加速するための具体的な開発順序です。

### 環境構築 & UI 基盤 (Day 1)

1.  Next.js プロジェクト初期設定、Tailwind CSS、shadcn/ui の導入。
2.  **多言語設定（i18n）**の初期ファイル（ja.json/en.json）を準備し、UI テキストを切り替え可能にする。
3.  your_type-api との連携に使う型定義ファイルを共有ディレクトリに設置。

### スワイプ UI 実装 (Day 2-3)

1.  質問表示コンポーネントと、スワイプアニメーション（Yes/No）のロジックを実装。
2.  診断開始時の「ユーザー名入力」と「匿名 ID 取得 API 呼び出し」を実装。

### API 連携とロジック (Day 4)

1.  バックエンドの `/questions` API を叩き、質問を取得。
2.  回答時の `/answer` API を実装し、匿名 ID と回答データを送信。

### 結果ページとデプロイ (Day 5)

1.  診断完了後の `/result` ページを作成し、`/diagnose` API から結果を取得して表示。
2.  最終チェック後、Vercel へデプロイ。

## 🛠️ ローカル環境のセットアップ

バックエンドの起動確認: 依存する your_type-api リポジトリが**ポート 8000**で動作していることを確認してください。

### クローンとインストール:

```bash
git clone [your_type-frontend URL]
cd your_type-frontend
npm install
```

### 環境変数の設定:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=[Your Supabase Project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Supabase Anon Key]
# Python APIのURL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 開発サーバーの起動:

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。
