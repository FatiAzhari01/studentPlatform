import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 6.5V9c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L10 2z"
                  fill="white" opacity=".3"/>
                <path d="M10 2L2 6.5V9c0 4.5 3.4 8.7 8 9.9 4.6-1.2 8-5.4 8-9.9V6.5L10 2z"
                  stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>Student Platform</span>
          </Link>
          <p className={styles.tagline}>
            The secure, verified platform for modern academic and professional portfolio management.
          </p>
          <p className={styles.copy}>© 2025 Smart University. All rights reserved.</p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Platform</h4>
          <Link to="/search" className={styles.colLink}>For Students</Link>
          <Link to="/search" className={styles.colLink}>For Institutions</Link>
          <Link to="/search" className={styles.colLink}>For Recruiters</Link>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Support</h4>
          <a href="#" className={styles.colLink}>Help Center</a>
          <a href="#" className={styles.colLink}>Privacy Policy</a>
          <a href="#" className={styles.colLink}>Terms of Service</a>
        </div>

      </div>
    </footer>
  )
}