import { useState } from 'react'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogCreationForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    let createdBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    try {
      dispatch(createBlog(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setBlogformVisible(false)
      dispatch(
        notificationChange({
          message: `New blog ${createdBlog.title} by ${createdBlog.author}`,
          notificationtype: 'success',
        })
      )
    } catch {
      dispatch(
        notificationChange({
          message:
            'Something went wrong when creating new blog. Fill all the fields',
          notificationtype: 'error',
        })
      )
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            Title:
            <input
              id="titlefield"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Author:
            <input
              id="authorfield"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Url:
            <input
              id="urlfield"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button data-testid="newblogbutton" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogCreationForm
