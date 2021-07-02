import { getToken, logout } from './auth'

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

api.interceptors.request.use(async (config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
api.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    if (error.response.status == 401) {
      await logout()
      window.location.reload()
    } else {
      return error
    }
  }
)

export default api
