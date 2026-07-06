import styles from './LanguageCard.module.css'

const LEVEL_COLOR = {
  native:        'native',
  bilingual:     'native',
  fluent:        'fluent',
  professional:  'professional',
  intermediate:  'intermediate',
  basic:         'basic',
}

export default function LanguageCard({ name, proficiencyLevel, onEdit, onDelete }) {
  const colorClass = LEVEL_COLOR[proficiencyLevel] || 'basic'

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <p className={styles.name}>{name}</p>
        <span className={`${styles.level} ${styles[colorClass]}`}>
          {proficiencyLevel}
        </span>
      </div>
      {(onEdit || onDelete) && (
        <div className={styles.actions}>
          {onEdit && (
            <button className={styles.iconBtn} onClick={onEdit} title="Edit language">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {onDelete && (
            <button className={`${styles.iconBtn} ${styles.delBtn}`} onClick={onDelete} title="Remove language">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4"
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
