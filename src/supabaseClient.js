import { createClient } from '@supabase/supabase-js'

// .env（ローカル）または Vercel の環境変数から Supabase の接続情報を読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// 設定漏れを検知する。ここでは throw せず、フラグとして公開して
// main.jsx 側で画面にメッセージを表示する（白画面を防ぐため）
export const supabaseConfigError =
  !supabaseUrl || !supabasePublishableKey
    ? '環境変数 VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY が設定されていません。' +
      'ローカルは .env、本番は Vercel の Environment Variables を確認してください。'
    : null

// アプリ全体で共有する Supabase クライアント
// 設定漏れ時でも createClient が例外を投げないようダミー値を渡す
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-key'
)
