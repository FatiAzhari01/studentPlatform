const Profile = require('../models/Profile')
const Education = require('../models/Education')
const Experience = require('../models/Experience')
const Project = require('../models/Project')
const Skill = require('../models/Skill')
const Language = require('../models/Language')

async function getMyProfile(req, res, studentId) {
  const [profiles] = await Profile.findByStudentId(studentId)
  if (profiles.length === 0) {
    res.writeHead(404); return res.end(JSON.stringify({ error: 'Profile not found' }))
  }
  const profile = profiles[0]
  const [education] = await Education.findByProfileId(profile.id)
  const [experiences] = await Experience.findByProfileId(profile.id)
  const [projects] = await Project.findByProfileId(profile.id)
  const [skills] = await Skill.findByProfileId(profile.id)
  const [languages] = await Language.findByProfileId(profile.id)
  res.writeHead(200)
  res.end(JSON.stringify({ ...profile, education, experiences, projects, skills, languages }))
}

async function updateProfile(req, res, studentId) {
  await Profile.update(studentId, req.body)
  res.writeHead(200)
  res.end(JSON.stringify({ message: 'Profile updated' }))
}

async function addEducation(req, res, studentId) {
  const [profiles] = await Profile.findByStudentId(studentId)
  await Education.create(profiles[0].id, req.body)
  res.writeHead(201)
  res.end(JSON.stringify({ message: 'Education added' }))
}

async function addExperience(req, res, studentId) {
  const [profiles] = await Profile.findByStudentId(studentId)
  await Experience.create(profiles[0].id, req.body)
  res.writeHead(201)
  res.end(JSON.stringify({ message: 'Experience added' }))
}

async function addProject(req, res, studentId) {
  const [profiles] = await Profile.findByStudentId(studentId)
  await Project.create(profiles[0].id, req.body)
  res.writeHead(201)
  res.end(JSON.stringify({ message: 'Project added' }))
}

async function addSkill(req, res, studentId) {
  const [profiles] = await Profile.findByStudentId(studentId)
  await Skill.create(profiles[0].id, req.body)
  res.writeHead(201)
  res.end(JSON.stringify({ message: 'Skill added' }))
}

async function addLanguage(req, res, studentId) {
  const [profiles] = await Profile.findByStudentId(studentId)
  await Language.create(profiles[0].id, req.body)
  res.writeHead(201)
  res.end(JSON.stringify({ message: 'Language added' }))
}

module.exports = { getMyProfile, updateProfile, addEducation, addExperience, addProject, addSkill, addLanguage }
