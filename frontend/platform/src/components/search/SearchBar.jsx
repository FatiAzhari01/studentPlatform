import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <svg className={styles.icon} width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        className={styles.input}
        placeholder="Search by field, skill, or keyword (e.g. Management, Java, Marketing)"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}