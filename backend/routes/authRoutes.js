const { register, login } = require('../controllers/authController')

module.exports = async function authRoutes(req, res) {
  if (req.url === '/api/auth/register' && req.method === 'POST') return register(req, res)
  if (req.url === '/api/auth/login' && req.method === 'POST') return login(req, res)
  res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }))
}
