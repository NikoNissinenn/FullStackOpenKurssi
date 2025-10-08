/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, voteAnecdote }) => {
  return (
    <div key={anecdote.id} className='anecdote'>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button className='votebutton' onClick={() => voteAnecdote()}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
      }
    )}
  })

  const sortByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return sortByVotes.map((anecdote) =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      voteAnecdote={() => dispatch(voteAnecdote(anecdote.id))}
    />
  )
}

export default AnecdoteList