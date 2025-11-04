const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id })
    .populate('blog', {
      title: 1,
      id: 1
    })
  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  })

  if (!body.content) {
    return response.status(400).json({
      error: 'Content cannot be an empty String',
    })
  }

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter