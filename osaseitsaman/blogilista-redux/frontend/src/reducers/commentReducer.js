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
      state.data = state.data.concat(action.payload)
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

export const createComment = ({ id, comment }) => {
  return async (dispatch) => {
    const newComment = await commentService.create(id, comment)
    dispatch(addComment(newComment))
  }
}

export const { addComment, setComments } = commentSlice.actions
export default commentSlice.reducer