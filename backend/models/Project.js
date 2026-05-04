const db = require('../config/db')

const Project = {
  findByProfileId: (profileId) =>
    db.query('SELECT * FROM projects WHERE profile_id = ?', [profileId]),

  create: (profileId, { title, description, projectUrl, techStack }) =>
    db.query(
      'INSERT INTO projects (profile_id, title, description, project_url, tech_stack) VALUES (?,?,?,?,?)',
      [profileId, title, description, projectUrl, JSON.stringify(techStack)]
    )
}

module.exports = Project
