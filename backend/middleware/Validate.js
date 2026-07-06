// middleware/validate.js
// Simple field-presence validation helpers used in controllers

/**
 * Returns an error message if any required field is missing/empty, otherwise null.
 * @param {object} body
 * @param {string[]} fields
 * @returns {string|null}
 */
function requireFields(body, fields) {
  for (const f of fields) {
    if (body[f] === undefined || body[f] === null || String(body[f]).trim() === '') {
      return `Field "${f}" is required`
    }
  }
  return null
}

/**
 * Sanitise a string value — trims whitespace and converts undefined → null.
 */
function clean(val) {
  if (val === undefined || val === null) return null
  return String(val).trim() || null
}

/**
 * Validate email format.
 */
function isEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

/**
 * Send a 400 JSON error response.
 */
function badRequest(res, message) {
  res.writeHead(400, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ success: false, message }))
}

/**
 * Send a 500 JSON error response.
 */
function serverError(res, err) {
  console.error(err)
  res.writeHead(500, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ success: false, message: 'Internal server error' }))
}

/**
 * Send a JSON response with given status.
 */
function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

module.exports = { requireFields, clean, isEmail, badRequest, serverError, send }