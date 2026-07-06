import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
import Navbar from '../components/layout/Navbar'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import styles from './AuthPage.module.css'

const STEPS = ['Verification', 'Personal Details', 'Account Security']

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    studentCode: '', email: '',
    fullName: '', fieldOfStudy: '',
    password: '', confirmPassword: ''
  })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const nextStep = (e) => { e.preventDefault(); setError(''); setStep(s => s + 1) }
  const prevStep = () => setStep(s => s - 1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      await register({
        studentCode: form.studentCode,
        email: form.email,
        fullName: form.fullName,
        fieldOfStudy: form.fieldOfStudy,
        password: form.password
      })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally { setLoading(false) }
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.center}>
        <div className={styles.card}>

          {/* Progress */}
          <div className={styles.progress}>
            <div className={styles.progressMeta}>
              <span className={styles.stepLabel}>STEP {step} OF {STEPS.length}</span>
              <span className={styles.stepName}>{STEPS[step - 1]}</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress + 16}%` }} />
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={nextStep} className={styles.form}>
              <div className={styles.cardHead}>
                <div className={styles.iconWrap}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L3 6v3c0 5 3.6 9.5 8 10.8 4.4-1.3 8-5.8 8-10.8V6L11 2z" stroke="#2563eb" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M8 11l2 2 4-4" stroke="#2563eb" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 className={styles.cardTitle}>Student Registration</h1>
                <p className={styles.cardSub}>Verify your student status to begin.</p>
              </div>
              <Input id="studentCode" label="Student ID (CNE / university code)"
                placeholder="e.g. 1234567890" value={form.studentCode} onChange={set('studentCode')} required
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h6M5 5.5h6M5 10.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>}
              />
              <Input id="email" label="University Email" type="email"
                placeholder="student@university.edu" value={form.email} onChange={set('email')} required
                hint="We'll send a one-time verification link to this email."
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 5l6 4.5L14 5" stroke="currentColor" strokeWidth="1.3"/></svg>}
              />
              {error && <p className={styles.errorMsg}>{error}</p>}
              <Button type="submit" fullWidth>Verify &amp; Continue →</Button>
              <div className={styles.securityBadges}>
                <span>🔒 Secure Verification Process</span>
                <span>•</span>
                <span>🔐 AES-256 Encrypted</span>
              </div>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={nextStep} className={styles.form}>
              <h1 className={styles.cardTitle}>Personal Details</h1>
              <p className={styles.cardSub}>Tell us a bit more about yourself.</p>
              <Input id="fullName" label="Full Name"
                placeholder="Your full name" value={form.fullName} onChange={set('fullName')} required
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>}
              />
              <Input id="fieldOfStudy" label="Field of Study"
                placeholder="e.g. Computer Science" value={form.fieldOfStudy} onChange={set('fieldOfStudy')} required
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L1 6l7 4 7-4-7-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M1 10l7 4 7-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              />
              {error && <p className={styles.errorMsg}>{error}</p>}
              <div className={styles.stepBtns}>
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="submit">Next Step →</Button>
              </div>
            </form>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h1 className={styles.cardTitle}>Account Setup</h1>
              <p className={styles.cardSub}>Create your password to secure your account.</p>
              <Input id="password" label="Password" type="password"
                placeholder="At least 8 characters" value={form.password} onChange={set('password')} required
              />
              <Input id="confirmPassword" label="Confirm Password" type="password"
                placeholder="Repeat your password" value={form.confirmPassword} onChange={set('confirmPassword')} required
              />
              <div className={styles.passwordHint}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="#2563eb" strokeWidth="1.2"/>
                  <path d="M7 6v4M7 4.5v.5" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                A strong password contains a mix of letters, numbers, and special symbols.
              </div>
              {error && <p className={styles.errorMsg}>{error}</p>}
              <div className={styles.stepBtns}>
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Account'}</Button>
              </div>
              <p className={styles.terms}>
                By creating an account, you agree to our{' '}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </p>
            </form>
          )}

          <p className={styles.switchLink}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}