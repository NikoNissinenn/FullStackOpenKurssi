import axios from "axios";
const baseUrl = '/api/blogs'

const getAllComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

export default { getAllComments }