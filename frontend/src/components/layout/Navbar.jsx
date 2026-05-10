import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const { handleLogout } = useAuth()
  const { user } = useAuthContext()

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 1.5rem',
      height: '3.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Link to="/dashboard" style={{
        fontWeight: '700',
        fontSize: '1.125rem',
        color: '#1f2937',
        textDecoration: 'none'
      }}>
        CourseSphere
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Olá, {user?.name}
        </span>
        <button onClick={handleLogout} style={{
          padding: '0.375rem 0.75rem',
          background: 'transparent',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          Sair
        </button>
      </div>
    </nav>
  )
}