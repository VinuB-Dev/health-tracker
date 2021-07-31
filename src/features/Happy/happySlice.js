import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthToken } from '../../utils'

export const getHappyAsync = createAsyncThunk('happy/getHappy', async () => {
  const response = await axios.get(
    'https://healthTracker.bravesoldier.repl.co/happy/',
    {
      headers: {
        Authorization: getAuthToken(),
      },
    }
  )
  return response.data
})

export const setHappyAsync = createAsyncThunk(
  'happy/setHappy',
  async (note) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/happy/post',
      {
        note,
      },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data
  }
)

export const happySlice = createSlice({
  name: 'happy',
  initialState: {
    status: 'idle',
    data: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.data.push(action.payload)
    },
  },
  extraReducers: {
    [getHappyAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [getHappyAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload.happyData[0].data
    },
    [getHappyAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [setHappyAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [setHappyAsync.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [setHappyAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { addNote } = happySlice.actions

export const selectHappy = (state) => state.happy

export default happySlice.reducer
