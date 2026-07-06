import { useState } from 'react'
import { addProject, updateProject, deleteProject } from '../../services/profileService'
import { useToast } from '../ui/Toast'
import SectionCard from './SectionCard'
import ProjectCard from './ProjectCard'
import Modal from './SimpleModal'
import styles from './ProjectsSection.module.css'

const EMPTY = { title: '', description: '', project_url: '', tech_stack: '' }

export default function ProjectsSection({ items = [], onUpdate }) {
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
      description: row.description || '',
      project_url: row.project_url || '',
      tech_stack:  Array.isArray(row.tech_stack)
        ? row.tech_stack.join(', ')
        : (() => { try { return JSON.parse(row.tech_stack || '[]').join(', ') } catch { return '' } })(),
    })
    setEditing(row); setModal(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    try {
      const stack = form.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
      const payload = {
        title:       form.title.trim(),
        description: form.description.trim() || null,
        project_url: form.project_url.trim()  || null,
        tech_stack:  stack,
      }
      const res = editing
        ? await updateProject(editing.id, payload)
        : await addProject(payload)
      onUpdate('projects', res.data.data)
      setModal(false)
      toast.success(editing ? 'Project updated!' : 'Project added!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    setDeleting(id)
    try {
      await deleteProject(id)
      onUpdate('projects', items.filter(p => p.id !== id))
      toast.success('Project removed')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  return (
    <>
      <SectionCard title="Projects" onAdd={openAdd}>
        {items.length === 0
          ? <p className={styles.empty}>No projects yet.</p>
          : items.map(proj => (
            <ProjectCard
              key={proj.id}
              title={proj.title}
              description={proj.description}
              projectUrl={proj.project_url}
              techStack={proj.tech_stack}
              onEdit={() => openEdit(proj)}
              onDelete={() => handleDelete(proj.id)}
            />
          ))
        }
      </SectionCard>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Project' : 'Add Project'}>
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Project Title <span className={styles.req}>*</span></label>
            <input className={styles.input} placeholder="Nexus Data Visualizer" value={form.title} onChange={set('title')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea className={`${styles.input} ${styles.textarea}`} rows={3}
              placeholder="What does this project do?" value={form.description} onChange={set('description')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Project URL</label>
            <input className={styles.input} type="url" placeholder="https://github.com/…" value={form.project_url} onChange={set('project_url')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tech Stack</label>
            <input className={styles.input} placeholder="React, D3.js, Node.js" value={form.tech_stack} onChange={set('tech_stack')} />
            <span className={styles.hint}>Comma-separated list</span>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnOutline} onClick={() => setModal(false)}>Cancel</button>
            <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
