export default function Spinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '2rem',
        height: '2rem',
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}