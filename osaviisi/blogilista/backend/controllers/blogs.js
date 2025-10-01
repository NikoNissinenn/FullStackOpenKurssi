const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id:1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.title) {
    return response.status(400).json({
      error: 'Title- field is missing in blog'
    })
  }

  if (!body.url) {
    return response.status(400).json({
      error: 'URL- field is missing in blog'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not in database' })
  }

  const user = request.user

  if ( blog.user.toString() !== user.id.toString() ) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  await User.findByIdAndUpdate(
    blog.user,
    { $pull: { blogs: blog.id } })

  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  if (!request.body) {
    return response.status(400).json({
      error: 'Body is missing in blog'
    })
  }

  if (!request.params.id) {
    return response.status(400).json({
      error: 'ID is invalid in blog'
    })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter