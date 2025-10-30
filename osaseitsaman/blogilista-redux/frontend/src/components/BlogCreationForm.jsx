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

      <form onSubmit={handleNewBlog} className='w-50 my-3 form-control border border-dark'>
        <div className='row mb-2 me-2'>
          <label className='col-sm-2'>
            Title:            
          </label>
          <input
              id="titlefield"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className='col'
            />
        </div>

        <div className='row mb-2 me-2'>
          <label className='col-sm-2'>
            Author:            
          </label>
          <input
              id="authorfield"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              className='col'
            />
        </div>

        <div className='row mb-2 me-2'>
          <label className='col-sm-2'>
            Url:            
          </label>
          <input
              id="urlfield"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              className='col'
            />
        </div >
        <button data-testid="newblogbutton" type="submit" className='btn btn-primary row m-2'>
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogCreationForm
