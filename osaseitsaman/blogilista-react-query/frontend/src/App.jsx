import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import { useNotificationDispatch } from './contextfiles/NotificationContext'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './contextfiles/requests'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogformVisible, setBlogformVisible] = useState(false)

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      notificationDispatch({
        type: 'SET',
        payload: 'Fetched user info from local storage',
      })
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const newBlogMutation = useMutation({
    mutationFn: ({ newBlog, token }) => createBlog({ newBlog, token }),
    onSuccess: (createdBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET',
        payload: `New blog ${createdBlog.title} by ${createdBlog.author}`,
      })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SET',
        payload: `Error: Something went wrong when creating new blog. Fill all the fields`,
      })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: (blog) => updateBlog(blog),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET',
        payload: `Blog '${updatedBlog.title}' updated`,
      })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SET',
        payload: 'Error: Updating blog failed',
      })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: ({ blog, token }) => deleteBlog({ blog, token }),
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET',
        payload: `Blog '${blog.title}' by '${blog.author}' deleted`,
      })
    },
    onError: (error, blog) => {
      console.log(error)
      notificationDispatch({
        type: 'SET',
        payload: `Error: Deleting blog '${blog.title}' by '${blog.author}' failed. It has already been removed`,
      })
    },
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div>Bloglist service not available due to problems in server</div>
  }

  const blogs = result.data

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notificationDispatch({
        type: 'SET',
        payload: 'You have been logged in',
      })
    } catch {
      notificationDispatch({
        type: 'SET',
        payload: 'Error: Wrong username or password',
      })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(null)
      setUser(null)
      notificationDispatch({
        type: 'SET',
        payload: 'You have been logged out',
      })
    } catch {
      notificationDispatch({
        type: 'SET',
        payload: 'Error: Something went wrong when login out',
      })
    }
  }

  const handleBlogUpdate = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlogMutation.mutate(updatedBlog)
  }

  const handleBlogDelete = async (blog) => {
    let text = `Remove blog '${blog.title}' by '${blog.author}' ?`
    if (confirm(text) === true) {
      const token = user.token
      deleteBlogMutation.mutate({ blog, token })
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  console.log(queryClient.getQueryState(['blogs']))

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
            newBlogMutation={newBlogMutation}
            user={user}
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
