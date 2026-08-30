import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { supabaseConfigError } from './supabaseClient'
import './index.css'

// アプリのエントリーポイント
const root = ReactDOM.createRoot(document.getElementById('root'))

if (supabaseConfigError) {
  // 環境変数が未設定の場合は、白画面ではなく原因を画面に表示する
  root.render(
    <div className="config-error">
      <h1>設定エラー</h1>
      <p>{supabaseConfigError}</p>
    </div>
  )
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
