import styles from './Input.module.css'

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  hint,
  required = false,
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.req}>*</span>}
        </label>
      )}
      <div className={`${styles.inputWrap} ${error ? styles.hasError : ''}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${icon ? styles.withIcon : ''}`}
          required={required}
          {...props}
        />
      </div>
      {hint  && !error && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}