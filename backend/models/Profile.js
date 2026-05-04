const db = require('../config/db')

const Profile = {
  create: (studentId) =>
    db.query('INSERT INTO profiles (student_id) VALUES (?)', [studentId]),

  findByStudentId: (studentId) =>
    db.query('SELECT * FROM profiles WHERE student_id = ?', [studentId]),

  update: (studentId, { headline, photoUrl, city, linkedinUrl }) =>
    db.query(
      'UPDATE profiles SET headline=?, photo_url=?, city=?, linkedin_url=? WHERE student_id=?',
      [headline, photoUrl, city, linkedinUrl, studentId]
    )
}

module.exports = Profile
