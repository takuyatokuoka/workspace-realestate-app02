import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// 認証状態をアプリ全体へ配布するためのコンテキスト
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null) // 現在のログインセッション
  const [loading, setLoading] = useState(true) // 初回のセッション確認中フラグ

  useEffect(() => {
    // 初回マウント時に既存のセッションを取得する
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // ログイン・ログアウトなどの認証イベントを購読する
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    // アンマウント時に購読を解除する
    return () => subscription.unsubscribe()
  }, [])

  // メールアドレス＋パスワードで会員登録する
  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password })

  // メールアドレス＋パスワードでログインする
  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  // ログアウトする
  const signOut = () => supabase.auth.signOut()

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 認証コンテキストを利用するためのフック
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth は AuthProvider の内側で使用してください。')
  }
  return context
}
