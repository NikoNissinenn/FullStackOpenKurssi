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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newBlog),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Error: Failed to create blog')
  }

  return await response.json()
}

export const updateBlog = async (blog) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  }

  const response = await fetch(`${baseUrl}/${blog.id}`, options)

  if (!response.ok) {
    throw new Error('Error: Failed to update blog')
  }

  return await response.json()
}

export const deleteBlog = async ({ blog, token }) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await fetch(`${baseUrl}/${blog.id}`, options)
  console.log(response)

  if (!response.ok) {
    throw new Error('Error: Failed to delete blog')
  }

  return blog
}
