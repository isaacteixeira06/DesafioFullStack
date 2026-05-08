import client from './client'

const auth = {
  register: (data) => client.post('/api/v1/auth/register', data),
  login: (data) => client.post('/api/v1/auth/login', data)
}

export default auth