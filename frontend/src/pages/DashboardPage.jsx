import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import CourseCard from '../components/courses/CourseCard'
import CourseForm from '../components/courses/CourseForm'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'
import { useCourses } from '../hooks/useCourses'

export default function DashboardPage() {
  const { courses, loading, error, fetchCourses, createCourse, removeCourse } = useCourses()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
    fetchCourses(e.target.value)
  }

  const handleCreate = async (data) => {
    const result = await createCourse(data)
    if (result.success) setShowForm(false)
    return result
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      await removeCourse(id)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar />

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Meus Cursos</h1>
          <button onClick={() => setShowForm(true)} style={{
            padding: '0.5rem 1.25rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            + Novo Curso
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem' }}>Novo Curso</h2>
            <CourseForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
          </div>
        )}

        <input
          type="text"
          placeholder="Buscar cursos..."
          value={search}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            boxSizing: 'border-box'
          }}
        />

        {loading && <Spinner />}
        {error && <Alert message={error} />}

        {!loading && courses.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>
            Nenhum curso encontrado.
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}