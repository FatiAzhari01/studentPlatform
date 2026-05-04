import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import MyProfilePage from '../pages/MyProfilePage'
import PublicProfilePage from '../pages/PublicProfilePage'
import SearchStudentsPage from '../pages/SearchStudentsPage'

function PrivateRoute({ children }) {
  const { student } = useAuth()
  return student ? children : <Navigate to="/login" />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchStudentsPage />} />
        <Route path="/students/:id" element={<PublicProfilePage />} />
        <Route path="/profile" element={
          <PrivateRoute><MyProfilePage /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
