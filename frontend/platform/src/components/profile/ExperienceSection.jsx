import { useState } from 'react'
import { addExperience, updateExperience, deleteExperience } from '../../services/profileService'
import { useToast } from '../ui/Toast'
import SectionCard from './SectionCard'
import ExperienceCard from './ExperienceCard'
import Modal from './SimpleModal'
import styles from './ExperienceSection.module.css'

const TYPE_OPTIONS = [
  { value: 'internship', label: 'Internship' },
  { value: 'job',        label: 'Full-time Job' },
  { value: 'freelance',  label: 'Freelance' },
  { value: 'volunteer',  label: 'Volunteer' },
]

const EMPTY = { title: '', company: '', description: '', start_date: '', end_date: '', type: 'internship' }

export default function ExperienceSection({ items = [], onUpdate }) {
  const toast = useToast()
  const [modal,   setModal  ] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm   ] = useState(EMPTY)
  const [saving,  setSaving ] = useState(false)
  const [deleting,setDeleting]=useState(null)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const openAdd  = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = row => {
    setForm({
      title:       row.title       || '',
      company:     row.company     || '',
      description: row.description || '',
      start_date:  row.start_date  ? String(row.start_date).slice(0,10) : '',
      end_date:    row.end_date    ? String(row.end_date).slice(0,10)   : '',
      type:        row.type        || 'job',
    })
    setEditing(row); setModal(true)
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.company.trim()) {
      toast.error('Title and company are required'); return
    }
    setSaving(true)
    try {
      const payload = {
        title:       form.title.trim(),
        company:     form.company.trim(),
        description: form.description.trim() || null,
        start_date:  form.start_date || null,
        end_date:    form.end_date   || null,
        type:        form.type,
      }
      const res = editing
        ? await updateExperience(editing.id, payload)
        : await addExperience(payload)
      onUpdate('experiences', res.data.data)
      setModal(false)
      toast.success(editing ? 'Experience updated!' : 'Experience added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return
    setDeleting(id)
    try {
      await deleteExperience(id)
      onUpdate('experiences', items.filter(e => e.id !== id))
      toast.success('Experience removed')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  return (
    <>
      <SectionCard title="Experience" onAdd={openAdd}>
        {items.length === 0
          ? <p className={styles.empty}>No experience entries yet.</p>
          : items.map(exp => (
            <ExperienceCard
              key={exp.id}
              title={exp.title}
              company={exp.company}
              description={exp.description}
              startDate={exp.start_date}
              endDate={exp.end_date}
              type={exp.type}
              onEdit={() => openEdit(exp)}
              onDelete={() => handleDelete(exp.id)}
            />
          ))
        }
      </SectionCard>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Experience' : 'Add Experience'}>
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Job Title <span className={styles.req}>*</span></label>
            <input className={styles.input} placeholder="Software Engineering Intern" value={form.title} onChange={set('title')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Company <span className={styles.req}>*</span></label>
            <input className={styles.input} placeholder="CloudScale Solutions" value={form.company} onChange={set('company')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Type</label>
            <select className={styles.input} value={form.type} onChange={set('type')}>
              {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Start Date</label>
              <input className={styles.input} type="date" value={form.start_date} onChange={set('start_date')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>End Date</label>
              <input className={styles.input} type="date" value={form.end_date} onChange={set('end_date')} />
              <span className={styles.hint}>Leave blank if current</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea className={`${styles.input} ${styles.textarea}`} rows={4}
              placeholder="Describe your role and achievements…"
              value={form.description} onChange={set('description')} />
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnOutline} onClick={() => setModal(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Experience'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
