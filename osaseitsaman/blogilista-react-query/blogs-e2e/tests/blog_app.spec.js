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

    test('A blog can be liked', async ({ page }) => {
      await testHelper.createBlog(page, 'Test title', 'Test Author', 'https://www.example.com')
      await page.getByText('View').click()
      await page.getByText('Like').click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
      await expect(page.getByText("Blog 'Test title' updated")).toBeVisible()
    })

    test('A blog can be removed by user who added it', async ({ page }) => {
      await testHelper.createBlog(page, 'Test title', 'Test Author', 'https://www.example.com')
      await page.getByText('View').click()

      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      await page.getByText('Remove').click()      

      await expect(page.getByText("Blog 'Test title' by 'Test Author' deleted")).toBeVisible()
    })

    test('Delete- button is shown only to user who added the blog', async ({ page, request }) => {
      await testHelper.createBlog(page, 'Cant see this', 'Other User', 'https://www.example.com')
      await page.getByText('Logout').click()
      
      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'Another User',
          name: 'Another User',
          password: 'salasana',
        },
      })

      await testHelper.loginWith(page, 'Another User', 'salasana')
      await page.getByText('View').click()
      await expect(page.getByText('Remove')).not.toBeVisible()
      await expect(page.getByText('Title: Cant see this')).toBeVisible()
    })

    test('Blogs are arranged by their likes, most likes on top', async ({ page }) => {
      await testHelper.createBlog(page, 'Test title', 'Test Author', 'https://www.example.com')
      await testHelper.createBlog(page, 'Test title2', 'Test Author2', 'nettisivu')
      await testHelper.createBlog(page, 'Test title3', 'Test Author3', 'testausta')

      await page.getByTestId('viewblogbutton-Test title').click()
      await page.waitForTimeout(20)

      await page.getByTestId('viewblogbutton-Test title2').click()
      await page.waitForTimeout(20)
      await page.getByTestId('likeblogbutton-Test title2').click()
      await page.waitForTimeout(20)

      await page.getByTestId('viewblogbutton-Test title3').click()
      await page.waitForTimeout(20)
      await page.getByTestId('likeblogbutton-Test title3').click()
      await page.waitForTimeout(20)
      await page.getByTestId('likeblogbutton-Test title3').click()
      await page.waitForTimeout(100)

      expect(page.getByTestId('blog-likes').first()).toContainText('Likes: 2')
      expect(page.getByTestId('blog-likes').nth(1)).toContainText('Likes: 1')
      expect(page.getByTestId('blog-likes').last()).toContainText('Likes: 0')
      
      expect(page.getByTestId('blog-row').first()).toContainText('Title: Test title3 Hide')
      expect(page.getByTestId('blog-row').nth(1)).toContainText('Title: Test title2 Hide')
      expect(page.getByTestId('blog-row').last()).toContainText('Title: Test title Hide')
    })
  })
})