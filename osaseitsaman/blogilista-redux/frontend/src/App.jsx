import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import { notificationChange } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import {
  clearLoginData,
  getLoginData,
  setLoginData,
} from './reducers/loginReducer'
import { Routes, Route, Link } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import SingleUserPage from './components/SingleUserPage'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogformVisible, setBlogformVisible] = useState(false)

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs.data)
  const user = useSelector((state) => state.logindata)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      dispatch(setLoginData(JSON.parse(loggedUserJSON)))
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
      dispatch(getLoginData({ username, password }))
      setUsername('')
      setPassword('')
    } catch {
      console.log(error, error.message)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(clearLoginData(user))
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
      dispatch(updateBlog({ id: updatedBlog.id, blog: updatedBlog }))
      dispatch(
        notificationChange({
          message: `Blog '${updatedBlog.title}' updated`,
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
        dispatch(deleteBlog(blog.id))
        dispatch(
          notificationChange({
            message: `Blog '${blog.title}' by '${blog.author}' deleted`,
            notificationtype: 'success',
          })
        )
      } catch (error) {
        dispatch(getBlogs(blogs))
        dispatch(
          notificationChange({
            message: `Deleting blog '${blog.title}' by '${blog.author}' failed. ${(error, error.message)}`,
            notificationtype: 'error',
          })
        )
      }
    }
  }

  const loginForm = () => (
    user.username === null ? (
    <form onSubmit={handleLogin} className='my-3'>
      <h4 className='mb-3'>Log in to application</h4>
      <div className='mb-2'>
        <label>
          Username:
          <input
            id="usernamefield"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className='mx-2'
          />
        </label>
      </div>
      <div className='mb-2'>
        <label>
          Password:
          <input
            id="passwordfield"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className='mx-3'
          />
        </label>
      </div>
      <button type="submit" className='ml-3'>Login</button>
    </form>)
    :(
    <div className='my-4'>
      <p className='h5'>
        {`${user.username} logged in`}
      </p>
      <button data-testid="logoutbutton" onClick={handleLogout}>
        Logout
      </button>
    </div>)    
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible = { display: blogformVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} className='my-3'>
          <button
            data-testid="createblogbutton"
            onClick={() => setBlogformVisible(true)}
          >
            Create new blog
          </button>
        </div>

        <div style={showWhenVisible}>
          <BlogCreationForm setBlogformVisible={setBlogformVisible} />
          <button onClick={() => setBlogformVisible(false)}>Cancel</button>
        </div>
        <div>
          <ul className=' w-75 ps-3'>
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
    <div className='container-fluid'>      
      <h1 className='my-2'>Blogs</h1>
      <Notification className='my-2'/>      
      {loginForm()}
      <Routes>
        <Route path='/' element={user.name && blogForm()}></Route>
        <Route path='/users' element={<UsersPage/>}></Route>
        <Route path='/users/:id' element={<SingleUserPage />}></Route>
      </Routes>      
    </div>
  )
}

export default App
