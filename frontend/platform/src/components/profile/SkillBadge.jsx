import styles from './SkillBadge.module.css'

export default function SkillBadge({ name, category, onDelete }) {
  return (
    <span className={`${styles.badge} ${styles[category] || ''}`}>
      {name}
      {onDelete && (
        <button className={styles.del} onClick={() => onDelete()} title="Remove skill" aria-label={`Remove ${name}`}>
          ×
        </button>
      )}
    </span>
  )
}
