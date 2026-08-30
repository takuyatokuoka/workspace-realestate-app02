import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// 会員登録画面
export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // フォーム送信時の処理
  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setInfoMessage('')
    setSubmitting(true)

    const { data, error } = await signUp(email, password)

    setSubmitting(false)

    if (error) {
      setErrorMessage('会員登録に失敗しました。入力内容を確認してください。')
      return
    }

    // メール確認が有効な場合はセッションが発行されない
    if (!data.session) {
      setInfoMessage('確認メールを送信しました。メール内のリンクを開いてから、ログインしてください。')
      return
    }

    // セッションが発行された場合はそのまま物件一覧へ
    navigate('/properties', { replace: true })
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {infoMessage && <p className="info">{infoMessage}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? '登録中...' : '登録する'}
        </button>

        <p className="switch-link">
          すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
