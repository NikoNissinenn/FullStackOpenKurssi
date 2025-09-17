import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {  
  return axios.delete(`${baseUrl}/${id}`)   
}

export default { 
  getAll: getAll,
  getOne: getOne, 
  create: create, 
  update: update,
  deletePerson: deletePerson,
  baseUrl: baseUrl
}