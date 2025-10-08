import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import {  voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

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

      <AnecdoteForm />
    </div>
  )
}

export default App