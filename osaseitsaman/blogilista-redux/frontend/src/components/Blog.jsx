import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <li className='border border-dark my-3 py-2 ps-2'>
      <Link to={`/blogs/${blog.id}`}>"{blog.title}" by {blog.author}</Link>
    </li>
  )
}

export default Blog
