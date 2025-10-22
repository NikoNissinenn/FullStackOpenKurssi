import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  notificationtype: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = {
        message: action.payload.message,
        notificationtype: action.payload.notificationtype,
      }
      return state
    },
    clearNotification() {
      return initialState
    },
  },
})

export const notificationChange = (message, notificationtype) => {
  return async (dispatch) => {
    dispatch(setNotification(message, notificationtype))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
