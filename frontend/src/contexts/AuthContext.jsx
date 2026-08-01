import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../services/axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    const onLogoutEvent = () => {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
      navigate('/login')
    }
    window.addEventListener('logout', onLogoutEvent)
    return () => window.removeEventListener('logout', onLogoutEvent)
  }, [navigate])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      // load profile
      axios.get('/api/user/profile').then(res => setUser(res.data)).catch(() => {
        // ignore
      })
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = (t) => {
    setToken(t)
  }
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    // notify axios interceptor or other listeners
    window.dispatchEvent(new Event('logout'))
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
