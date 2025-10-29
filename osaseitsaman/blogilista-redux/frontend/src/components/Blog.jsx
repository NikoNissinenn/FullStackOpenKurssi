import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleBlogDelete, user }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogInfoVisible(!blogInfoVisible)
  }

  return (
    <div className='border border-dark my-3 py-2'>
      <ul style={hideWhenVisible}>
        <li>
          {blog.title} - {blog.author}{' '}
          <button
            data-testid={`viewblogbutton-${blog.title}`}
            onClick={toggleVisibility}
          >
            View
          </button>
        </li>
      </ul>

      <ul style={showWhenVisible}>
        <li data-testid={`blog-row`}>
          Title: {blog.title}{' '}
          <button
            data-testid={`hideblogbutton-${blog.title}`}
            onClick={toggleVisibility}
          >
            Hide
          </button>
        </li>
        <li>Url: {blog.url}</li>
        <li data-testid={`blog-likes`}>
          Likes: {blog.likes}{' '}
          <button
            data-testid={`likeblogbutton-${blog.title}`}
            onClick={() => handleBlogUpdate(blog)}
          >
            Like
          </button>
        </li>
        <li>Author: {blog.author}</li>
        {blog.user.username === user.username ? (
          <button onClick={() => handleBlogDelete(blog)}>Remove</button>
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default Blog
