import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import LessonItem from '../components/lessons/LessonItem'
import LessonForm from '../components/lessons/LessonForm'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'
import { useLessons } from '../hooks/useLessons'
import { useAuthContext } from '../context/AuthContext'
import facade from '../api/facade'

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [course, setCourse] = useState(null)
  const [courseLoading, setCourseLoading] = useState(true)
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const { lessons, loading, error, fetchLessons, createLesson, removeLesson } = useLessons(id)

  useEffect(() => {
    facade.courses.getById(id)
      .then(res => setCourse(res.data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setCourseLoading(false))
  }, [id])

  const isCreator = user?.id === course?.creator?.id

  const handleCreateLesson = async (data) => {
    const result = await createLesson(data)
    if (result.success) setShowLessonForm(false)
    return result
  }

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm('Tem certeza que deseja excluir esta aula?')) {
      await removeLesson(lessonId)
    }
  }

  const handleDeleteCourse = async () => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      await facade.courses.remove(id)
      navigate('/dashboard')
    }
  }

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value)
    fetchLessons(e.target.value)
  }

  if (courseLoading) return <><Navbar /><Spinner /></>

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        <button onClick={() => navigate('/dashboard')} style={{
          background: 'none', border: 'none', color: '#3b82f6',
          cursor: 'pointer', fontSize: '0.875rem', marginBottom: '1rem', padding: 0
        }}>
          ← Voltar
        </button>

        <div style={{
          background: 'white', border: '1px solid #e5e7eb',
          borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
                {course?.name}
              </h1>
              {course?.description && (
                <p style={{ margin: '0 0 0.5rem', color: '#374151' }}>{course.description}</p>
              )}
              <p style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                {course?.start_date} → {course?.end_date}
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                Por {course?.creator?.name}
              </p>
            </div>
            {isCreator && (
              <button onClick={handleDeleteCourse} style={{
                padding: '0.375rem 0.75rem', background: '#fee2e2',
                color: '#dc2626', border: '1px solid #fca5a5',
                borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.875rem',
                whiteSpace: 'nowrap', marginLeft: '1rem'
              }}>
                Excluir curso
              </button>
            )}
          </div>

          {!course?.description && course?.ai_suggestion && (
            <div style={{
              marginTop: '1rem', padding: '0.75rem 1rem',
              background: '#f5f3ff', border: '1px solid #ddd6fe',
              borderRadius: '0.375rem'
            }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#7c3aed' }}>
                ✨ <strong>Sugestão de descrição por IA:</strong>
              </p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                {course.ai_suggestion}
              </p>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '1rem'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Aulas</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <select value={statusFilter} onChange={handleFilterChange} style={{
              padding: '0.375rem 0.75rem', border: '1px solid #d1d5db',
              borderRadius: '0.375rem', fontSize: '0.875rem'
            }}>
              <option value="">Todas</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicadas</option>
            </select>
            {isCreator && (
              <button onClick={() => setShowLessonForm(true)} style={{
                padding: '0.375rem 0.75rem', background: '#3b82f6',
                color: 'white', border: 'none', borderRadius: '0.375rem',
                cursor: 'pointer', fontSize: '0.875rem'
              }}>
                + Nova Aula
              </button>
            )}
          </div>
        </div>

        {showLessonForm && (
          <div style={{
            background: 'white', border: '1px solid #e5e7eb',
            borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#111827' }}>Nova Aula</h3>
            <LessonForm onSubmit={handleCreateLesson} onCancel={() => setShowLessonForm(false)} />
          </div>
        )}

        {loading && <Spinner />}
        {error && <Alert message={error} />}

        {!loading && lessons.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Nenhuma aula encontrada.</p>
        )}

        {lessons.map(lesson => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            isCreator={isCreator}
            onDelete={handleDeleteLesson}
          />
        ))}
      </div>
    </div>
  )
}