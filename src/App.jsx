import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Properties from './pages/Properties'

// ルーティング定義
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ルートアクセスは物件一覧へ（未ログインなら ProtectedRoute がログイン画面へ飛ばす） */}
          <Route path="/" element={<Navigate to="/properties" replace />} />

          {/* 認証不要の画面 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 認証が必要な画面 */}
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            }
          />

          {/* 未定義のパスは物件一覧へ */}
          <Route path="*" element={<Navigate to="/properties" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
