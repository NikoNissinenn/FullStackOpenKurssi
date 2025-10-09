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
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateOne(id)
    const anecdotes = await anecdoteService.getAll()
    const updatedAnecdotes = anecdotes.map((a) => (a.id !== id ? a : updatedAnecdote))
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export const { createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer