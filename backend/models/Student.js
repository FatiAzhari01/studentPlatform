// models/Student.js

const db = require('../config/db')

const Student = {
  /** Find by email — returns full row including password_hash */
  findByEmail: (email) =>
    db.query('SELECT * FROM students WHERE email = ? LIMIT 1', [email]),
   /** Activate existing student account */
  activateAccount: (id, email, passwordHash) =>
    db.query(
      `UPDATE students
       SET email = ?, password_hash = ?, is_verified = 1
       WHERE id = ?`,
      [email, passwordHash, id]
    ),
  /** Find by student code */
  findByStudentCode: (code) =>
    db.query('SELECT * FROM students WHERE student_code = ? LIMIT 1', [code]),

  /** Find by PK (safe — no password) */
  findById: (id) =>
    db.query(
      'SELECT id, email, student_code, is_verified, created_at FROM students WHERE id = ? LIMIT 1',
      [id]
    ),

  /** Create account */
  create: (studentCode, email, passwordHash) =>
    db.query(
      'INSERT INTO students (student_code, email, password_hash, is_verified) VALUES (?, ?, ?, 1)',
      [studentCode, email, passwordHash]
    ),
    /**Activate student account with code*/
    activateStudent: (id, email, passwordHash) =>
  db.query(
    `UPDATE students
     SET email = ?,
         password_hash = ?,
         is_verified = 1
     WHERE id = ?`,
    [email, passwordHash, id]
  ),

  /** Check if email already exists */
  emailExists: async (email) => {
    const [rows] = await db.query(
      'SELECT id FROM students WHERE email = ? LIMIT 1', [email]
    )
    return rows.length > 0
  }

}
 
module.exports = Student