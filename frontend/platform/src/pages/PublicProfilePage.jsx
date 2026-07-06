import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStudentById } from '../services/searchService'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import styles from './PublicProfilePage.module.css'

export default function PublicProfilePage() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   getStudentById(id)
  .then((res) => {
    console.log('PROFILE RESPONSE', res.data)
    setProfile(res.data.data)
  })
  .catch((err) => {
    console.error(err)
    setProfile(null)
  })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className={styles.loading}>Loading profile…</div>
  if (!profile) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.notFound}>
        <h2>Profile not found</h2>
        <Link to="/search">← Back to search</Link>
      </div>
    </div>
  )

  return (
    <div className={styles.page}>
      <nav className={styles.topbar}>
        <Link to="/search" className={styles.backLink}>← Professional Portfolio Viewer</Link>
        <button className={styles.shareBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4.3 6.3l5.3-2.8M4.3 7.7l5.3 2.8" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Share Profile
        </button>
      </nav>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <img
            src={profile.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.headline||'S')}&background=2563eb&color=fff&size=100`}
            alt="avatar" className={styles.avatar}
          />
          <h1 className={styles.name}>{profile.headline || 'Student Name'}</h1>
          <p className={styles.field} style={{color:'var(--blue-600)',fontWeight:500,fontSize:14}}>{profile.field_of_study}</p>
          <p className={styles.degree}>{profile.degree} • {profile.institution}</p>
          <div className={styles.verifiedBadge}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="6.5" fill="#2563eb" opacity=".15"/>
              <path d="M4 6.5l2 2 3.5-3.5" stroke="#2563eb" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Verified Student
          </div>
          <div className={styles.contactSection}>
            <p className={styles.contactLabel}>CONTACT</p>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className={styles.contactLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2"/></svg>
                Email
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className={styles.contactLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M4 6v4M4 4.5v.5M6.5 10V7.5a1.5 1.5 0 013 0V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                LinkedIn Profile
              </a>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.content}>
          <ProfileSection title="Education" icon="🎓">
            {profile.education?.map((e, i) => (
              <div key={i} className={styles.eduItem}>
                <div className={styles.eduIcon}>🏛</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <p className={styles.eduDegree}>{e.degree}</p>
                      <p className={styles.eduInst}>{e.institution} • {e.field_of_study}</p>
                      {e.gpa && <p className={styles.eduMeta}>⭐ GPA: {e.gpa}/4.0</p>}
                    </div>
                    <span className={styles.dateBadge}>{e.start_year} — {e.end_year || 'Present'}</span>
                  </div>
                </div>
              </div>
            ))}
          </ProfileSection>

          <ProfileSection title="Work Experience" icon="💼">
            {profile.experiences?.map((e, i) => (
              <div key={i} className={styles.expItem}>
                <div className={styles.expIcon}>⌨️</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                      <p className={styles.expTitle}>{e.title}</p>
                      <p className={styles.expComp} style={{color:'var(--blue-600)'}}>{e.company}</p>
                    </div>
                    <span className={styles.dateBadge}>{e.start_date} — {e.end_date || 'Present'}</span>
                  </div>
                  <p className={styles.expDesc}>{e.description}</p>
                </div>
              </div>
            ))}
          </ProfileSection>

          <ProfileSection title="Expertise & Skills" icon="⚡">
            <div className={styles.skillsBlock}>
              <div>
                <p className={styles.skillCat}>TECHNICAL STACK</p>
                <div className={styles.tagRow}>
                  {profile.skills?.filter(s=>s.category==='technical'||!s.category).map((s,i)=>(
                    <span key={i} className={styles.skillTag}>{s.name}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className={styles.skillCat}>CORE COMPETENCIES</p>
                <div className={styles.tagRow}>
                  {profile.skills?.filter(s=>s.category==='soft').map((s,i)=>(
                    <span key={i} className={`${styles.skillTag} ${styles.softTag}`}>{s.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </ProfileSection>

          {profile.projects?.length > 0 && (
            <ProfileSection title="Featured Projects" icon="📁">
              <div className={styles.projectsGrid}>
                // SAFE — handles array, string, null, empty
{profile.projects?.map((p, i) => (
  <div key={i} className={styles.projectCard}>
    <div className={styles.projectMeta}>
      <p className={styles.projectTitle}>{p.title}</p>
      {p.project_url && (
        <a href={p.project_url} target="_blank" rel="noreferrer" className={styles.projectLink}>↗</a>
      )}
    </div>
    <p className={styles.projectDesc}>{p.description}</p>
    <div className={styles.tagRow}>
      {(() => {
        // tech_stack can be: [] (array), '["React"]' (string), null
        let stack = []
        if (Array.isArray(p.tech_stack)) {
          stack = p.tech_stack
        } else if (typeof p.tech_stack === 'string' && p.tech_stack.trim()) {
          try { stack = JSON.parse(p.tech_stack) } catch { stack = [] }
        }
        return stack.map((t, j) => (
          <span key={j} className={styles.techTag}>{t}</span>
        ))
          })()}
             </div>
             </div>
              ))}
              </div>
            </ProfileSection>
          )}
        </main>
      </div>

      <div className={styles.footerNote}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Authenticated Student Record • {profile.institution} {profile.end_year}
        <br/><small>© {new Date().getFullYear()} Student Platform. This profile is verified for recruitment and academic purposes.</small>
      </div>
      <Footer />
    </div>
  )
}

function ProfileSection({ title, icon, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{icon} {title}</h2>
      {children}
    </section>
  )
}