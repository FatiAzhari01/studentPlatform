// middleware/authMiddleware.js
'use strict'

const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res) {
  const authHeader = req.headers['authorization'] || ''

  if (!authHeader.startsWith('Bearer ')) {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, message: 'No token provided' }))
    return null
  }

  const token = authHeader.slice(7).trim()

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_change_me')
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'
    res.writeHead(401, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, message }))
    return null
  }
}
