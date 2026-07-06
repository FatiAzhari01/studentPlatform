import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { student, logout } = useAuth()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L2 6.5V9c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L10 2z"
                fill="currentColor" opacity=".2"/>
              <path d="M10 2L2 6.5V9c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L10 2z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className={styles.logoText}>Student Platform</span>
        </Link>

        {/* Center nav links */}
        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <Link to="/search"
            className={`${styles.link} ${location.pathname === '/search' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}>
            Search Students
          </Link>
        </div>

        {/* CTA buttons */}
        <div className={styles.actions}>
          {student ? (
            <>
              <Link to="/profile" className={styles.btnGhost}>My Profile</Link>
              <button className={styles.btnOutline} onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login"    className={styles.btnGhost}>Login</Link>
              <Link to="/register" className={styles.btnPrimary}>Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu">
          <span /><span /><span />
        </button>

      </div>
    </nav>
  )
}