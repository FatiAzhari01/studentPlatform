// src/services/profileService.js
import api from './axiosInstance'

// ── Profile header ──────────────────────────────────────────
export const getMyProfile  = ()     => api.get('/profile/me')
export const updateProfile = (data) => api.put('/profile/me', data)

// ── Education ───────────────────────────────────────────────
export const addEducation    = (data)     => api.post('/profile/education',      data)
export const updateEducation = (id, data) => api.put(`/profile/education/${id}`, data)
export const deleteEducation = (id)       => api.delete(`/profile/education/${id}`)

// ── Experience ──────────────────────────────────────────────
export const addExperience    = (data)     => api.post('/profile/experience',      data)
export const updateExperience = (id, data) => api.put(`/profile/experience/${id}`, data)
export const deleteExperience = (id)       => api.delete(`/profile/experience/${id}`)

// ── Projects ────────────────────────────────────────────────
export const addProject    = (data)     => api.post('/profile/project',      data)
export const updateProject = (id, data) => api.put(`/profile/project/${id}`, data)
export const deleteProject = (id)       => api.delete(`/profile/project/${id}`)

// ── Skills ──────────────────────────────────────────────────
export const addSkill    = (data) => api.post('/profile/skill',      data)
export const deleteSkill = (id)   => api.delete(`/profile/skill/${id}`)

// ── Languages ───────────────────────────────────────────────
export const addLanguage    = (data)     => api.post('/profile/language',      data)
export const updateLanguage = (id, data) => api.put(`/profile/language/${id}`, data)
export const deleteLanguage = (id)       => api.delete(`/profile/language/${id}`)