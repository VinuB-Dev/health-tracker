import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getAuthToken } from '../../utils'

export const getExcerciseAsync = createAsyncThunk(
  'exercise/getExercise',
  async () => {
    const response = await axios.get(
      'https://healthTracker.bravesoldier.repl.co/exercise/',
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    )
    return response.data
  }
)

export const addListAsync = createAsyncThunk(
  'exercise/addList',
  async ({ exercises, calories }) => {
    const newData = {
      exercises: exercises,
      calories: calories,
    }
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/exercise/list',
      {
        newData,
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

export const updateListAsync = createAsyncThunk(
  'exercise/updateList',
  async ({ listid, exercises, calories }) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/exercise/updateList',
      {
        listid,
        exercises,
        calories,
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

export const removeListAsync = createAsyncThunk(
  'exercise/removeList',
  async (listid) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/exercise/removeList',
      {
        listid,
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

export const addCalories = createAsyncThunk(
  'exercise/addCalories',
  async ({ calories, date }) => {
    const newData = {
      calories: calories,
      date: date,
    }
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/exercise/addCalories',
      {
        newData,
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

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    status: 'idle',
    data: [],
    calories: [],
  },
  reducers: {
    addList: (state, action) => {
      state.data.push(action.payload)
    },
    updateList: (state, action) => {
      const listIndex = state.data.findIndex(
        (list) => list._id === action.payload._id
      )
      if (action.payload.food === 'calories') {
        state.data[listIndex][action.payload.food] = action.payload.changed
      } else {
        state.data[listIndex][action.payload.food][action.payload.index] =
          action.payload.changed
      }
    },
  },
  extraReducers: {
    [getExcerciseAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [getExcerciseAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload.exerciseData[0].data
      state.calories = action.payload.exerciseData[0].calories
    },
    [getExcerciseAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addListAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [addListAsync.fulfilled]: (state) => {
      state.status = 'success'
    },
    [addListAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateListAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [updateListAsync.fulfilled]: (state) => {
      state.status = 'success'
    },
    [updateListAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [removeListAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [removeListAsync.fulfilled]: (state) => {
      state.status = 'success'
    },
    [removeListAsync.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addCalories.pending]: (state) => {
      state.status = 'loading'
    },
    [addCalories.fulfilled]: (state) => {
      state.status = 'success'
    },
    [addCalories.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { addList, updateList } = exerciseSlice.actions

export const selectExercise = (state) => state.exercise

export default exerciseSlice.reducer
