/* eslint-disable react/prop-types */
import { useNotificationDispatch } from './NotificationContext'

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const notificationDispatch = useNotificationDispatch()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: (100000 * Math.random()).toFixed(0), votes: 0 })
    notificationDispatch({
      type: 'SET',
      payload: `New anecdote "${content}" created`
    })
}

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
