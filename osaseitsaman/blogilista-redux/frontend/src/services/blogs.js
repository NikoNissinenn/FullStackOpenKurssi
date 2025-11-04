import axios from 'axios'
const baseUrl = '/api/blogs'
import { getToken } from '../reducers/loginReducer'

let token = getToken()

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token },
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, create, update, setToken, remove }
