// controllers/authController.js
'use strict'

const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const Student = require('../models/Student')
const Profile = require('../models/Profile')

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

async function register(req, res) {
  try {
    const { studentCode, email, password } = req.body

    if (!studentCode || !email || !password) {
      res.writeHead(400)
      return res.end(JSON.stringify({ error: 'All fields required' }))
    }

    // Check if code exists
    const [rows] = await Student.findByStudentCode(studentCode)

    if (rows.length === 0) {
      res.writeHead(404)
      return res.end(JSON.stringify({
        error: 'Invalid student code'
      }))
    }

    const existingStudent = rows[0]

    // already activated
    if (existingStudent.password_hash) {
      res.writeHead(409)
      return res.end(JSON.stringify({
        error: 'Account already created'
      }))
    }

    const hash = await bcrypt.hash(password, 10)

    await Student.activateStudent(
      existingStudent.id,
      email,
      hash
    )

    res.writeHead(201)
    res.end(JSON.stringify({
      message: 'Account created successfully'
    }))

  } catch (error) {
    console.error(error)
    res.writeHead(500)
    res.end(JSON.stringify({
      error: 'Server error'
    }))
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return send(res, 400, { success: false, message: 'Email and password are required' })
    }

    const cleanEmail = String(email).toLowerCase().trim()

    const [rows] = await Student.findByEmail(cleanEmail)
    console.log('ROWS:', rows)
    if (rows.length === 0) {
      return send(res, 401, { success: false, message: 'Invalid credentials' })
    }

    const student = rows[0]
    console.log('BODY:', req.body)
    console.log('EMAIL:', email)
    console.log('PASSWORD:', password)
    console.log('HASH:', student.password_hash)
    const valid   = await bcrypt.compare(String(password), student.password_hash)
    if (!valid) {
      return send(res, 401, { success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: student.id, email: student.email },
      process.env.JWT_SECRET || 'fallback_secret_change_me',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    return send(res, 200, {
      success: true,
      token,
      student: {
        id:          student.id,
        email:       student.email,
        studentCode: student.student_code,
        isVerified:  Boolean(student.is_verified)
      }
    })

  } catch (err) {
  console.error('[LOGIN ERROR]', err.message, err.stack)   
  return send(res, 500, { success: false, message: 'Internal server error' })
}
}

module.exports = { register, login }
