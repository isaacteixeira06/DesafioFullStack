import { useState } from 'react'
import Alert from '../ui/Alert'
import facade from '../../api/facade'

export default function CourseForm({ onSubmit, onCancel, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [startDate, setStartDate] = useState(initialData.start_date || '')
  const [endDate, setEndDate] = useState(initialData.end_date || '')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suggesting, setSuggesting] = useState(false)

  const handleSuggest = async () => {
    if (!name || name.length < 3) {
      setError('Digite o nome do curso antes de sugerir uma descrição')
      return
    }
    setSuggesting(true)
    setError(null)
    try {
      const response = await facade.courses.suggestDescription(name)
      setDescription(response.data.suggestion)
    } catch {
      setError('Erro ao gerar sugestão')
    } finally {
      setSuggesting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const result = await onSubmit({ name, description, start_date: startDate, end_date: endDate })
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
        Nome *
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          required minLength={3} style={inputStyle} />
      </div>

      <div style={labelStyle}>
        Descrição
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            rows={3} style={{ ...inputStyle, flex: 1, resize: 'vertical' }} />
          <button type="button" onClick={handleSuggest} disabled={suggesting} style={{
            padding: '0.5rem 0.75rem',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            marginTop: '0.25rem'
          }}>
            {suggesting ? 'Gerando...' : '✨ Sugerir com IA'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={labelStyle}>
          Data de início *
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
            required style={inputStyle} />
        </div>
        <div style={labelStyle}>
          Data de término *
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
            required style={inputStyle} />
        </div>
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
          color: '#374151',
        }}>
          Cancelar
        </button>
      </div>
    </form>
  )
}