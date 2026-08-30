import { useEffect, useState } from 'react'

// 物件の新規登録／編集で共通利用するフォーム
// - initialValue が渡された場合は編集モード（フォームに値を初期表示）
// - onSubmit には { name, rent, area, layout } を渡す
export default function PropertyForm({
  initialValue = null,
  onSubmit,
  onCancel,
  submitting = false,
}) {
  const isEdit = Boolean(initialValue)

  const [name, setName] = useState('')
  const [rent, setRent] = useState('')
  const [area, setArea] = useState('')
  const [layout, setLayout] = useState('')

  // 編集対象が変わったらフォームの値を同期する
  useEffect(() => {
    setName(initialValue?.name ?? '')
    setRent(initialValue?.rent != null ? String(initialValue.rent) : '')
    setArea(initialValue?.area ?? '')
    setLayout(initialValue?.layout ?? '')
  }, [initialValue])

  // 送信処理
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      name: name.trim(),
      rent: Number(rent), // 家賃は数値に変換
      area: area.trim(),
      layout: layout.trim(),
    })

    // 新規登録モードのときは送信後にフォームをクリア
    if (!isEdit) {
      setName('')
      setRent('')
      setArea('')
      setLayout('')
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? '物件を編集' : '物件を新規登録'}</h2>

      <label>
        物件名
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        家賃（円）
        <input
          type="number"
          min="0"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
      </label>

      <label>
        エリア名
        <input value={area} onChange={(e) => setArea(e.target.value)} required />
      </label>

      <label>
        間取り（例: 1LDK）
        <input
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : isEdit ? '更新する' : '登録する'}
        </button>
        {isEdit && (
          <button type="button" className="secondary" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
