const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const userHelper = require('../utils/bloglist_helper')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

describe('Users GET-method tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'root', passwordHash })

    await user.save()
  })

  test('Users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All users are returned', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtStart.length, 1)
  })

  test('Specific user content is returned correctly', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtStart[0].username, 'root')
    assert.strictEqual(usersAtStart[0].name, 'root')
  })
})

describe('Users POST-method tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'root', passwordHash })

    await user.save()
  })

  test('New user can be created', async () => {
    const usersAtStart = await userHelper.usersInDatabase()

    const newUser = {
      username: userHelper.testUser.username,
      name: userHelper.testUser.name,
      password: userHelper.testUser.password,
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('Invalid new user information is not send when username is missing', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    const newUser = {
      username: '',
      name: userHelper.testUser.name,
      password: userHelper.testUser.password,
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    assert(result.body.error.includes('Missing username'))
  })

  test('Invalid new user information is not send when username is too short', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    const newUser = {
      username: 'TT',
      name: userHelper.testUser.name,
      password: userHelper.testUser.password,
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('Username must be at least'))
  })

  test('Invalid new user information is not send when username is not unique', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('expected `username` to be unique'))
  })

  test('Invalid new user information is not send when password is missing', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    const newUser = {
      username: userHelper.testUser.username,
      name: userHelper.testUser.name,
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('Password- field is missing for user'))
  })

  test('Invalid new user information is not send when password is too short', async () => {
    const usersAtStart = await userHelper.usersInDatabase()
    const newUser = {
      username: userHelper.testUser.username,
      name: userHelper.testUser.name,
      password: 'T',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('Password minium length is 3 characters'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
