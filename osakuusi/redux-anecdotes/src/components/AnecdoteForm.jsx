import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newanec.value      
    event.target.newanec.value = ''
    dispatch(createNewAnecdote(content))
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