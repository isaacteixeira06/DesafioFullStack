export default function Alert({ message, type = 'error' }) {
  if (!message) return null

  const colors = {
    error: { background: '#fef2f2', border: '#fca5a5', color: '#dc2626' },
    success: { background: '#f0fdf4', border: '#86efac', color: '#16a34a' }
  }

  const style = colors[type]

  return (
    <div style={{
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      border: `1px solid ${style.border}`,
      background: style.background,
      color: style.color,
      fontSize: '0.875rem',
      marginBottom: '1rem'
    }}>
      {message}
    </div>
  )
}