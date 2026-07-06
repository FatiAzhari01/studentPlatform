import styles from './StudentCard.module.css'

export default function StudentCard({ student, onView }) {
  const skills = student.skills?.slice(0, 3) || []
  const initials = (student.headline || student.email || 'S').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        {student.photo_url
          ? <img src={student.photo_url} alt={student.headline} className={styles.avatar}/>
          : <div className={styles.avatarFallback}>{initials}</div>
        }
      </div>
      <h3 className={styles.name}>{student.full_name ||student.headline || 'Student Name'}</h3>
      <p className={styles.field}>{student.field_of_study}</p>
      <p className={styles.degree}>{student.degree?.toUpperCase()}</p>
      <div className={styles.tags}>
        {skills.map((s, i) => (
          <span key={i} className={styles.tag}>{s.name || s}</span>
        ))}
      </div>
      <button className={styles.viewBtn} onClick={onView}>View Profile</button>
    </div>
  )
}