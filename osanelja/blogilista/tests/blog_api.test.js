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


describe('Bloglist POST-method tests', () => {
  test('New blog can be posted', async () => {
    await api
      .post('/api/blogs')
      .send(blogHelper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, (blogHelper.initialBlogs.length + 1))
  })

  test('New blog content is properly saved and retrieved', async () => {
    await api
      .post('/api/blogs')
      .send(blogHelper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.deepStrictEqual(response.body[2].title, blogHelper.newBlog.title)
    assert.deepStrictEqual(response.body[2].author, blogHelper.newBlog.author)
    assert.deepStrictEqual(response.body[2].url, blogHelper.newBlog.url)
    assert.deepStrictEqual(response.body[2].likes, blogHelper.newBlog.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})