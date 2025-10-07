import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) =>
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
      <form>
        <div><input /></div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default App