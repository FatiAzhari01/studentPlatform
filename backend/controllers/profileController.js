// controllers/profileController.js
'use strict'

const Profile = require('../models/Profile')

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

function clean(v) {
  if (v === undefined || v === null) return null
  const s = String(v).trim()
  return s === '' ? null : s
}

async function getProfileId(studentId, res) {
  const [rows] = await Profile.findByStudentId(studentId)
  if (!rows.length) { send(res, 404, { success: false, message: 'Profile not found' }); return null }
  return rows[0].id
}

// ── Profile ────────────────────────────────────────────────
async function getMyProfile(req, res, studentId) {
  try {
    const profile = await Profile.getFullProfile(studentId)
    if (!profile) return send(res, 404, { success: false, message: 'Profile not found' })
    send(res, 200, { success: true, data: profile })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function updateProfile(req, res, studentId) {
  try {
    const b = req.body || {}
    await Profile.update(studentId, {
      full_name:      clean(b.full_name),
      headline:       clean(b.headline),
      photo_url:      clean(b.photo_url),
      city:           clean(b.city),
      linkedin_url:   clean(b.linkedin_url),
      field_of_study: clean(b.field_of_study)
    })
    const profile = await Profile.getFullProfile(studentId)
    send(res, 200, { success: true, message: 'Profile updated', data: profile })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

// ── Education ──────────────────────────────────────────────
async function addEducation(req, res, studentId) {
  console.log('UPDATE EDUCATION BODY:', req.body)
  console.log('STUDENT ID:', studentId) 
 try {
    const b = req.body || {}
    if (!b.degree || !b.institution) return send(res, 400, { success: false, message: 'degree and institution required' })
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.addEducation(pid, b)
    const [rows] = await Profile.getEducation(pid)
    send(res, 201, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function updateEducation(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    const [r] = await Profile.updateEducation(id, pid, req.body || {})
    if (!r.affectedRows) return send(res, 404, { success: false, message: 'Not found' })
    const [rows] = await Profile.getEducation(pid)
    send(res, 200, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function deleteEducation(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.deleteEducation(id, pid)
    send(res, 200, { success: true, message: 'Deleted' })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

// ── Experience ─────────────────────────────────────────────
async function addExperience(req, res, studentId) {
  console.log('ADD EXPERIENCE BODY:', req.body)
  try {
    const b = req.body || {}
    if (!b.title || !b.company) return send(res, 400, { success: false, message: 'title and company required' })
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.addExperience(pid, b)
    const [rows] = await Profile.getExperiences(pid)
    send(res, 201, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function updateExperience(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    const [r] = await Profile.updateExperience(id, pid, req.body || {})
    if (!r.affectedRows) return send(res, 404, { success: false, message: 'Not found' })
    const [rows] = await Profile.getExperiences(pid)
    send(res, 200, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function deleteExperience(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.deleteExperience(id, pid)
    send(res, 200, { success: true, message: 'Deleted' })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

// ── Projects ───────────────────────────────────────────────
async function addProject(req, res, studentId) {
  try {
    const b = req.body || {}
    if (!b.title) return send(res, 400, { success: false, message: 'title required' })
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.addProject(pid, b)
    const [rows] = await Profile.getProjects(pid)
    const parsed = rows.map(p => ({ ...p, tech_stack: (() => { try { return JSON.parse(p.tech_stack||'[]') } catch { return [] } })() }))
    send(res, 201, { success: true, data: parsed })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function updateProject(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    const [r] = await Profile.updateProject(id, pid, req.body || {})
    if (!r.affectedRows) return send(res, 404, { success: false, message: 'Not found' })
    const [rows] = await Profile.getProjects(pid)
    const parsed = rows.map(p => ({ ...p, tech_stack: (() => { try { return JSON.parse(p.tech_stack||'[]') } catch { return [] } })() }))
    send(res, 200, { success: true, data: parsed })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function deleteProject(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.deleteProject(id, pid)
    send(res, 200, { success: true, message: 'Deleted' })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

// ── Skills ─────────────────────────────────────────────────
async function addSkill(req, res, studentId) {
  console.log('ADD SKILL BODY:', req.body)
  try {
    const b = req.body || {}
    if (!b.name) return send(res, 400, { success: false, message: 'name required' })
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.addSkill(pid, b)
    const [rows] = await Profile.getSkills(pid)
    send(res, 201, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function deleteSkill(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.deleteSkill(id, pid)
    send(res, 200, { success: true, message: 'Deleted' })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

// ── Languages ──────────────────────────────────────────────
async function addLanguage(req, res, studentId) {
  console.log('ADD LANGUAGE BODY:', req.body)
  try {
    const b = req.body || {}
    if (!b.name || !b.proficiency_level) return send(res, 400, { success: false, message: 'name and proficiency_level required' })
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.addLanguage(pid, b)
    const [rows] = await Profile.getLanguages(pid)
    send(res, 201, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function updateLanguage(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.updateLanguage(id, pid, req.body || {})
    const [rows] = await Profile.getLanguages(pid)
    send(res, 200, { success: true, data: rows })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

async function deleteLanguage(req, res, studentId, id) {
  try {
    const pid = await getProfileId(studentId, res); if (!pid) return
    await Profile.deleteLanguage(id, pid)
    send(res, 200, { success: true, message: 'Deleted' })
  } catch (e) { console.error(e); send(res, 500, { success: false, message: 'Server error' }) }
}

module.exports = {
  getMyProfile, updateProfile,
  addEducation, updateEducation, deleteEducation,
  addExperience, updateExperience, deleteExperience,
  addProject, updateProject, deleteProject,
  addSkill, deleteSkill,
  addLanguage, updateLanguage, deleteLanguage
}
