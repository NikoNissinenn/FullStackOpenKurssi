import { useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { getBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { getComments } from '../reducers/commentReducer'
import CommentsForm from './CommentsForm'

const SingleBlogPage = ({ handleBlogUpdate, handleBlogDelete }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs.data)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === String(id))
  const user = useSelector((state) => state.logindata)
  const comments = useSelector((state) => state.comments.data)
  

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    if (blog && user) {
      dispatch(getComments(blog.id))
    }
  }, [dispatch])  

  if (!blog) {
    return <div>loading blog data</div>
  }  

  if (!user) {
    return <div>loading comments data</div>
  }

  if (!comments) {
    return <div>loading comments data</div>
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
            className='mx-2 btn btn-primary'
          >
            Like
          </button>
      </p>
      <p>Added by {blog.user.username}</p>
      <p>
        {blog.user.username === user.username ? (
          <button className='btn btn-secondary' onClick={() => handleBlogDelete(blog)}>Remove blog</button>
        ) : (
          <></>
        )}
      </p>
      <CommentsForm blog={blog}/>
    </div>
  )
}

export default SingleBlogPage