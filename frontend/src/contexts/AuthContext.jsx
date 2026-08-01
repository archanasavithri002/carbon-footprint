import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../services/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      // Optionally load profile
      axios.get('/api/user/profile').then(res => setUser(res.data)).catch(() => {
        // ignore
      })
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = (t) => setToken(t)
  const logout = () => { setToken(null); setUser(null); }

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
