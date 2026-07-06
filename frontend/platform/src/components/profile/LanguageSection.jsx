import { useState } from 'react'
import { addLanguage, updateLanguage, deleteLanguage } from '../../services/profileService'
import { useToast } from '../ui/Toast'
import SectionCard from './SectionCard'
import LanguageCard from './LanguageCard'
import Modal from './SimpleModal'
import styles from './LanguagesSection.module.css'

const LEVELS = ['native','bilingual','fluent','professional','intermediate','basic']
const EMPTY  = { name: '', proficiency_level: 'fluent' }

export default function LanguagesSection({ items = [], onUpdate }) {
  const toast = useToast()
  const [modal,   setModal  ] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm   ] = useState(EMPTY)
  const [saving,  setSaving ] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const openAdd  = () => { setForm(EMPTY); setEditing(null); setModal(true) }
  const openEdit = row => {
    setForm({ name: row.name, proficiency_level: row.proficiency_level })
    setEditing(row); setModal(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Language name is required'); return }
    setSaving(true)
    try {
      const res = editing
        ? await updateLanguage(editing.id, form)
        : await addLanguage(form)
      onUpdate('languages', res.data.data)
      setModal(false)
      toast.success(editing ? 'Language updated!' : 'Language added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this language?')) return
    try {
      await deleteLanguage(id)
      onUpdate('languages', items.filter(l => l.id !== id))
      toast.success('Language removed')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <>
      <SectionCard title="Languages" onAdd={openAdd}>
        {items.length === 0
          ? <p className={styles.empty}>No languages added yet.</p>
          : (
            <div className={styles.grid}>
              {items.map(l => (
                <LanguageCard
                  key={l.id}
                  name={l.name}
                  proficiencyLevel={l.proficiency_level}
                  onEdit={() => openEdit(l)}
                  onDelete={() => handleDelete(l.id)}
                />
              ))}
            </div>
          )
        }
      </SectionCard>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editing ? 'Edit Language' : 'Add Language'}
      >
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Language</label>
            <input
              className={styles.input}
              placeholder="e.g. English, Arabic, French"
              value={form.name}
              onChange={set('name')}
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Proficiency Level</label>
            <select className={styles.input} value={form.proficiency_level} onChange={set('proficiency_level')}>
              {LEVELS.map(l => (
                <option key={l} value={l}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnOutline} onClick={() => setModal(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Language'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
