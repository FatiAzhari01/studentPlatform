import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import styles from './LandingPage.module.css'

/* ── SVG Hero Illustration (teal isometric platform) ─────────────── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heroSvg}>
      {/* Background platform */}
      <ellipse cx="240" cy="290" rx="210" ry="55" fill="#e2f8f5" opacity=".6"/>

      {/* Platform base */}
      <path d="M80 240 L240 160 L400 240 L240 320 Z" fill="#0d9488" opacity=".15"/>
      <path d="M80 240 L240 160 L400 240 L240 320 Z" stroke="#0d9488" strokeWidth="1.5" fill="none"/>

      {/* Glowing card on platform */}
      <rect x="170" y="170" width="140" height="100" rx="12"
        fill="white" stroke="#e2e8f0" strokeWidth="1.5"
        style={{filter:'drop-shadow(0 8px 24px rgba(13,148,136,.18))'}}/>
      <rect x="182" y="185" width="60" height="8" rx="4" fill="#0d9488" opacity=".7"/>
      <rect x="182" y="200" width="100" height="6" rx="3" fill="#cbd5e1"/>
      <rect x="182" y="212" width="80" height="6" rx="3" fill="#cbd5e1"/>
      <rect x="182" y="230" width="36" height="20" rx="6" fill="#2563eb"/>
      <rect x="225" y="230" width="36" height="20" rx="6" fill="#e2e8f0"/>

      {/* Floating badge top-right */}
      <rect x="295" y="135" width="88" height="36" rx="10"
        fill="white" stroke="#e2e8f0"
        style={{filter:'drop-shadow(0 4px 12px rgba(0,0,0,.10))'}}/>
      <circle cx="313" cy="153" r="9" fill="#dcfce7"/>
      <path d="M309 153l3 3 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="326" y="146" width="48" height="6" rx="3" fill="#cbd5e1"/>
      <rect x="326" y="157" width="36" height="5" rx="2.5" fill="#e2e8f0"/>

      {/* Person 1 — top center */}
      <circle cx="240" cy="108" r="16" fill="#fed7aa"/>
      <path d="M220 145 Q240 130 260 145 L265 180 L215 180 Z" fill="#2563eb"/>
      <path d="M230 108 Q240 98 250 108" stroke="#9a3412" strokeWidth="1.2" fill="none"/>

      {/* Person 2 — left */}
      <circle cx="138" cy="218" r="13" fill="#fbbf24" opacity=".85"/>
      <path d="M122 248 Q138 236 154 248 L158 275 L118 275 Z" fill="#7c3aed" opacity=".85"/>

      {/* Person 3 — right */}
      <circle cx="345" cy="218" r="13" fill="#fca5a5" opacity=".85"/>
      <path d="M329 248 Q345 236 361 248 L365 275 L325 275 Z" fill="#0d9488" opacity=".85"/>

      {/* Person 4 — bottom left */}
      <circle cx="170" cy="295" r="11" fill="#c4b5fd"/>
      <path d="M157 318 Q170 308 183 318 L186 338 L154 338 Z" fill="#1d4ed8"/>

      {/* Floating dots */}
      <circle cx="120" cy="160" r="5" fill="#2563eb" opacity=".4"/>
      <circle cx="380" cy="170" r="4" fill="#0d9488" opacity=".4"/>
      <circle cx="100" cy="310" r="3" fill="#7c3aed" opacity=".35"/>
      <circle cx="395" cy="295" r="6" fill="#f59e0b" opacity=".3"/>

      {/* Connecting lines */}
      <path d="M240 124 L240 170" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" opacity=".6"/>
      <path d="M148 228 L170 240" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" opacity=".6"/>
      <path d="M335 228 L295 240" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 3" opacity=".6"/>
    </svg>
  )
}

/* ── Step icon ───────────────────────────────────────────────── */
function StepBubble({ n }) {
  return (
    <div className={styles.stepBubble}>
      <span>{n}</span>
    </div>
  )
}

