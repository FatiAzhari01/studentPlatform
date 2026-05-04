const db = require('../config/db')

const Experience = {
  findByProfileId: (profileId) =>
    db.query('SELECT * FROM experiences WHERE profile_id = ?', [profileId]),

  create: (profileId, { title, company, description, startDate, endDate, type }) =>
    db.query(
      'INSERT INTO experiences (profile_id, title, company, description, start_date, end_date, type) VALUES (?,?,?,?,?,?,?)',
      [profileId, title, company, description, startDate, endDate, type]
    )
}

module.exports = Experience
