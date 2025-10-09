import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";
import anecdoteSerive from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newanec.value      
    event.target.newanec.value = ''
    const newAnecdote = await anecdoteSerive.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationChange(`New anecdote "${content}" created`))
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='newanec'/>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm