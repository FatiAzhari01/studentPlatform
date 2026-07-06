// models/Profile.js

const db = require('../config/db')

const Profile = {

  // ── Core profile ──────────────────────────────────────────

  create: (studentId) =>
    db.query('INSERT INTO profiles (student_id) VALUES (?)', [studentId]),

  findByStudentId: (studentId) =>
    db.query('SELECT * FROM profiles WHERE student_id = ? LIMIT 1', [studentId]),

  findById: (id) =>
    db.query('SELECT * FROM profiles WHERE id = ? LIMIT 1', [id]),

  update: (studentId, { full_name, headline, photo_url, city, linkedin_url, field_of_study }) =>
    db.query(
      `UPDATE profiles
          SET full_name     = COALESCE(?, full_name),
              headline      = COALESCE(?, headline),
              photo_url     = COALESCE(?, photo_url),
              city          = COALESCE(?, city),
              linkedin_url  = COALESCE(?, linkedin_url),
              field_of_study= COALESCE(?, field_of_study)
        WHERE student_id = ?`,
      [full_name, headline, photo_url, city, linkedin_url, field_of_study, studentId]
    ),

  // ── Education ─────────────────────────────────────────────

  getEducation: (profileId) =>
    db.query(
      'SELECT * FROM education WHERE profile_id = ? ORDER BY start_year DESC',
      [profileId]
    ),

  addEducation: (profileId, { degree, institution, field_of_study, start_year, end_year, gpa }) =>
    db.query(
      `INSERT INTO education
         (profile_id, degree, institution, field_of_study, start_year, end_year, gpa)
       VALUES (?,?,?,?,?,?,?)`,
      [profileId, degree, institution, field_of_study || null,
       start_year || null, end_year || null, gpa || null]
    ),

  updateEducation: (id, profileId, { degree, institution, field_of_study, start_year, end_year, gpa }) =>
    db.query(
      `UPDATE education
          SET degree         = COALESCE(?, degree),
              institution    = COALESCE(?, institution),
              field_of_study = COALESCE(?, field_of_study),
              start_year     = COALESCE(?, start_year),
              end_year       = COALESCE(?, end_year),
              gpa            = COALESCE(?, gpa)
        WHERE id = ? AND profile_id = ?`,
      [degree, institution, field_of_study, start_year, end_year, gpa, id, profileId]
    ),

  deleteEducation: (id, profileId) =>
    db.query('DELETE FROM education WHERE id = ? AND profile_id = ?', [id, profileId]),

  // ── Experience ────────────────────────────────────────────

  getExperiences: (profileId) =>
    db.query(
      'SELECT * FROM experiences WHERE profile_id = ? ORDER BY start_date DESC',
      [profileId]
    ),

  addExperience: (profileId, { title, company, description, start_date, end_date, type }) =>
    db.query(
      `INSERT INTO experiences
         (profile_id, title, company, description, start_date, end_date, type)
       VALUES (?,?,?,?,?,?,?)`,
      [profileId, title, company, description || null,
       start_date || null, end_date || null, type || 'job']
    ),

  updateExperience: (id, profileId, { title, company, description, start_date, end_date, type }) =>
    db.query(
      `UPDATE experiences
          SET title       = COALESCE(?, title),
              company     = COALESCE(?, company),
              description = COALESCE(?, description),
              start_date  = COALESCE(?, start_date),
              end_date    = COALESCE(?, end_date),
              type        = COALESCE(?, type)
        WHERE id = ? AND profile_id = ?`,
      [title, company, description, start_date, end_date, type, id, profileId]
    ),

  deleteExperience: (id, profileId) =>
    db.query('DELETE FROM experiences WHERE id = ? AND profile_id = ?', [id, profileId]),

  // ── Projects ──────────────────────────────────────────────

  getProjects: (profileId) =>
    db.query(
      'SELECT * FROM projects WHERE profile_id = ? ORDER BY created_at DESC',
      [profileId]
    ),

  addProject: (profileId, { title, description, project_url, tech_stack }) =>
    db.query(
      `INSERT INTO projects (profile_id, title, description, project_url, tech_stack)
       VALUES (?,?,?,?,?)`,
      [profileId, title, description || null, project_url || null,
       JSON.stringify(tech_stack || [])]
    ),

  updateProject: (id, profileId, { title, description, project_url, tech_stack }) =>
    db.query(
      `UPDATE projects
          SET title       = COALESCE(?, title),
              description = COALESCE(?, description),
              project_url = COALESCE(?, project_url),
              tech_stack  = COALESCE(?, tech_stack)
        WHERE id = ? AND profile_id = ?`,
      [title, description, project_url,
       tech_stack ? JSON.stringify(tech_stack) : null, id, profileId]
    ),

  deleteProject: (id, profileId) =>
    db.query('DELETE FROM projects WHERE id = ? AND profile_id = ?', [id, profileId]),

  // ── Skills ────────────────────────────────────────────────

  getSkills: (profileId) =>
    db.query(
      'SELECT * FROM skills WHERE profile_id = ? ORDER BY category, name',
      [profileId]
    ),

  addSkill: (profileId, { name, category }) =>
    db.query(
      'INSERT INTO skills (profile_id, name, category) VALUES (?,?,?)',
      [profileId, name, category || 'technical']
    ),

  deleteSkill: (id, profileId) =>
    db.query('DELETE FROM skills WHERE id = ? AND profile_id = ?', [id, profileId]),

  // ── Languages ─────────────────────────────────────────────

  getLanguages: (profileId) =>
    db.query(
      'SELECT * FROM languages WHERE profile_id = ? ORDER BY name',
      [profileId]
    ),

  addLanguage: (profileId, { name, proficiency_level }) =>
    db.query(
      'INSERT INTO languages (profile_id, name, proficiency_level) VALUES (?,?,?)',
      [profileId, name, proficiency_level || 'fluent']
    ),

  updateLanguage: (id, profileId, { name, proficiency_level }) =>
    db.query(
      `UPDATE languages
          SET name              = COALESCE(?, name),
              proficiency_level = COALESCE(?, proficiency_level)
        WHERE id = ? AND profile_id = ?`,
      [name, proficiency_level, id, profileId]
    ),

  deleteLanguage: (id, profileId) =>
    db.query('DELETE FROM languages WHERE id = ? AND profile_id = ?', [id, profileId]),

  // ── Full profile (one round-trip aggregation) ─────────────

  /**
   * Returns a single profile object with all sub-sections embedded.
   * Used for both /profile/me and public /students/:id endpoints.
   */
  getFullProfile: async (studentId) => {
    const [profiles] = await db.query(
      'SELECT * FROM profiles WHERE student_id = ? LIMIT 1', [studentId]
    )
    if (profiles.length === 0) return null

    const profile = profiles[0]
    const pid     = profile.id

    const [[education], [experiences], [projects], [skills], [languages]] =
      await Promise.all([
        db.query('SELECT * FROM education   WHERE profile_id = ? ORDER BY start_year DESC',  [pid]),
        db.query('SELECT * FROM experiences WHERE profile_id = ? ORDER BY start_date DESC',  [pid]),
        db.query('SELECT * FROM projects    WHERE profile_id = ? ORDER BY created_at DESC',  [pid]),
        db.query('SELECT * FROM skills      WHERE profile_id = ? ORDER BY category, name',   [pid]),
        db.query('SELECT * FROM languages   WHERE profile_id = ? ORDER BY name',             [pid]),
      ])

    // Parse tech_stack JSON for each project
    const parsedProjects = projects.map(p => ({
      ...p,
      tech_stack: (() => {
        try { return JSON.parse(p.tech_stack || '[]') } catch { return [] }
      })()
    }))

    return { ...profile, education, experiences, projects: parsedProjects, skills, languages }
  }
}

module.exports = Profile