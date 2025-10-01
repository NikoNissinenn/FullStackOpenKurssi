import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs( blogs )
    )  
  }, [newBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setSuccessMessage(`Fetched user info from local storage`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`You have been logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(null)
      setUser(null)
      setSuccessMessage(`You have been logged out`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Something went wrong when login out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      let createdBlog = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }
      setNewBlog(createdBlog)
      await blogService.create(createdBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNewBlog('')
      setSuccessMessage(`New blog ${createdBlog.title} by ${createdBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Something went wrong when creating new blog. Fill all the fields')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <label>
          Username
          <input
            id='usernamefield'
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            id='passwordfield'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <p>
        {`${user.username} logged in`}
        <button onClick={handleLogout}>Logout</button>
      </p>
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
        <button type="submit">Create</button>
      </form>

      <div>
        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
      </div>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App