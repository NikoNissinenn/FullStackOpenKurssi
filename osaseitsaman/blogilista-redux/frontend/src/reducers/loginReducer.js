import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationChange } from './notificationReducer'

const initialState = {
  name: null,
  token: null,
  username: null,
}

const loginSlice = createSlice({
  name: 'logindata',
  initialState,
  reducers: {
    setLoginData(state, action) {
      state = {
        name: action.payload.name,
        token: action.payload.token,
        username: action.payload.username,
      }
      return state
    },
    clearLoginData(user) {
      window.localStorage.removeItem('loggedBlogAppUser', JSON.stringify(user))
      return initialState
    },
    getLoginState(state) {
      return state
    },
    getToken(state) {
      return state.token
    },
  },
})

export const getLoginData = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      dispatch(
        setLoginData({
          name: user.name,
          token: user.token,
          username: user.username,
        })
      )
      dispatch(
        notificationChange({
          message: 'You have been logged in',
          notificationtype: 'success',
        })
      )
    } catch {
      dispatch(
        notificationChange({
          message: 'Wrong username or password',
          notificationtype: 'error',
        })
      )
    }
  }
}

export const { setLoginData, clearLoginData, getLoginState, getToken } =
  loginSlice.actions
export default loginSlice.reducer
