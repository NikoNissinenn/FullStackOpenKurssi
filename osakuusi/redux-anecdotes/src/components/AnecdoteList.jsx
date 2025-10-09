/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVoting }) => {
  return (
    <div key={anecdote.id} className='anecdote'>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button className='votebutton' onClick={() => handleVoting(anecdote.id, anecdote.content, anecdote.votes)}>Vote</button>
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
      })
    }
  })

  const handleVoting = async ( id, content ) => {
    dispatch(voteForAnecdote(id))
    dispatch(notificationChange(`Voted "${content}"`))
  }

  const sortByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return sortByVotes.map((anecdote) =>
    <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleVoting={() => handleVoting(anecdote.id, anecdote.content)}
    />
  )
}

export default AnecdoteList