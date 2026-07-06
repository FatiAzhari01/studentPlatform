import { useState } from 'react'
import { addSkill, deleteSkill } from '../../services/profileService'
import { useToast } from '../ui/Toast'
import SectionCard from './SectionCard'
import SkillBadge from './SkillBadge'
import Modal from './SimpleModal'
import styles from './SkillsSection.module.css'

const CAT_OPTIONS = [
  { value: 'technical', label: 'Technical' },
  { value: 'soft',      label: 'Soft Skill' },
  { value: 'tool',      label: 'Tool' },
]

export default function SkillsSection({ items = [], onUpdate }) {
  const toast = useToast()
  const [modal,   setModal   ] = useState(false)
  const [name,    setName    ] = useState('')
  const [category,setCategory] = useState('technical')
  const [saving,  setSaving  ] = useState(false)

  const handleAdd = async () => {
    if (!name.trim()) { toast.error('Skill name is required'); return }
    setSaving(true)
    try {
      const { data } = await addSkill({ name: name.trim(), category })
      onUpdate('skills', data.data)
      setName(''); setModal(false)
      toast.success('Skill added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add skill')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id)
      onUpdate('skills', items.filter(s => s.id !== id))
      toast.success('Skill removed')
    } catch { toast.error('Failed to delete skill') }
  }

  return (
    <>
      <SectionCard
        title="Skills"
        onAdd={() => setModal(true)}
        addLabel="✏️ Manage"
      >
        {items.length === 0
          ? <p className={styles.empty}>No skills added yet.</p>
          : (
            <div className={styles.tags}>
              {items.map(s => (
                <SkillBadge
                  key={s.id}
                  name={s.name}
                  category={s.category}
                  onDelete={() => handleDelete(s.id)}
                />
              ))}
            </div>
          )
        }
      </SectionCard>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Skill">
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Skill name</label>
            <input
              className={styles.input}
              placeholder="e.g. Python, React, Agile"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} value={category} onChange={e => setCategory(e.target.value)}>
              {CAT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnOutline} onClick={() => setModal(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={handleAdd} disabled={saving}>
              {saving ? 'Adding…' : 'Add Skill'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
