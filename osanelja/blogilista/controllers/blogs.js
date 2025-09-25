const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

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
    likes: body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter