// src/components/profile/SectionCard.jsx
// Generic card wrapper used by every profile section
import styles from './SectionCard.module.css'

export default function SectionCard({ title, onAdd, addLabel = '+ Add', onManage, manageLabel, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.actions}>
          {onManage && (
            <button className={styles.manageBtn} onClick={onManage}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              {manageLabel || 'Manage'}
            </button>
          )}
          {onAdd && (
            <button className={styles.addBtn} onClick={onAdd}>{addLabel}</button>
          )}
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}