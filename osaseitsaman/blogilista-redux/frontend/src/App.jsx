import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import { notificationChange } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogformVisible, setBlogformVisible] = useState(false)

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs.data)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(
        notificationChange({
          message: 'Fetched user info from local storage',
          notificationtype: 'success',
        })
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(
        notificationChange({
          message: 'You have been logged in',
          notificationtype: 'success',
        })
      )
    } catch {
      dispatch(
        notificationChange({
          message: 'Wrong username or password',
          notificationtype: 'error',
        })
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(null)
      setUser(null)
      dispatch(
        notificationChange({
          message: 'You have been logged out',
          notificationtype: 'success',
        })
      )
    } catch {
      dispatch(
        notificationChange({
          message: 'Something went wrong when login out',
          notificationtype: 'error',
        })
      )
    }
  }

  const handleBlogUpdate = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      )
      dispatch(
        notificationChange({
          message: `Blog '${returnedBlog.title}' updated`,
          notificationtype: 'success',
        })
      )
    } catch {
      dispatch(
        notificationChange({
          message: 'Updating blog failed',
          notificationtype: 'error',
        })
      )
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleBlogDelete = async (blog) => {
    let text = `Remove blog '${blog.title}' by '${blog.author}' ?`
    if (confirm(text) === true) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(
          notificationChange({
            message: `Blog '${blog.title}' by '${blog.author}' deleted`,
            notificationtype: 'success',
          })
        )
      } catch {
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(
          notificationChange({
            message: `Deleting blog '${blog.title}' by '${blog.author}' failed. It has already been removed`,
            notificationtype: 'error',
          })
        )
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <label>
          Username
          <input
            id="usernamefield"
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
            id="passwordfield"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible = { display: blogformVisible ? '' : 'none' }

    return (
      <div>
        <p>
          {`${user.username} logged in`}
          <button data-testid="logoutbutton" onClick={handleLogout}>
            Logout
          </button>
        </p>

        <div style={hideWhenVisible}>
          <button
            data-testid="createblogbutton"
            onClick={() => setBlogformVisible(true)}
          >
            Create new blog
          </button>
        </div>

        <div style={showWhenVisible}>
          <BlogCreationForm
            setBlogformVisible={setBlogformVisible}
            handleNewBlog={blogService.create}
          />
          <button onClick={() => setBlogformVisible(false)}>Cancel</button>
        </div>
        <div>
          <ul>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleBlogUpdate={handleBlogUpdate}
                handleBlogDelete={handleBlogDelete}
                user={user}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App
