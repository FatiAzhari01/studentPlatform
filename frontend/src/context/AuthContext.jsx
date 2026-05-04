import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('student')
    return saved ? JSON.parse(saved) : null
  })

  const login = (studentData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('student', JSON.stringify(studentData))
    setStudent(studentData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('student')
    setStudent(null)
  }

  return (
    <AuthContext.Provider value={{ student, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
