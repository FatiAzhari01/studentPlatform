const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const Profile = require('../models/Profile')

async function register(req, res) {
  const { studentCode, email, password } = req.body
  if (!studentCode || !email || !password) {
    res.writeHead(400)
    return res.end(JSON.stringify({ error: 'All fields required' }))
  }
  // Check studentCode exists in university table
  const [existing] = await Student.findByStudentCode(studentCode)
  if (existing.length > 0) {
    res.writeHead(409)
    return res.end(JSON.stringify({ error: 'Student code already registered' }))
  }
  const hash = await bcrypt.hash(password, 10)
  const [result] = await Student.create(studentCode, email, hash)
  await Profile.create(result.insertId)
  res.writeHead(201)
  res.end(JSON.stringify({ message: 'Account created successfully' }))
}

async function login(req, res) {
  const { email, password } = req.body
  const [rows] = await Student.findByEmail(email)
  if (rows.length === 0) {
    res.writeHead(401)
    return res.end(JSON.stringify({ error: 'Invalid credentials' }))
  }
  const student = rows[0]
  const valid = await bcrypt.compare(password, student.password_hash)
  if (!valid) {
    res.writeHead(401)
    return res.end(JSON.stringify({ error: 'Invalid credentials' }))
  }
  const token = jwt.sign(
    { id: student.id, email: student.email },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  )
  res.writeHead(200)
  res.end(JSON.stringify({ token, student: { id: student.id, email: student.email } }))
}

module.exports = { register, login }
