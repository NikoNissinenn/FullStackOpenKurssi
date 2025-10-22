import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = {
  data: []
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.data = state.data.concat(action.payload)
    },
    setBlogs(state, action) {
      state.data = action.payload
    }
  }
})

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const updateBlog = (id, blog) => {
  return
}

export const deleteBlog = (id) => {
  return
}

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer