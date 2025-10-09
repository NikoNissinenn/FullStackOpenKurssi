import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const selectedAnecdote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...selectedAnecdote,
        votes: selectedAnecdote.votes + 1
      }
      return state.map((anec) => {
        return anec.id === id ? votedAnecdote : anec
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))
  }
}

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer