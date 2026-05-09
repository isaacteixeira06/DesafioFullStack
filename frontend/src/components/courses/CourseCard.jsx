import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function CourseCard({ course, onDelete }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const isCreator = user?.id === course.creator?.id

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>{course.name}</h3>
      {course.description && (
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>{course.description}</p>
      )}
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>
        {course.start_date} → {course.end_date}
      </p>
      <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>
        Por {course.creator?.name}
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button onClick={() => navigate(`/courses/${course.id}`)} style={{
          padding: '0.375rem 0.75rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}>
          Ver detalhes
        </button>
        {isCreator && (
          <button onClick={() => onDelete(course.id)} style={{
            padding: '0.375rem 0.75rem',
            background: '#fee2e2',
            color: '#dc2626',
            border: '1px solid #fca5a5',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}>
            Excluir
          </button>
        )}
      </div>
    </div>
  )
}