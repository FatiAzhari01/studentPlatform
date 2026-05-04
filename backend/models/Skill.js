const db = require('../config/db')

const Skill = {
  findByProfileId: (profileId) =>
    db.query('SELECT * FROM skills WHERE profile_id = ?', [profileId]),

  create: (profileId, { name, category }) =>
    db.query(
      'INSERT INTO skills (profile_id, name, category) VALUES (?,?,?)',
      [profileId, name, category]
    )
}

module.exports = Skill
