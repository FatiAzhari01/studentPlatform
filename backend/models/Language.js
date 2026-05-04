const db = require('../config/db')

const Language = {
  findByProfileId: (profileId) =>
    db.query('SELECT * FROM languages WHERE profile_id = ?', [profileId]),

  create: (profileId, { name, proficiencyLevel }) =>
    db.query(
      'INSERT INTO languages (profile_id, name, proficiency_level) VALUES (?,?,?)',
      [profileId, name, proficiencyLevel]
    )
}

module.exports = Language
