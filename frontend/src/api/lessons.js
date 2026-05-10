import client from './client'

const lessons = {
  getAll: (courseId, status) => client.get(`/api/v1/courses/${courseId}/lessons`, { params: { status } }),
  create: (courseId, data) => client.post(`/api/v1/courses/${courseId}/lessons`, { lesson: data }),
  update: (courseId, id, data) => client.patch(`/api/v1/courses/${courseId}/lessons/${id}`, { lesson: data }),
  remove: (courseId, id) => client.delete(`/api/v1/courses/${courseId}/lessons/${id}`)
}

export default lessons