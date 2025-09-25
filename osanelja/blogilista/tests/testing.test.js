const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total likes', () => {
  test('Of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('When list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.onlyOneBlog)
    assert.strictEqual(result, 7)
  })
  test('Of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.premadeBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('Favourite Blog', () => {
  test('Of empty list returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
  test('When list has only one blog equals the given blog', () => {
    const result = listHelper.favoriteBlog(listHelper.onlyOneBlog)
    assert.strictEqual(result, listHelper.onlyOneBlog[0])
  })
  test('Of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listHelper.premadeBlogs)
    assert.strictEqual(result, listHelper.premadeBlogs[2])
  })
})