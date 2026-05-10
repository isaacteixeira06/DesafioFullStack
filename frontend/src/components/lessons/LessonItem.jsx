export default function LessonItem({ lesson, isCreator, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      background: 'white',
      marginBottom: '0.5rem'
    }}>
      <div>
        <p style={{ margin: 0, fontWeight: '500', color: '#111827' }}>{lesson.title}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.125rem 0.5rem',
            borderRadius: '9999px',
            background: lesson.status === 'published' ? '#dcfce7' : '#fef9c3',
            color: lesson.status === 'published' ? '#15803d' : '#a16207',
            fontWeight: '500'
          }}>
            {lesson.status === 'published' ? 'Publicado' : 'Rascunho'}
          </span>
          {lesson.video_url && (
            <a href={lesson.video_url} target="_blank" rel="noreferrer"
              style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none' }}>
              Ver vídeo →
            </a>
          )}
        </div>
      </div>

      {isCreator && (
        <button onClick={() => onDelete(lesson.id)} style={{
          padding: '0.25rem 0.625rem',
          background: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fca5a5',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          marginLeft: '1rem'
        }}>
          Excluir
        </button>
      )}
    </div>
  )
}