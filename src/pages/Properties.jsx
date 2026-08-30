import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PropertyForm from '../components/PropertyForm'
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../api/properties'

// 物件一覧画面（Supabase の properties テーブルと連携）
export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([]) // 物件一覧
  const [loading, setLoading] = useState(true) // 一覧の読み込み中フラグ
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false) // 登録／更新の実行中フラグ
  const [editingProperty, setEditingProperty] = useState(null) // 編集中の物件

  // 一覧を取得する
  const loadProperties = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage(`一覧の取得に失敗しました: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  // 初回表示時に一覧を取得
  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  // ログアウト処理
  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  // 新規登録（INSERT）
  const handleCreate = async (values) => {
    setSubmitting(true)
    setErrorMessage('')
    try {
      const created = await createProperty(values)
      setProperties((prev) => [created, ...prev])
    } catch (error) {
      setErrorMessage(`登録に失敗しました: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // 更新（UPDATE）
  const handleUpdate = async (values) => {
    if (!editingProperty) return
    setSubmitting(true)
    setErrorMessage('')
    try {
      const updated = await updateProperty(editingProperty.id, values)
      setProperties((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      )
      setEditingProperty(null)
    } catch (error) {
      setErrorMessage(`更新に失敗しました: ${error.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // 削除（DELETE）
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return
    setErrorMessage('')
    try {
      await deleteProperty(id)
      setProperties((prev) => prev.filter((item) => item.id !== id))
      // 削除対象を編集中だった場合はフォームを閉じる
      if (editingProperty?.id === id) setEditingProperty(null)
    } catch (error) {
      setErrorMessage(`削除に失敗しました: ${error.message}`)
    }
  }

  // 家賃を「¥128,000」形式に整形する
  const formatRent = (rent) => `¥${Number(rent).toLocaleString('ja-JP')}`

  return (
    <div className="page">
      <header className="page-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          {user && <span className="user-email">{user.email}</span>}
          <button type="button" className="logout-button" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </header>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* 登録フォーム（常に表示） */}
      <PropertyForm onSubmit={handleCreate} submitting={submitting} />

      {/* 編集フォーム（編集ボタン押下時のみ表示） */}
      {editingProperty && (
        <PropertyForm
          initialValue={editingProperty}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProperty(null)}
          submitting={submitting}
        />
      )}

      {/* 一覧表示 */}
      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty">登録された物件はありません。上のフォームから登録してください。</p>
      ) : (
        <ul className="property-grid">
          {properties.map((property) => (
            <li key={property.id} className="property-card">
              <h2 className="property-name">{property.name}</h2>
              <p className="property-rent">{formatRent(property.rent)} / 月</p>
              <p className="property-area">{property.area}</p>
              <p className="property-layout">{property.layout}</p>
              <div className="card-actions">
                <button type="button" onClick={() => setEditingProperty(property)}>
                  編集
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => handleDelete(property.id)}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
