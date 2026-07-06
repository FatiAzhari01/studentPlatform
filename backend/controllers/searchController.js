// controllers/searchController.js
'use strict'

const db      = require('../config/db')
const Profile = require('../models/Profile')

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(payload))
}

async function searchStudents(req, res) {
  try {
    const urlObj = new URL(req.url, 'http://localhost')

    const field = urlObj.searchParams.get('field') || ''
    const degree = urlObj.searchParams.get('degree') || ''
    const skills = urlObj.searchParams.get('skills') || ''
    const keyword = urlObj.searchParams.get('keyword') || ''

    let q = `
    SELECT
    s.id AS student_id,
    p.id AS profile_id,
    p.full_name,
    p.headline,
    p.photo_url,
    p.city,
    p.field_of_study,
    (
      SELECT degree
      FROM education
      WHERE profile_id = p.id
      ORDER BY start_year DESC
      LIMIT 1
    ) AS degree,
    p.updated_at
FROM students s
INNER JOIN profiles p
ON p.student_id = s.id
WHERE s.is_verified = 1
    `

    const params = []

    if (field) {
      q += ` AND p.field_of_study LIKE ?`
      params.push(`%${field}%`)
    }

    if (degree) {
      q += ` AND e.degree LIKE ?`
      params.push(`%${degree}%`)
    }

    if (skills) {
      q += ` AND sk.name LIKE ?`
      params.push(`%${skills}%`)
    }

    if (keyword) {
      q += `
        AND (
          p.full_name LIKE ?
          OR p.headline LIKE ?
          OR p.field_of_study LIKE ?
        )
      `

      params.push(
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`
      )
    }

    q += ` ORDER BY p.updated_at DESC`

    const [rows] = await db.query(q, params)

    send(res, 200, {
      success: true,
      data: rows
    })

  } catch (e) {
    console.error(e)

    send(res, 500, {
      success: false,
      message: 'Server error'
    })
  }
}

async function getStudentById(req, res, studentId) {
  try {

    console.log('ID RECEIVED:', studentId)

    const profile = await Profile.getFullProfile(studentId)

    console.log('PROFILE FOUND:')
    console.log(profile)

    if (!profile)
      return send(res, 404, {
        success: false,
        message: 'Not found'
      })

    const { student_id, ...safe } = profile

    send(res, 200, {
      success: true,
      data: safe
    })
  } catch (e) {
  console.error('SEARCH ERROR:', e)

  send(res, 500, {
    success: false,
    message: e.message
  })
}
}

module.exports = { searchStudents, getStudentById }
