import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newanec.value
    event.target.newanec.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name='newanec'/>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default AnecdoteForm