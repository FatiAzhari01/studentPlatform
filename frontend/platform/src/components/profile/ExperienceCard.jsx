import styles from './ExperienceCard.module.css'

const TYPE_LABELS = {
  internship: 'Internship',
  job:        'Full-time',
  freelance:  'Freelance',
  volunteer:  'Volunteer',
}

function fmtDate(d) {
  if (!d) return 'Present'
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
  catch { return d }
}

export default function ExperienceCard({ title, company, description, startDate, endDate, type, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.company}>{company}</p>
        {type && (
          <span className={styles.typeBadge}>{TYPE_LABELS[type] || type}</span>
        )}
        {description && <p className={styles.desc}>{description}</p>}
        {onEdit && (
          <button className={styles.editInline} onClick={onEdit}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            Edit
          </button>
        )}
      </div>
      <div className={styles.right}>
        <span className={styles.dates}>
          {fmtDate(startDate)} — {fmtDate(endDate)}
        </span>
        {onDelete && (
          <button className={`${styles.iconBtn} ${styles.delBtn}`} onClick={onDelete} title="Delete">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
