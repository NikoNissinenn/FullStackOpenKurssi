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
    assert(contents.includes('Edsger W. Dijkstra'))
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

  test('Missing Likes- field will result to default value of 0', async () => {
    await api
      .post('/api/blogs')
      .send(blogHelper.missingLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, (blogHelper.initialBlogs.length + 1))
    assert.deepStrictEqual(response.body[2].likes, 0)
  })

  test('Missing Title- field will result to response 400', async () => {
    await api
      .post('/api/blogs')
      .send(blogHelper.missingTitleBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogHelper.initialBlogs.length)
  })

  test('Missing URL- field will result to response 400', async () => {
    await api
      .post('/api/blogs')
      .send(blogHelper.missingUrlBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogHelper.initialBlogs.length)
  })
})


describe('Bloglist DELETE-method tests', () => {
  test('Valid blog can be deleted', async () => {
    await api
      .delete(`/api/blogs/${blogHelper.initialBlogs[0]._id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, (blogHelper.initialBlogs.length - 1))
  })

  test('Invalid blog returns status code 400 for malformatted ID', async () => {
    await api
      .delete('/api/blogs/invalidID')
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogHelper.initialBlogs.length)
  })
})

describe('Bloglist PUT-method tests', () => {
  test('Valid blog can be updated and returns statuscode 200', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]
    const updatedBlog = {
      ...blogToUpdate,
      likes: 22
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')

    assert.strictEqual(blogsAtStart.body.length, blogsAtEnd.body.length)
    assert.deepStrictEqual(blogsAtEnd.body[0].likes, 22)
  })

  test('Invalid ID returns status code 400 for malformatted ID', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      ...blogToUpdate,
      likes: 22
    }

    await api.put('/api/blogs/invalidID')
      .send(updatedBlog)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.deepStrictEqual(blogsAtEnd.body[0].likes, blogsAtStart.body[0].likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})