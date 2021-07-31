import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthToken } from '../../utils'

export const setDetailsAsync = createAsyncThunk(
  'details/enterDetails',
  async ({ age, weight, height, gender }) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/details/',
      {
        age: age,
        weight: weight,
        height: height,
        gender: gender,
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

export const updateDetailsAsync = createAsyncThunk(
  'details/updateDetails',
  async ({ age, weight, height }) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/details/update',
      {
        age: age,
        weight: weight,
        height: height,
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

export const getDetailsAsync = createAsyncThunk(
  'details/getDetails',
  async () => {
    const response = await axios.get(
      'https://healthTracker.bravesoldier.repl.co/details/',
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data
  }
)

export const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    status: 'idle',
    user_details: {
      age: 0,
      weight: 0,
      height: 0,
      gender: 'Male',
    },
  },
  reducers: {
    setDetails: (state, action) => {
      state.user_details.age = action.payload.age
      state.user_details.weight = action.payload.weight
      state.user_details.height = action.payload.height
      state.user_details.gender = action.payload.gender
    },
  },
  extraReducers: {
    [setDetailsAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [setDetailsAsync.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [setDetailsAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [getDetailsAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [getDetailsAsync.fulfilled]: (state, action) => {
      const { age, weight, height, gender } = action.payload.data[0]
      state.user_details = { age, weight, height, gender }
      state.status = 'success'
    },
    [getDetailsAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateDetailsAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [updateDetailsAsync.fulfilled]: (state, action) => {
      state.status = 'success'
    },
    [updateDetailsAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { setDetails } = detailsSlice.actions

export const selectDetails = (state) => state.details

export default detailsSlice.reducer
