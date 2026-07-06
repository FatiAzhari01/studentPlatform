// routes/profileRoutes.js
'use strict'

const auth = require('../middleware/authMiddleware')
const ctrl = require('../controllers/profileController')

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

module.exports = function profileRoutes(req, res) {
  const student = auth(req, res)
  if (!student) return   // auth already sent 401

  const { method } = req
  const path = (req.url || '').split('?')[0]

  // Profile header
  if (path === '/api/profile/me' && method === 'GET')  return ctrl.getMyProfile(req, res, student.id)
  if (path === '/api/profile/me' && method === 'PUT')  return ctrl.updateProfile(req, res, student.id)

  // Education
  if (path === '/api/profile/education' && method === 'POST') return ctrl.addEducation(req, res, student.id)
  const eduM = path.match(/^\/api\/profile\/education\/(\d+)$/)
  if (eduM) {
    const id = parseInt(eduM[1])
    if (method === 'PUT')    return ctrl.updateEducation(req, res, student.id, id)
    if (method === 'DELETE') return ctrl.deleteEducation(req, res, student.id, id)
  }

  // Experience
  if (path === '/api/profile/experience' && method === 'POST') return ctrl.addExperience(req, res, student.id)
  const expM = path.match(/^\/api\/profile\/experience\/(\d+)$/)
  if (expM) {
    const id = parseInt(expM[1])
    if (method === 'PUT')    return ctrl.updateExperience(req, res, student.id, id)
    if (method === 'DELETE') return ctrl.deleteExperience(req, res, student.id, id)
  }

  // Projects
  if (path === '/api/profile/project' && method === 'POST') return ctrl.addProject(req, res, student.id)
  const projM = path.match(/^\/api\/profile\/project\/(\d+)$/)
  if (projM) {
    const id = parseInt(projM[1])
    if (method === 'PUT')    return ctrl.updateProject(req, res, student.id, id)
    if (method === 'DELETE') return ctrl.deleteProject(req, res, student.id, id)
  }

  // Skills
  if (path === '/api/profile/skill' && method === 'POST') return ctrl.addSkill(req, res, student.id)
  const skillM = path.match(/^\/api\/profile\/skill\/(\d+)$/)
  if (skillM && method === 'DELETE') return ctrl.deleteSkill(req, res, student.id, parseInt(skillM[1]))

  // Languages
  if (path === '/api/profile/language' && method === 'POST') return ctrl.addLanguage(req, res, student.id)
  const langM = path.match(/^\/api\/profile\/language\/(\d+)$/)
  if (langM) {
    const id = parseInt(langM[1])
    if (method === 'PUT')    return ctrl.updateLanguage(req, res, student.id, id)
    if (method === 'DELETE') return ctrl.deleteLanguage(req, res, student.id, id)
  }

  send(res, 404, { success: false, message: 'Profile route not found' })
}
