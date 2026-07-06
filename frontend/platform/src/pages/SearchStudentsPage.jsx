import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchStudents } from '../services/searchService'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/search/SearchBar'
import FilterDropdown from '../components/search/FilterDropdown'
import StudentCard from '../components/search/StudentCard'
import styles from './SearchStudentsPage.module.css'

const FIELDS = ['Computer Science', 'Management', 'Marketing', 'Engineering', 'Law', 'Medicine']
const DEGREES = ["Bachelor's Degree", "Master's Degree", 'PhD', 'Licence Degree']

export default function SearchStudentsPage() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ keyword: '', field: '', degree: '', skills: '' })

  const load = async (f = filters) => {
    setLoading(true)
    try {
      const params = {}
      if (f.keyword) params.keyword = f.keyword
      if (f.field)   params.field   = f.field
      if (f.degree)  params.degree  = f.degree
      if (f.skills)  params.skills  = f.skills
      const { data } = await searchStudents(params)
      setStudents(data.data || [])   // ← data is only accessible here, inside load
    } catch {
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // ← the stray setStudents(data.data || []) that was here is now REMOVED

  const setFilter = (k) => (v) => {
    setFilters(prev => {
      const next = { ...prev, [k]: v }
      load(next)
      return next
    })
  }

  const clearAll = () => {
    const cleared = { keyword: '', field: '', degree: '', skills: '' }
    setFilters(cleared)
    load(cleared)
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Search Students</h1>
            <p className={styles.sub}>Find students by field, skills, or specialization</p>
          </div>

          <SearchBar
            value={filters.keyword}
            onChange={(v) => setFilter('keyword')(v)}
          />

          <div className={styles.filters}>
            <FilterDropdown
              label="Field of Study"
              options={FIELDS}
              value={filters.field}
              onChange={setFilter('field')}
            />
            <FilterDropdown
              label="Degree Level"
              options={DEGREES}
              value={filters.degree}
              onChange={setFilter('degree')}
            />
            <FilterDropdown
              label="Skills"
              options={['React', 'Python', 'Java', 'Management', 'Marketing', 'SQL']}
              value={filters.skills}
              onChange={setFilter('skills')}
            />
            <button className={styles.clearBtn} onClick={clearAll}>
              Clear all filters
            </button>
          </div>

          {loading ? (
            <div className={styles.loadingGrid}>
              {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
            </div>
          ) : students.length === 0 ? (
            <div className={styles.empty}>
              <p>No students found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {students.map(s => (
                <StudentCard
                  key={s.student_id}
                  student={s}
                  onView={() => navigate(`/students/${s.student_id}`)}
                />
              ))}
            </div>
          )}

          {students.length > 0 && (
            <div className={styles.loadMore}>
              <h3>More Profiles</h3>
              <p>Continue exploring to discover more talented students from diverse fields.</p>
              <button className={styles.loadMoreBtn}>Load More Students</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}