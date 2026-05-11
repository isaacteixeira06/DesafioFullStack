import { useState } from 'react'
import Alert from '../ui/Alert'

export default function LessonForm({ onSubmit, onCancel, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '')
  const [status, setStatus] = useState(initialData.status || 'draft')
  const [videoUrl, setVideoUrl] = useState(initialData.video_url || '')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const result = await onSubmit({ title, status, video_url: videoUrl })
    if (!result.success) setError(result.error)
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    boxSizing: 'border-box',
    marginTop: '0.25rem'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.75rem'
  }

  return (
    <form onSubmit={handleSubmit}>
      <Alert message={error} />

      <div style={labelStyle}>
        Título *
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
          required minLength={3} style={inputStyle} />
      </div>

      <div style={labelStyle}>
        Status *
        <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
          <option value="draft">Rascunho</option>
          <option value="published">Publicado</option>
        </select>
      </div>

      <div style={labelStyle}>
        URL do vídeo
        <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..." style={inputStyle} />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <button type="submit" disabled={loading} style={{
          padding: '0.5rem 1.25rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancel} style={{
          padding: '0.5rem 1.25rem',
          background: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          color: '#374151'
        }}>
          Cancelar
        </button>
      </div>
    </form>
  )
}