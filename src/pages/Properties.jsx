import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dummyProperties } from '../data/properties'

// 物件一覧画面（ログイン後に表示）
export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // ログアウト処理
  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  // 家賃を「¥128,000」形式に整形する
  const formatRent = (rent) => `¥${rent.toLocaleString('ja-JP')}`

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

      <ul className="property-grid">
        {dummyProperties.map((property) => (
          <li key={property.id} className="property-card">
            <h2 className="property-name">{property.name}</h2>
            <p className="property-rent">{formatRent(property.rent)} / 月</p>
            <p className="property-area">{property.area}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
