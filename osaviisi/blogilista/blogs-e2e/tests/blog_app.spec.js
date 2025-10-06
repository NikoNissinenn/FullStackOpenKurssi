const { test, expect, describe, beforeEach } = require('@playwright/test')
const testHelper = require('./helper')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'Niko Nissinen',
        name: 'Niko Nissinen',
        password: 'salasana',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login-form is shown by default', async ({ page }) => {
    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()

    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      await testHelper.loginWith(page, 'Niko Nissinen', 'salasana')
      await expect(page.getByTestId('logoutbutton')).toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await testHelper.loginWith(page, 'InvalidName', 'InvalidPassword')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'Niko Nissinen',
          name: 'Niko Nissinen',
          password: 'salasana',
        },
      })

    await page.goto('http://localhost:5173')
    await page.getByLabel('Username').fill('Niko Nissinen')
    await page.getByLabel('Password').fill('salasana')
    await page.getByText('Login').click()
    })

    test('A new blog can be created', async ({ page }) => {
      await testHelper.createBlog(page, 'Test title', 'Test Author', 'https://www.example.com')
      expect(page.getByText('New blog Test title by Test Author'))
      await expect(page.getByText('View')).toBeVisible()
    })
})
})