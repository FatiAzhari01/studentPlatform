// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(() => {
    try {
      const s = localStorage.getItem('student')
      return s ? JSON.parse(s) : null
    } catch { return null }
  })

  const login = useCallback((studentData, token) => {
    localStorage.setItem('token',   token)
    localStorage.setItem('student', JSON.stringify(studentData))
    setStudent(studentData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    setStudent(null)
  }, [])

  return (
    <AuthContext.Provider value={{ student, login, logout, isAuthenticated: !!student }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}