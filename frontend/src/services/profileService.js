import axios from 'axios'

const API = import.meta.env.VITE_API_URL || '/api'

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const getMyProfile = () =>
  axios.get(`${API}/profile/me`, authHeader())

export const updateProfile = (data) =>
  axios.put(`${API}/profile/me`, data, authHeader())

export const addEducation = (data) =>
  axios.post(`${API}/profile/education`, data, authHeader())

export const addExperience = (data) =>
  axios.post(`${API}/profile/experience`, data, authHeader())

export const addProject = (data) =>
  axios.post(`${API}/profile/project`, data, authHeader())

export const addSkill = (data) =>
  axios.post(`${API}/profile/skill`, data, authHeader())

export const addLanguage = (data) =>
  axios.post(`${API}/profile/language`, data, authHeader())
