/**
 * Supabaseクライアントの初期化
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 環境変数の検証
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'your-project-url.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.startsWith('http');

/**
 * Supabaseクライアントのシングルトンインスタンス
 * 環境変数が未設定の場合はnullを返す
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // 認証なしのデータ収集のため
      },
    })
  : null;

/**
 * Supabaseが設定されているかチェック
 */
export function isSupabaseReady(): boolean {
  return supabase !== null;
}

/**
 * Supabaseの設定ガイダンスメッセージ
 */
export function getSupabaseSetupMessage(): string {
  return `
🔧 Supabaseの設定が必要です

以下の手順に従ってください：

1. https://supabase.com でプロジェクトを作成
2. Project Settings > API から以下の情報を取得：
   - Project URL
   - anon/public key
3. .env.localファイルを編集：
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
4. 開発サーバーを再起動：npm run dev

詳細は SETUP_GUIDE.md を参照してください。
  `.trim();
}
