const auth = require('../middleware/authMiddleware')
const ctrl = require('../controllers/profileController')

module.exports = async function profileRoutes(req, res) {
  const student = auth(req, res)
  if (!student) return

  if (req.url === '/api/profile/me' && req.method === 'GET') return ctrl.getMyProfile(req, res, student.id)
  if (req.url === '/api/profile/me' && req.method === 'PUT') return ctrl.updateProfile(req, res, student.id)
  if (req.url === '/api/profile/education' && req.method === 'POST') return ctrl.addEducation(req, res, student.id)
  if (req.url === '/api/profile/experience' && req.method === 'POST') return ctrl.addExperience(req, res, student.id)
  if (req.url === '/api/profile/project' && req.method === 'POST') return ctrl.addProject(req, res, student.id)
  if (req.url === '/api/profile/skill' && req.method === 'POST') return ctrl.addSkill(req, res, student.id)
  if (req.url === '/api/profile/language' && req.method === 'POST') return ctrl.addLanguage(req, res, student.id)

  res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }))
}
