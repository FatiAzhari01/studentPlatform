// src/components/ui/Toast.jsx
// Lightweight toast system — wrap app with <ToastProvider>, call useToast() anywhere

import { createContext, useContext, useState, useCallback } from 'react'
import styles from './Toast.module.css'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  const success = useCallback((msg) => add(msg, 'success'), [add])
  const error   = useCallback((msg) => add(msg, 'error'),   [add])

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <div className={styles.container}>
        {toasts.map(t => (
          <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
            {t.type === 'success'
              ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#22c55e" opacity=".15"/><path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#ef4444" opacity=".15"/><path d="M5 5l6 6M11 5l-6 6" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}