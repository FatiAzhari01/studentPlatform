import styles from './EducationCard.module.css'

export default function EducationCard({ degree, institution, fieldOfStudy, startYear, endYear, gpa, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <p className={styles.degree}>{degree}</p>
        <p className={styles.institution}>{institution}</p>
        {fieldOfStudy && <p className={styles.meta}>{fieldOfStudy}</p>}
        {gpa          && <p className={styles.meta}>GPA: {gpa}/4.0</p>}
      </div>
      <div className={styles.right}>
        <span className={styles.years}>
          {startYear} — {endYear || 'Present'}
        </span>
        {(onEdit || onDelete) && (
          <div className={styles.actions}>
            {onEdit && (
              <button className={styles.iconBtn} onClick={onEdit} title="Edit">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {onDelete && (
              <button className={`${styles.iconBtn} ${styles.delBtn}`} onClick={onDelete} title="Delete">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
