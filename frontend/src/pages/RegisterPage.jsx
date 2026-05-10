import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { handleRegister, loading, error } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister(name, email, password, passwordConfirmation)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9fafb'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>
          Criar conta
        </h1>

        <Alert message={error} />

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              Confirmar senha
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {loading ? <Spinner /> : (
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.625rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Criar conta
            </button>
          )}
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Já tem conta?{' '}
          <Link to="/login" style={{ color: '#3b82f6' }}>Entrar</Link>
        </p>
      </div>
    </div>
  )
}