import client from './client'

const courses = {
  getAll: (search) => client.get('/api/v1/courses', { params: { search } }),
  getById: (id) => client.get(`/api/v1/courses/${id}`),
  create: (data) => client.post('/api/v1/courses', { course: data }),
  update: (id, data) => client.patch(`/api/v1/courses/${id}`, { course: data }),
  remove: (id) => client.delete(`/api/v1/courses/${id}`)
}

export default courses