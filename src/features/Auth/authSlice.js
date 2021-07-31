import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginAsync = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/auth/login',
      {
        email: email,
        password: password,
      }
    )
    return response.data
  }
)

export const signupAsync = createAsyncThunk(
  'auth/signUpUser',
  async ({ name, tag, email, password }) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/auth/signup',
      {
        name: name,
        tag: tag,
        email: email,
        password: password,
      }
    )

    return response.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    loggedIn: localStorage.getItem('tracker') ? true : false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      removeToken()
      state.loggedIn = false
    },
  },
  extraReducers: {
    [signupAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [signupAsync.fulfilled]: (state, action) => {
      const token = action.payload.token
      if (token) {
        addTokenToStorage(token)
        state.loggedIn = true
        state.status = 'success'
      }
    },
    [signupAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [loginAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [loginAsync.fulfilled]: (state, action) => {
      const token = action.payload.token
      if (token) {
        addTokenToStorage(token)
        state.loggedIn = true
        state.status = 'success'
      }
    },
    [loginAsync.rejected]: (state, action) => {
      console.log(action)
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { logoutUser } = authSlice.actions

export const selectAuth = (state) => state.auth

const addTokenToStorage = (token) => {
  localStorage.setItem('tracker', JSON.stringify({ token: token }))
}

const removeToken = () => {
  localStorage.removeItem('tracker')
}

export default authSlice.reducer
