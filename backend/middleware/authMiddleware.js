const jwt = require('jsonwebtoken')

function authMiddleware(req, res) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    res.writeHead(401)
    res.end(JSON.stringify({ error: 'No token provided' }))
    return null
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    return decoded
  } catch {
    res.writeHead(401)
    res.end(JSON.stringify({ error: 'Invalid token' }))
    return null
  }
}

module.exports = authMiddleware
