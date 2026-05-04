const db = require('../config/db')
const Profile = require('../models/Profile')
const Education = require('../models/Education')
const Skill = require('../models/Skill')

async function searchStudents(req, res) {
  const urlObj = new URL(req.url, 'http://localhost')
  const field = urlObj.searchParams.get('field') || ''
  const degree = urlObj.searchParams.get('degree') || ''
  const skill = urlObj.searchParams.get('skills') || ''

  let query = `
    SELECT DISTINCT s.id, s.email, p.headline, p.city, p.photo_url,
      e.field_of_study, e.degree
    FROM students s
    JOIN profiles p ON p.student_id = s.id
    LEFT JOIN education e ON e.profile_id = p.id
    LEFT JOIN skills sk ON sk.profile_id = p.id
    WHERE 1=1
  `
  const params = []
  if (field) { query += ' AND e.field_of_study LIKE ?'; params.push(`%${field}%`) }
  if (degree) { query += ' AND e.degree LIKE ?'; params.push(`%${degree}%`) }
  if (skill)  { query += ' AND sk.name LIKE ?'; params.push(`%${skill}%`) }

  const [rows] = await db.query(query, params)
  res.writeHead(200)
  res.end(JSON.stringify(rows))
}

async function getStudentById(req, res, id) {
  const [profiles] = await Profile.findByStudentId(id)
  if (profiles.length === 0) {
    res.writeHead(404); return res.end(JSON.stringify({ error: 'Not found' }))
  }
  const profile = profiles[0]
  const Education = require('../models/Education')
  const Experience = require('../models/Experience')
  const Project = require('../models/Project')
  const Skill = require('../models/Skill')
  const Language = require('../models/Language')
  const [education] = await Education.findByProfileId(profile.id)
  const [experiences] = await Experience.findByProfileId(profile.id)
  const [projects] = await Project.findByProfileId(profile.id)
  const [skills] = await Skill.findByProfileId(profile.id)
  const [languages] = await Language.findByProfileId(profile.id)
  res.writeHead(200)
  res.end(JSON.stringify({ ...profile, education, experiences, projects, skills, languages }))
}

module.exports = { searchStudents, getStudentById }
