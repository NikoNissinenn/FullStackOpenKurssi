import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const sortByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortByVotes.map((anecdote) =>
        <div key={anecdote.id} className='anecdote'>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button className='votebutton' onClick={() => dispatch(voteAnecdote(anecdote.id))}>Vote</button>
          </div>
        </div>
      )}
      <h2>Create new anecdote</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        const content = event.target.newanec.value
        dispatch(createAnecdote(content))}}>
        <div>
          <input name='newanec'/>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default App