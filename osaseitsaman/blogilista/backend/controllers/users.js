const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({
      error: 'Password- field is missing for user',
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'Password minium length is 3 characters',
    })
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
