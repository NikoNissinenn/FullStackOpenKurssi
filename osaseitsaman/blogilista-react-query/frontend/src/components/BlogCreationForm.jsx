import { useState } from 'react'
import { useNotificationDispatch } from '../contextfiles/NotificationContext'
import { useQuery, useMutation } from '@tanstack/react-query'

const BlogCreationForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const token = props.user.token

  const notificationDispatch = useNotificationDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      let createdBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      }
      props.newBlogMutation.mutate({ newBlog: createdBlog, token })
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setBlogformVisible(false)
      notificationDispatch({
        type: 'SET',
        payload: `New blog ${createdBlog.title} by ${createdBlog.author}`,
      })
    } catch {
      notificationDispatch({
        type: 'SET',
        payload: `Error: Something went wrong when creating new blog. Fill all the fields`,
      })
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
