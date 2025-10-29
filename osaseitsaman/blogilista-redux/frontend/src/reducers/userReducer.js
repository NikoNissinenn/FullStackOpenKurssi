import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = {
  data: []
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload
    },
  },
})

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch(setUser(users))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer