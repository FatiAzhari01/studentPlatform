const { searchStudents, getStudentById } = require('../controllers/searchController')

module.exports = async function searchRoutes(req, res) {
  if (req.url.startsWith('/api/students') && req.method === 'GET') {
    const match = req.url.match(/^\/api\/students\/(\d+)/)
    if (match) return getStudentById(req, res, match[1])
    return searchStudents(req, res)
  }
  res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }))
}
