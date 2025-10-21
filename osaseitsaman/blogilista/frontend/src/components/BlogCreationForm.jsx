import { useState } from 'react';

const BlogCreationForm = ( props ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      let createdBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }
      await props.handleNewBlog(createdBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setBlogformVisible(false)
      props.setSuccessMessage(`New blog ${createdBlog.title} by ${createdBlog.author}`)
      setTimeout(() => {
        props.setSuccessMessage(null)
      }, 5000)
    } catch {
      props.setErrorMessage('Something went wrong when creating new blog. Fill all the fields')
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
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
              id='titlefield'
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
              id='authorfield'
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
              id='urlfield'
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button data-testid='newblogbutton' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogCreationForm