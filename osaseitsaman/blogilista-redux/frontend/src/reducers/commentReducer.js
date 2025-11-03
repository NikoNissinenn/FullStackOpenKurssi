import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const initialState = {
  data: [],
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action) {
      state.data = action.data.concat(action.payload)
    },
    setComments(state, action) {
      state.data = action.payload
    },
  },
})

export const getComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getAllComments(id)
    dispatch(setComments(comments))
  }
}

export const { addComment, setComments } = commentSlice.actions
export default commentSlice.reducer