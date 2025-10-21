import { beforeEach, expect } from 'vitest'
import Blog from './Blog'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Blog Component to be rendered', () => {
  const blog = {
    title: 'Testing render from blogtest-file',
    author: 'Tester',
    url: 'https://www.example.com',
    likes: 5,
    user: {
      username: 'Niko Nissinen',
      name: 'Niko Nissinen',
    },
  }

  const user = {
    username: 'Niko Nissinen',
    name: 'Niko Nissinen',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5pa28gTmlzc2luZW4iLCJpZCI6IjY4ZGI3ZGRiYjFlZjdiMDM5MDYyMWM2NyIsImlhdCI6MTc1OTM5Mzk5N30.n7xLvhg1DezXxxmVAPD3QAqM0oJvOhvMlPelJhL7PkM',
  }

  const mockHandler = vi.fn()

  beforeEach(() => {
    render(
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        handleBlogUpdate={mockHandler}
      />
    )
  })

  test('Renders title and author by default', () => {
    expect(screen.getByText(`Title: ${blog.title}`)).toBeDefined()
    expect(screen.getByText(`Author: ${blog.author}`)).toBeDefined()
    expect(screen.queryByText(`Url: ${blog.url}`)).not.toBeVisible()
    expect(screen.queryByText(`Likes: ${blog.likes}`)).not.toBeVisible()
  })

  test('Renders URL and likes when button is clicked', async () => {
    const eventUser = userEvent.setup()
    const button = screen.getByText('View')
    await eventUser.click(button)

    expect(screen.getByText(`Title: ${blog.title}`)).toBeDefined()
    expect(screen.getByText(`Author: ${blog.author}`)).toBeDefined()
    expect(screen.getByText(`Url: ${blog.url}`)).toBeVisible()
    expect(screen.getByText(`Likes: ${blog.likes}`)).toBeVisible()
  })

  test('Clicking Like- button twice calls it two times', async () => {
    const eventUser = userEvent.setup()
    const button = screen.getByText('View')
    await eventUser.click(button)

    const likeButton = screen.getByText('Like')
    await eventUser.click(likeButton)
    await eventUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
