import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// 未ログインの場合はログイン画面へリダイレクトするラッパー
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  // セッション確認中は何も表示しない（画面のちらつき防止）
  if (loading) {
    return <p className="loading">読み込み中...</p>
  }

  // 未ログインならログイン画面へ
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // ログイン済みなら子要素をそのまま表示
  return children
}
