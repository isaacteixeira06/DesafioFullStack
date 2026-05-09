import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import facade from '../api/facade'

export function useAuth() {
  const { login, logout, user, isAuthenticated } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await facade.auth.login({ email, password })
      login(response.data.user, response.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (name, email, password, passwordConfirmation) => {
    setLoading(true)
    setError(null)
    try {
      const response = await facade.auth.register({
        user: { name, email, password, password_confirmation: passwordConfirmation }
      })
      login(response.data.user, response.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || 'Erro ao registrar')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return { handleLogin, handleRegister, handleLogout, loading, error, user, isAuthenticated }
}