import { useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { getBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const SingleBlogPage = ({ handleBlogUpdate, handleBlogDelete }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs.data)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === String(id))
  const user = useSelector((state) => state.logindata)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2 className='my-4'>"{blog.title}" by {blog.author}</h2>
      <p><Link to={blog.url}>{blog.url}</Link></p>
      <p>
        {blog.likes} likes
        <button
            data-testid={`likeblogbutton-${blog.title}`}
            onClick={() => handleBlogUpdate(blog)}
            className='mx-2'
          >
            Like
          </button>
      </p>
      <p>Added by {blog.user.username}</p>
      <p>
        {blog.user.username === user.username ? (
          <button onClick={() => handleBlogDelete(blog)}>Remove blog</button>
        ) : (
          <></>
        )}
      </p>  
    </div>
  )
}

export default SingleBlogPage