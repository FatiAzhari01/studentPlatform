const db = require('../config/db')

const Student = {
  findByEmail: (email) =>
    db.query('SELECT * FROM students WHERE email = ?', [email]),

  findByStudentCode: (studentCode) =>
    db.query('SELECT * FROM students WHERE student_code = ?', [studentCode]),

  create: (studentCode, email, passwordHash) =>
    db.query(
      'INSERT INTO students (student_code, email, password_hash, is_verified) VALUES (?, ?, ?, 1)',
      [studentCode, email, passwordHash]
    ),

  findById: (id) =>
    db.query('SELECT id, email, student_code, is_verified FROM students WHERE id = ?', [id])
}

module.exports = Student