/* ── Stakeholder card ────────────────────────────────────────── */
function StakeholderCard({ icon, title, description, checks, delay }) {
  return (
    <div className={`${styles.stakeholderCard} animate-fade-up`} style={{ animationDelay: delay }}>
      <div className={styles.sIcon}>{icon}</div>
      <h3 className={styles.sTitle}>{title}</h3>
      <p className={styles.sDesc}>{description}</p>
      <ul className={styles.sList}>
        {checks.map(c => (
          <li key={c} className={styles.sItem}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#dbeafe"/>
              <path d="M5 8l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroLeft}>
            <div className={`${styles.heroBadge} animate-fade-up`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#2563eb" opacity=".2"/>
                <circle cx="6" cy="6" r="3" fill="#2563eb"/>
              </svg>
              Official Smart University Platform
            </div>

            <h1 className={`${styles.heroTitle} animate-fade-up delay-100`}>
              Welcome to<br/>
              <span className={styles.heroAccent}>Student Platform</span>
            </h1>

            <p className={`${styles.heroDesc} animate-fade-up delay-200`}>
              Build and showcase your academic and professional journey
              with a verified, secure portfolio platform designed for the
              next generation of talent.
            </p>

            <div className={`${styles.heroCta} animate-fade-up delay-300`}>
              <Link to="/register" className={styles.ctaPrimary}>Get Started</Link>
              <Link to="/login"    className={styles.ctaSecondary}>Login</Link>
            </div>
          </div>

          <div className={`${styles.heroRight} animate-fade-in delay-200`}>
            <div className={styles.heroCard}>
              <HeroIllustration />
            </div>
          </div>

        </div>
      </section>

      {/* ── STAKEHOLDERS ───────────────────────────────────────── */}
      <section className={styles.stakeholders}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Empowering Every Stakeholder</h2>
            <p className={styles.sectionSub}>
              One platform, three powerful experiences tailored to support
              the entire academic and professional ecosystem.
            </p>
          </div>

          <div className={styles.stakeholderGrid}>
            <StakeholderCard
              delay="0.1s"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                </svg>
              }
              title="For Students"
              description="Build professional profiles that stand out. Showcase verified academic achievements, skills, and creative projects to recruiters worldwide."
              checks={['Verified Portfolio', 'Skill Endorsements']}
            />
            <StakeholderCard
              delay="0.2s"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M7 14l3-4 3 2 3-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              title="For Administration"
              description="Track student and graduate progress seamlessly. Access high-level analytics on employment rates and alumni career trajectories."
              checks={['Outcome Tracking', 'Automated Reporting']}
            />
            <StakeholderCard
              delay="0.3s"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="4" y="3" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
                  <path d="M8 8h6M8 12h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <circle cx="16" cy="16" r="3.5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14.8 16l.9.9 1.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              title="For Visitors"
              description="Verify academic backgrounds instantly. Discover top talent through a secure directory of verified graduates and their works."
              checks={['Direct Verification', 'Talent Discovery']}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Your Journey Starts Here</h2>
            <p className={styles.sectionSub}>Three simple steps to professional excellence</p>
          </div>

          <div className={styles.stepsGrid}>
            {[
              {
                n: '1', title: 'Create Account',
                desc: 'Fast and easy student ID verification. Connect your institutional email to unlock your verified status immediately.'
              },
              {
                n: '2', title: 'Build Profile',
                desc: 'Import academic data directly from school records. Add projects, internships, and extracurricular wins to tell your full story.'
              },
              {
                n: '3', title: 'Share & Grow',
                desc: 'Showcase your verified profile to recruiters via a secure link. Stand out in the job market with proof of your accomplishments.'
              }
            ].map((s, i) => (
              <div
                key={s.n}
                className={`${styles.stepItem} animate-fade-up`}
                style={{ animationDelay: `${i * 0.12}s` }}>
                <StepBubble n={s.n} />
                {i < 2 && <div className={styles.stepLine} aria-hidden />}
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaBannerInner}`}>
          <div className={styles.ctaBannerBg} aria-hidden />
          <h2 className={styles.ctaBannerTitle}>Ready to accelerate your career?</h2>
          <p className={styles.ctaBannerSub}>
            Join thousands of students and alumni already building their
            professional future on ScholarLink.
          </p>
          <Link to="/register" className={styles.ctaBannerBtn}>
            Create Your Free Profile
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}