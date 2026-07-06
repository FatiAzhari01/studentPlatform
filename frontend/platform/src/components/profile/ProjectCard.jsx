import styles from './ProjectCard.module.css'

export default function ProjectCard({ title, description, projectUrl, techStack, onEdit, onDelete }) {
  const stack = Array.isArray(techStack)
    ? techStack
    : (() => { try { return JSON.parse(techStack || '[]') } catch { return [] } })()

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <div className={styles.actions}>
          {projectUrl && (
            <a href={projectUrl} target="_blank" rel="noreferrer" className={styles.iconBtn} title="Open project">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M6 2H2.5A1.5 1.5 0 001 3.5v8A1.5 1.5 0 002.5 13h8A1.5 1.5 0 0012 11.5V8M9 1h4v4M13 1l-7 7"
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          {onEdit && (
            <button className={styles.iconBtn} onClick={onEdit} title="Edit project">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {onDelete && (
            <button className={`${styles.iconBtn} ${styles.delBtn}`} onClick={onDelete} title="Delete project">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.7 7.5h6.6L11 4"
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      {description && <p className={styles.desc}>{description}</p>}
      {stack.length > 0 && (
        <div className={styles.tags}>
          {stack.map((t, i) => (
            <span key={i} className={styles.tag}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
