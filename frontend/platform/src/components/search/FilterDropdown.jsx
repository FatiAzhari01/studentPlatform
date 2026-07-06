import { useState, useRef, useEffect } from 'react'
import styles from './FilterDropdown.module.css'

export default function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (opt) => { onChange(opt === value ? '' : opt); setOpen(false) }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={`${styles.trigger} ${value ? styles.active : ''}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {value || label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{transform: open ? 'rotate(180deg)' : undefined, transition: 'transform .15s'}}>
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map(opt => (
            <button
              key={opt}
              className={`${styles.option} ${opt === value ? styles.selected : ''}`}
              onClick={() => select(opt)}
              type="button"
            >
              {opt}
              {opt === value && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}