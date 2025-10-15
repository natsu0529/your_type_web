/**
 * Firebaseクライアントの初期化
 */

import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 環境変数の検証
const isFirebaseConfigured =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId &&
  firebaseConfig.apiKey !== 'your-api-key' &&
  firebaseConfig.projectId !== 'your-project-id';

/**
 * Firebaseアプリのシングルトンインスタンス
 */
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  // 既存のアプリがない場合のみ初期化
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
}

/**
 * Firestoreのインスタンスを取得
 */
export function getFirestoreDB(): Firestore | null {
  return db;
}

/**
 * Firebaseが設定されているかチェック
 */
export function isFirebaseReady(): boolean {
  return db !== null;
}

/**
 * Firebaseの設定ガイダンスメッセージ
 */
export function getFirebaseSetupMessage(): string {
  return `
🔧 Firebaseの設定が必要です

以下の手順に従ってください：

1. https://console.firebase.google.com でプロジェクトを作成
2. Firestore Databaseを有効化
3. プロジェクト設定から以下の情報を取得：
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID
4. .env.localファイルを作成/編集：
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
5. 開発サーバーを再起動：npm run dev

詳細は SETUP_GUIDE.md を参照してください。
  `.trim();
}
