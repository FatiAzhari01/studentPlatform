// src/components/profile/ProfileHeader.jsx
import { useState } from 'react'
import { useToast } from '../ui/Toast'
import { updateProfile } from '../../services/profileService'
import Modal from '../ui/Modal'
import FormField from '../ui/FormField'
import Button from '../ui/Button'
import styles from './ProfileHeader.module.css'

export default function ProfileHeader({ profile, onUpdate }) {
  const toast = useToast()
  const [editing, setEditing] = useState(false)
  const [saving,  setSaving ] = useState(false)
  const [form, setForm] = useState({
    full_name:      profile.full_name      || '',
    headline:       profile.headline       || '',
    city:           profile.city           || '',
    linkedin_url:   profile.linkedin_url   || '',
    field_of_study: profile.field_of_study || '',
  })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = async () => {
    if (!form.full_name.trim()) {
      toast.error('Full name is required')
      return
    }
    setSaving(true)
    try {
      const { data } = await updateProfile(form)
      onUpdate(data.data)
      setEditing(false)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const avatarUrl = profile.photo_url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'S')}&background=2563eb&color=fff&size=100&bold=true`

  return (
    <>
      <div className={styles.card}>
        <div className={styles.inner}>
          {/* Avatar */}
          <div className={styles.avatarWrap}>
            <img src={avatarUrl} alt={profile.full_name} className={styles.avatar} />
            <button className={styles.avatarBtn} title="Change photo">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div>
              <h1 className={styles.name}>{profile.full_name || '—'}</h1>
              <p className={styles.headline}>{profile.headline || '—'}</p>
              <div className={styles.meta}>
                {profile.email && (
                  <span className={styles.metaItem}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2"/></svg>
                    {profile.email}
                  </span>
                )}
                {profile.city && (
                  <span className={styles.metaItem}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1a4 4 0 014 4c0 3-4 8-4 8S3 8 3 5a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                    {profile.city}
                  </span>
                )}
              </div>
            </div>
            <button className={styles.editBtn} onClick={() => { setForm({ full_name: profile.full_name||'', headline: profile.headline||'', city: profile.city||'', linkedin_url: profile.linkedin_url||'', field_of_study: profile.field_of_study||'' }); setEditing(true) }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2l3 3-8 8H1v-3L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editing} onClose={() => setEditing(false)} title="Edit Profile">
        <div className={styles.form}>
          <FormField id="full_name"  label="Full Name"       value={form.full_name}      onChange={set('full_name')}      placeholder="Ahmed Kamili"   required />
          <FormField id="headline"   label="Headline"        value={form.headline}       onChange={set('headline')}       placeholder="B.Sc. Computer Science & Engineering" />
          <FormField id="fos"        label="Field of Study"  value={form.field_of_study} onChange={set('field_of_study')} placeholder="Computer Science" />
          <FormField id="city"       label="City, Country"   value={form.city}           onChange={set('city')}           placeholder="Meknes, Morocco" />
          <FormField id="linkedin"   label="LinkedIn URL"    value={form.linkedin_url}   onChange={set('linkedin_url')}   placeholder="https://linkedin.com/in/..." type="url" />
          <div className={styles.formActions}>
            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}