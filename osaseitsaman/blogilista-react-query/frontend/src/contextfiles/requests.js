const baseUrl = 'http://localhost:3003/api/blogs'

export const getBlogs = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Error: Failed to fetch blogs')
  }
  return await response.json()
}

export const createBlog = async ({ newBlog, token }) => {
  const options = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newBlog),
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Error: Failed to create blog')
  }
 
  return await response.json()
}