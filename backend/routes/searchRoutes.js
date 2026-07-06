// routes/searchRoutes.js
'use strict'

const { searchStudents, getStudentById } = require('../controllers/searchController')

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

module.exports = function searchRoutes(req, res) {
  const { method } = req
  const path = (req.url || '').split('?')[0]

  if (path === '/api/students' && method === 'GET') return searchStudents(req, res)

  const m = path.match(/^\/api\/students\/(\d+)$/)
  if (m && method === 'GET') return getStudentById(req, res, parseInt(m[1]))

  send(res, 404, { success: false, message: 'Search route not found' })
}
