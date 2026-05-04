import axios from 'axios'

const API = import.meta.env.VITE_API_URL || '/api'

export const searchStudents = (filters = {}) =>
  axios.get(`${API}/students`, { params: filters })

export const getStudentById = (id) =>
  axios.get(`${API}/students/${id}`)
