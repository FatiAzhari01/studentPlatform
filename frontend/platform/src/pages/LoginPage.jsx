import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginApi } from '../services/authService'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const successMsg = location.state?.success || ''
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Email and password are required'); return }

    setLoading(true)
    try {
      const { data } = await loginApi(form)
      login(data.student, data.token)
      navigate('/profile')
    } catch (err) {
      // Fixed: reads .message not .error
      const msg = err.response?.data?.message
             || err.response?.data?.error
             || 'Invalid credentials'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLogo}>Student Platform</Link>
        <Link to="/register" className={styles.navLinkBtn}>Sign Up</Link>
      </nav>

      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.iconWrap}>👤</div>
            <h1 className={styles.cardTitle}>Welcome back</h1>
            <p className={styles.cardSub}>Sign in to your Student Platform account</p>
          </div>

          {successMsg && <p className={styles.successMsg}>{successMsg}</p>}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                placeholder="student@university.edu"
                value={form.email}
                onChange={set('email')}
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={set('password')}
                autoComplete="current-password"
                required
              />
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className={styles.switchLink}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
