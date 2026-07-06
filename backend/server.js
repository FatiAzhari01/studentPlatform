// server.js
'use strict'

require('dotenv').config()

const http          = require('http')
const authRoutes    = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const searchRoutes  = require('./routes/searchRoutes')

const PORT = process.env.PORT || 3000

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age':       '86400'
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', chunk => {
      raw += chunk
      if (raw.length > 2e6) { req.destroy(); reject(new Error('Payload too large')) }
    })
    req.on('end', () => {
      try   { resolve(raw ? JSON.parse(raw) : {}) }
      catch { resolve({}) }
    })
    req.on('error', reject)
  })
}

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

const server = http.createServer(async (req, res) => {
  // CORS headers on every response
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))

  // Pre-flight
  if (req.method === 'OPTIONS') {
    res.writeHead(204); return res.end()
  }

  // Parse body
  try   { req.body = await readBody(req) }
  catch { req.body = {} }

  const path = (req.url || '').split('?')[0]

  // Health check
  if (path === '/api/health' && req.method === 'GET') {
    return send(res, 200, { success: true, status: 'OK', ts: new Date().toISOString() })
  }

  // Route dispatch
  if (path.startsWith('/api/auth'))     return authRoutes(req, res)
  if (path.startsWith('/api/profile'))  return profileRoutes(req, res)
  if (path.startsWith('/api/students')) return searchRoutes(req, res)

  send(res, 404, { success: false, message: 'Endpoint not found' })
})

server.listen(PORT, () => {
  console.log(`🚀  API server running → http://localhost:${PORT}`)
  console.log(`     Health: http://localhost:${PORT}/api/health`)
})

server.on('error', err => {
  console.error('Server error:', err)
  process.exit(1)
})
