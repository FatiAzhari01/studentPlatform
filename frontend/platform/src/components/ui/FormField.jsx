// src/components/ui/FormField.jsx
import styles from './FormField.module.css'

export default function FormField({
  label, id, type = 'text', value, onChange,
  placeholder, error, required, rows,
  options,   // for <select>
  hint,
  ...rest
}) {
  const inputProps = {
    id, value, onChange, placeholder, required,
    className: `${styles.input} ${error ? styles.inputError : ''}`,
    ...rest
  }

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}{required && <span className={styles.req}> *</span>}
        </label>
      )}

      {options ? (
        <select {...inputProps} className={`${styles.input} ${error ? styles.inputError : ''}`}>
          <option value="">Select…</option>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : rows ? (
        <textarea {...inputProps} rows={rows} className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`} />
      ) : (
        <input type={type} {...inputProps} />
      )}

      {hint  && !error && <p className={styles.hint}>{hint}</p>}
      {error &&           <p className={styles.error}>{error}</p>}
    </div>
  )
}
