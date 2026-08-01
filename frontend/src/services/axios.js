import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add JWT
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

// Response interceptor to handle auth errors
instance.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
      // clear token and notify app
      try { localStorage.removeItem('token') } catch(e) {}
      window.dispatchEvent(new Event('logout'))
      // optional redirect
      if (typeof window !== 'undefined') {
        window.location = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default instance
