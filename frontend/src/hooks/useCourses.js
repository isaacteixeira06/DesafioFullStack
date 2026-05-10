import { useState, useEffect } from 'react'
import facade from '../api/facade'

export function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCourses = async (search = '') => {
    setLoading(true)
    setError(null)
    try {
      const response = await facade.courses.getAll(search)
      setCourses(response.data)
    } catch (err) {
      setError('Erro ao carregar cursos')
    } finally {
      setLoading(false)
    }
  }

  const createCourse = async (data) => {
    try {
      const response = await facade.courses.create(data)
      setCourses(prev => [response.data, ...prev])
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.errors?.join(', ') || 'Erro ao criar curso' }
    }
  }

  const updateCourse = async (id, data) => {
    try {
      const response = await facade.courses.update(id, data)
      setCourses(prev => prev.map(c => c.id === id ? response.data : c))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.errors?.join(', ') || 'Erro ao atualizar curso' }
    }
  }

  const removeCourse = async (id) => {
    try {
      await facade.courses.remove(id)
      setCourses(prev => prev.filter(c => c.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, error: 'Erro ao deletar curso' }
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return { courses, loading, error, fetchCourses, createCourse, updateCourse, removeCourse }
}