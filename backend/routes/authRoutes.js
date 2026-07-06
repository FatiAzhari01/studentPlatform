// routes/authRoutes.js
'use strict'

const { register, login } = require('../controllers/authController')

function send404(res) {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ success: false, message: 'Route not found' }))
}

module.exports = function authRoutes(req, res) {
  const { method, url } = req
  const path = (req.url || '').split('?')[0]

  if (path === '/api/auth/register' && method === 'POST') return register(req, res)
  if (path === '/api/auth/login'    && method === 'POST') return login(req, res)

  send404(res)
}
