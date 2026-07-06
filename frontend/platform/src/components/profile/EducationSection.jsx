import { useState } from 'react'
import { addEducation, updateEducation, deleteEducation } from '../../services/profileService'
import { useToast } from '../ui/Toast'
import SectionCard from './SectionCard'
import EducationCard from './EducationCard'
import Modal from './SimpleModal'
import styles from './EducationSection.module.css'

const EMPTY = { degree: '', institution: '', field_of_study: '', start_year: '', end_year: '', gpa: '' }

export default function EducationSection({ items = [], onUpdate }) {
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
      degree:        row.degree         || '',
      institution:   row.institution    || '',
      field_of_study:row.field_of_study || '',
      start_year:    row.start_year     || '',
      end_year:      row.end_year       || '',
      gpa:           row.gpa            || '',
    })
    setEditing(row); setModal(true)
  }

  const handleSave = async () => {
    if (!form.degree.trim() || !form.institution.trim()) {
      toast.error('Degree and institution are required'); return
    }
    setSaving(true)
    try {
      const payload = {
        degree:         form.degree.trim(),
        institution:    form.institution.trim(),
        field_of_study: form.field_of_study.trim() || null,
        start_year:     form.start_year ? Number(form.start_year) : null,
        end_year:       form.end_year   ? Number(form.end_year)   : null,
        gpa:            form.gpa        ? parseFloat(form.gpa)    : null,
      }
      const res = editing
        ? await updateEducation(editing.id, payload)
        : await addEducation(payload)
      onUpdate('education', res.data.data)
      setModal(false)
      toast.success(editing ? 'Education updated!' : 'Education added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education entry?')) return
    setDeleting(id)
    try {
      await deleteEducation(id)
      onUpdate('education', items.filter(e => e.id !== id))
      toast.success('Education removed')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  return (
    <>
      <SectionCard title="Education" onAdd={openAdd} addLabel="✏️ Edit  + Add">
        {items.length === 0
          ? <p className={styles.empty}>No education entries yet.</p>
          : items.map(edu => (
            <EducationCard
              key={edu.id}
              degree={edu.degree}
              institution={edu.institution}
              fieldOfStudy={edu.field_of_study}
              startYear={edu.start_year}
              endYear={edu.end_year}
              gpa={edu.gpa}
              onEdit={() => openEdit(edu)}
              onDelete={() => handleDelete(edu.id)}
            />
          ))
        }
      </SectionCard>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Education' : 'Add Education'}>
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Degree <span className={styles.req}>*</span></label>
            <input className={styles.input} placeholder="Bachelor of Science in Computer Science" value={form.degree} onChange={set('degree')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Institution <span className={styles.req}>*</span></label>
            <input className={styles.input} placeholder="Stanford University" value={form.institution} onChange={set('institution')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Field of Study</label>
            <input className={styles.input} placeholder="Computer Science" value={form.field_of_study} onChange={set('field_of_study')} />
          </div>
          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>Start Year</label>
              <input className={styles.input} type="number" placeholder="2021" value={form.start_year} onChange={set('start_year')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>End Year</label>
              <input className={styles.input} type="number" placeholder="2025" value={form.end_year} onChange={set('end_year')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>GPA</label>
              <input className={styles.input} type="number" step="0.01" placeholder="3.80" value={form.gpa} onChange={set('gpa')} />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnOutline} onClick={() => setModal(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
