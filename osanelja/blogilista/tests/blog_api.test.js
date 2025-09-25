const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const blogHelper = require('../utils/bloglist_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogHelper.initialBlogs)
})

describe('Bloglist GET-method tests', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, blogHelper.initialBlogs.length)
  })

  test('Specific blog content is returned correctly', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.author)    
    assert(contents.includes("Edsger W. Dijkstra"))
  })

  test('Returned blog indentifier is "id" instead "_id"', async () => {
    const response = await api.get('/api/blogs')
    
    assert.deepStrictEqual(response.body[0].id, blogHelper.initialBlogs[0]._id)
  })
})

after(async () => {
  await mongoose.connection.close()
})