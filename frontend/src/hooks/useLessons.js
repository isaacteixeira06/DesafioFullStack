import { useState, useEffect } from 'react'
import facade from '../api/facade'

export function useLessons(courseId) {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLessons = async (status = '') => {
    setLoading(true)
    setError(null)
    try {
      const response = await facade.lessons.getAll(courseId, status)
      setLessons(response.data)
    } catch {
      setError('Erro ao carregar aulas')
    } finally {
      setLoading(false)
    }
  }

  const createLesson = async (data) => {
    try {
      const response = await facade.lessons.create(courseId, data)
      setLessons(prev => [...prev, response.data])
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.errors?.join(', ') || 'Erro ao criar aula' }
    }
  }

  const updateLesson = async (id, data) => {
    try {
      const response = await facade.lessons.update(courseId, id, data)
      setLessons(prev => prev.map(l => l.id === id ? response.data : l))
      return { success: true }
    } catch (err) {
      return { success: false, error: 'Erro ao atualizar aula' }
    }
  }

  const removeLesson = async (id) => {
    try {
      await facade.lessons.remove(courseId, id)
      setLessons(prev => prev.filter(l => l.id !== id))
      return { success: true }
    } catch {
      return { success: false, error: 'Erro ao deletar aula' }
    }
  }

  useEffect(() => {
    if (courseId) fetchLessons()
  }, [courseId])

  return { lessons, loading, error, fetchLessons, createLesson, updateLesson, removeLesson }
}