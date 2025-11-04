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
  getLoginState,
  setLoginData,
} from './reducers/loginReducer'
import { Routes, Route } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'
import { setToken } from './services/blogs'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogformVisible, setBlogformVisible] = useState(false)
  const [loginformVisible, setLoginformVisible] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs.data)
  const user = useSelector((state) => state.logindata)

  const homePage = 'http://localhost:5173'

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getLoginState())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoginData(user))
      setToken(user.token)
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
      setLoginformVisible(false)
    } catch {
      console.log(error, error.message)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(clearLoginData(user))
      setToken(null)
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
        navigate('/')
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

  const loginForm = () => {
    const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible = { display: blogformVisible ? '' : 'none' }

    return (
    loginformVisible === true ? (
    <form style={hideWhenVisible} onSubmit={handleLogin} className='my-3 form-control'>
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
      <button type="submit" className='btn btn-primary ml-3'>Login</button>
    </form>)
    :(<div className={showWhenVisible}></div>)  
  )}

  const blogForm = () => {
    const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible = { display: blogformVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} className='my-3'>
          <button
            data-testid="createblogbutton"
            onClick={() => setBlogformVisible(true)}
            className='btn btn-primary'
          >
            Create new blog
          </button>
        </div>

        <div style={showWhenVisible}>
          <BlogCreationForm setBlogformVisible={setBlogformVisible} />
          <button className='btn btn-primary' onClick={() => setBlogformVisible(false)}>Cancel</button>
        </div>
        <div>
        {sortedBlogs.length > 0 ? (
          <ul className=' w-75 ps-3'>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
              />
            ))}
          </ul>
        ) : (
          <div className='h5 my-4'>No blogs in list, click 'Create new blog' to start</div>
        )}          
        </div>
      </div>
    )
  }

  return (
    <div className='container-fluid'>
      <nav className='navbar bg-dark'>
        <div className='container-fluid'>
          <ul className='nav flex-wrap'>
            <li className='nav-item'>
              <a className='navbar-brand align-text-top' href="#">
                <img src='../public/vite.svg' alt="Brand icon" />
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white align-text-top' href={homePage}>Blogs</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link text-white align-text-top' href={`${homePage}/users`}>Users</a>
            </li>
            {user.username === null ?
              (<li className='nav-item navbar-text position-absolute end-0 px-5 align-text-top'>
                <button className='btn btn-primary py-0' data-testid="loginformbutton" onClick={() => setLoginformVisible(true)}>
                  Log in to application
                </button>
              </li>
              ) : (
              <li className='nav-item navbar-text px-3 position-absolute end-0 align-text-top'>
                <span className='text-white px-3 align-top'>{`${user.username} logged in`}</span>
                <button className='btn btn-primary mx-3 py-0' data-testid="logoutbutton" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              )
            }
          </ul>                 
        </div>
      </nav>   

      <h1 className='my-2'>Bloglist application</h1>
      <Notification className='my-2'/>
      {user.username ? (
        <></>
        ) : (
        <div className='h4 my-5'>Login to application from top right corner</div>
        )
      }      
      {loginForm()}
      <Routes>
        <Route path='/' element={user.name && blogForm()}></Route>
        <Route path='/users' element={<UsersPage/>}></Route>
        <Route path='/users/:id' element={<SingleUserPage />}></Route>
        <Route path='/blogs/:id' element={
          <SingleBlogPage 
          handleBlogUpdate={handleBlogUpdate}
          handleBlogDelete={handleBlogDelete}
          />}>        
        </Route>
      </Routes>      
    </div>
  )
}

export default App
