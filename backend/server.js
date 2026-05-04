const http = require('http')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const searchRoutes = require('./routes/searchRoutes')

const PORT = process.env.PORT || 3000

function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', chunk => body += chunk)
    req.on('end', () => {
      try { resolve(JSON.parse(body)) } catch { resolve({}) }
    })
  })
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(204); res.end(); return
  }

  req.body = await parseBody(req)
  const url = req.url

  if (url.startsWith('/api/auth')) return authRoutes(req, res)
  if (url.startsWith('/api/profile')) return profileRoutes(req, res)
  if (url.startsWith('/api/students')) return searchRoutes(req, res)

  res.writeHead(404)
  res.end(JSON.stringify({ error: 'Route not found' }))
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
