const db = require('../config/db')

const Education = {
  findByProfileId: (profileId) =>
    db.query('SELECT * FROM education WHERE profile_id = ?', [profileId]),

  create: (profileId, { degree, institution, fieldOfStudy, startYear, endYear, gpa }) =>
    db.query(
      'INSERT INTO education (profile_id, degree, institution, field_of_study, start_year, end_year, gpa) VALUES (?,?,?,?,?,?,?)',
      [profileId, degree, institution, fieldOfStudy, startYear, endYear, gpa]
    )
}

module.exports = Education
