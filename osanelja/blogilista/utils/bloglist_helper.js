const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const newBlog = {
  title: 'Test title',
  author: 'Test author',
  url: 'https://example.com/',
  likes: 8
}

const missingLikesBlog = {
  title: 'Test title0',
  author: 'Test author0',
  url: 'https://example.com/',
  likes: ''
}

const missingTitleBlog = {
  title: '',
  author: 'Test author',
  url: 'https://example.com/',
  likes: 8
}

const missingUrlBlog = {
  title: 'Test title',
  author: 'Test author',
  url: '',
  likes: 8
}

const testUser = {
  username: 'Test POSTname',
  name: 'Niko Nissinenn',
  password: 'salasana2'
}


const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  missingLikesBlog,
  missingTitleBlog,
  missingUrlBlog,
  usersInDatabase,
  testUser,
  blogsInDb
}