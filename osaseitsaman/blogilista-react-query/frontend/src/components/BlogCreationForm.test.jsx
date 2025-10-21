import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreationForm from './BlogCreationForm'
import { beforeEach, expect } from 'vitest'

describe('BlogCreationForm- tests', () => {
  const newBlog = {
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

  const mockHandlerOne = vi.fn()
  const mockHandlerTwo = vi.fn()
  const mockHandlerThree = vi.fn()

  beforeEach(() => {
    render(
      <BlogCreationForm
        handleNewBlog={mockHandlerOne}
        setSuccessMessage={mockHandlerTwo}
        setErrorMessage={mockHandlerThree}
      />
    )
  })

  test('New Blog creation gives correct response', async () => {
    const eventUser = userEvent.setup()

    const inputTitle = screen.getByLabelText('Title:')
    const inputAuthor = screen.getByLabelText('Author:')
    const inputUrl = screen.getByLabelText('Url:')
    const sendButton = screen.getByText('Create')

    await eventUser.type(inputTitle, 'Testing render from blogtest-file')
    await eventUser.type(inputAuthor, 'Tester')
    await eventUser.type(inputUrl, 'https://www.example.com')
    await eventUser.click(sendButton)

    expect(mockHandlerOne.mock.calls).toHaveLength(1)
    expect(mockHandlerOne.mock.calls[0][0]).toEqual({
      title: 'Testing render from blogtest-file',
      author: 'Tester',
      url: 'https://www.example.com',
      likes: 0,
    })
  })
})
