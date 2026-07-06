import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { getMyProfile, updateProfile, addEducation, addExperience, addSkill, addLanguage } from '../services/profileService'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import styles from './MyProfilePage.module.css'

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // 'education' | 'experience' | 'skill' | 'language'

  const load = async () => {
    try { const res = await getMyProfile()
          setProfile(res.data.data) }
    catch { console.error('Failed to load profile') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  if (loading) return (
    <div className={styles.page}><Navbar />
      <div className={styles.loading}>Loading profile…</div>
    </div>
  )

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={`container ${styles.inner}`}>

          {/* Header card */}
          <div className={styles.card}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarWrap}>
                <img
                  src={profile?.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.headline || 'S')}&background=2563eb&color=fff&size=80`}
                  alt="Avatar" className={styles.avatar}
                />
                <button className={styles.avatarEdit} title="Change photo">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2l3 3L4 13H1v-3L9 2z" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className={styles.headerInfo}>
                <div>
                  <p className={styles.headerName}>
                  {profile?.full_name || 'Your Name'}</p>
                  <p className={styles.headerField}>
                  {profile?.headline || 'Student'}</p>
                  <p className={styles.headerCity}>
                   {profile?.city || 'City, Country'}</p>
                  
                </div>
                <button className={styles.editBtn} onClick={() => setModal('header')}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>
          <EditProfileModal
          
           isOpen={modal === 'header'}
           profile={profile}
           onClose={() => setModal(null)}
           onSave={async (data) => {
           await updateProfile(data)
           await load()
           setModal(null)}}/>

          {/* Education */}
          <Section title="Education" onAdd={() => setModal('education')}>
            {profile?.education?.length ? profile.education.map((e, i) => (
              <div key={i} className={styles.item}>
                <p className={styles.itemTitle}>{e.degree}</p>
                <p className={styles.itemSub}>{e.institution}</p>
                <p className={styles.itemMeta}>{e.start_year} — {e.end_year || 'Present'}</p>
              </div>
            )) : <p className={styles.empty}>No education added yet.</p>}
          </Section>

          {/* Experience */}
          <Section title="Experience" onAdd={() => setModal('experience')}>
            {profile?.experiences?.length ? profile.experiences.map((e, i) => (
              <div key={i} className={styles.item}>
                <p className={styles.itemTitle}>{e.title}</p>
                <p className={styles.itemSub} style={{color:'var(--blue-600)'}}>{e.company}</p>
                <p className={styles.itemMeta}>{e.start_date} — {e.end_date || 'Present'}</p>
                <p className={styles.itemDesc}>{e.description}</p>
              </div>
            )) : <p className={styles.empty}>No experience added yet.</p>}
          </Section>
          {/* Projects */}
<Section title="Projects" onAdd={() => setModal('project')}>
  {profile?.projects?.length ? profile.projects.map((p, i) => (
    <div key={i} className={styles.item}>
      <p className={styles.itemTitle}>{p.title}</p>

      <p className={styles.itemDesc}>
        {p.description}
      </p>

      <div className={styles.tags}>
        {p.tech_stack?.map((tech, idx) => (
          <span key={idx} className={styles.tag}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  )) : (
    <p className={styles.empty}>No projects added yet.</p>
  )}
</Section>

          {/* Skills */}
          <Section title="Skills" onAdd={() => setModal('skill')} addLabel="Manage">
            <div className={styles.tags}>
              {profile?.skills?.length
                ? profile.skills.map((s,i) => <span key={i} className={styles.tag}>{s.name}</span>)
                : <p className={styles.empty}>No skills added yet.</p>}
            </div>
          </Section>

          {/* Languages */}
          <Section title="Languages" onAdd={() => setModal('language')}>
            <div className={styles.langGrid}>
              {profile?.languages?.length
                ? profile.languages.map((l, i) => (
                  <div key={i} className={styles.langItem}>
                    <p className={styles.langName}>{l.name}</p>
                    <p className={styles.langLevel}>{l.proficiency_level}</p>
                  </div>
                ))
                : <p className={styles.empty}>No languages added yet.</p>}
            </div>
          </Section>

        </div>
      </main>

      {/* Modals */}
      <AddEducationModal isOpen={modal === 'education'} onClose={() => setModal(null)} onSave={async (d) => { await addEducation(d); await load(); setModal(null) }} />
      <AddExperienceModal isOpen={modal === 'experience'} onClose={() => setModal(null)} onSave={async (d) => { await addExperience(d); await load(); setModal(null) }} />
      <AddSkillModal isOpen={modal === 'skill'} onClose={() => setModal(null)} onSave={async (d) => { await addSkill(d); await load(); setModal(null) }} />
      <AddLanguageModal isOpen={modal === 'language'} onClose={() => setModal(null)} onSave={async (d) => { await addLanguage(d); await load(); setModal(null) }} />
    
      <Footer />
    </div>
  )
}

function Section({ title, onAdd, addLabel = '+ Add', children }) {
  return (
    <div className={styles.card}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button className={styles.addBtn} onClick={onAdd}>{addLabel}</button>
      </div>
      {children}
    </div>
  )
}

function AddEducationModal({ isOpen, onClose, onSave }) {
  const [d, setD] = useState({ degree:'', institution:'', fieldOfStudy:'', startYear:'', endYear:'' })
  const set = k => e => setD(p => ({...p, [k]: e.target.value}))
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Education">
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Input label="Degree" value={d.degree} onChange={set('degree')} placeholder="e.g. Bachelor of Science" />
        <Input label="Institution" value={d.institution} onChange={set('institution')} placeholder="University name" />
        <Input label="Field of Study" value={d.fieldOfStudy} onChange={set('fieldOfStudy')} placeholder="Computer Science" />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <Input label="Start Year" type="number" value={d.startYear} onChange={set('startYear')} placeholder="2020" />
          <Input label="End Year" type="number" value={d.endYear} onChange={set('endYear')} placeholder="2024" />
        </div>
        <Button fullWidth onClick={() => onSave({
      degree: d.degree,
      institution: d.institution,
      field_of_study: d.fieldOfStudy,
      start_year: d.startYear,
      end_year: d.endYear
    })}>Save Education</Button>
      </div>
    </Modal>
  )
}

function AddExperienceModal({ isOpen, onClose, onSave }) {
  const [d, setD] = useState({ title:'', company:'', description:'', startDate:'', endDate:'', type:'internship' })
  const set = k => e => setD(p => ({...p, [k]: e.target.value}))
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Experience">
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Input label="Job Title" value={d.title} onChange={set('title')} placeholder="Software Engineer Intern" />
        <Input label="Company" value={d.company} onChange={set('company')} placeholder="Company name" />
        <Input label="Description" value={d.description} onChange={set('description')} placeholder="What did you do?" />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <Input label="Start Date" type="date" value={d.startDate} onChange={set('startDate')} />
          <Input label="End Date" type="date" value={d.endDate} onChange={set('endDate')} />
        </div>
        <Button fullWidth onClick={() => onSave({
      title: d.title,
      company: d.company,
      description: d.description,
      start_date: d.startDate,
      end_date: d.endDate,
      type: d.type
    })}>Save Experience</Button>
      </div>
    </Modal>
  )
}

function AddSkillModal({ isOpen, onClose, onSave }) {
  const [d, setD] = useState({ name:'', category:'technical' })
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Skill">
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Input label="Skill name" value={d.name} onChange={e => setD(p=>({...p,name:e.target.value}))} placeholder="e.g. React, Python" />
        <Button fullWidth onClick={() => onSave(d)}>Add Skill</Button>
      </div>
    </Modal>
  )
}

function AddLanguageModal({ isOpen, onClose, onSave }) {
  const [d, setD] = useState({ name:'', proficiencyLevel:'fluent' })
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Language">
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Input
 label="Language"
 value={d.name}
 onChange={e =>
   setD(p => ({
     ...p,
     name: e.target.value
   }))
 }
/>

<select
 value={d.proficiencyLevel}
 onChange={(e)=>
   setD(p => ({
     ...p,
     proficiencyLevel:e.target.value
   }))
 }
>
 <option value="basic">Basic</option>
 <option value="intermediate">Intermediate</option>
 <option value="professional">Professional</option>
 <option value="fluent">Fluent</option>
 <option value="native">Native</option>
</select>

<Button
 fullWidth
 onClick={() =>
   onSave({
     name:d.name,
     proficiency_level:d.proficiencyLevel
   })
 }
>
 Add Language
</Button>
      </div>
    </Modal>

    
  )}
  function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  profile
}) {
  const [d, setD] = useState({
    full_name: profile?.full_name || '',
    headline: profile?.headline || '',
    city: profile?.city || '',
    linkedin_url: profile?.linkedin_url || '',
    photo_url: profile?.photo_url || ''
  })

  const setField = key => e =>
    setD(prev => ({
      ...prev,
      [key]: e.target.value
    }))

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
    >
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          gap:14
        }}
      >
        <Input
          label="Full Name"
          value={d.full_name}
          onChange={setField('full_name')}
        />

        <Input
          label="Headline"
          value={d.headline}
          onChange={setField('headline')}
        />

        <Input
          label="City"
          value={d.city}
          onChange={setField('city')}
        />

        <Input
          label="LinkedIn"
          value={d.linkedin_url}
          onChange={setField('linkedin_url')}
        />

        <Input
          label="Photo URL"
          value={d.photo_url}
          onChange={setField('photo_url')}
        />

        <Button
          fullWidth
          onClick={() => onSave(d)}
        >
          Save Profile
        </Button>
      </div>
    </Modal>
  )
}
