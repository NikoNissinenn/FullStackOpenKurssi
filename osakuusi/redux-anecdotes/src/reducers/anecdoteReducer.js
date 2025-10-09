import { createSlice } from "@reduxjs/toolkit"

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

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer