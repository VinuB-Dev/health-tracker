import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { data } from 'autoprefixer'
import axios from 'axios'
import { getAuthToken } from '../../utils'

export const getFoodAsync = createAsyncThunk('food/getFood', async () => {
  const response = await axios.get(
    'https://healthTracker.bravesoldier.repl.co/food/',
    {
      headers: {
        Authorization: getAuthToken(),
      },
    }
  )
  return response.data
})

export const addListAsync = createAsyncThunk(
  'food/addList',
  async ({ breakfast, lunch, dinner, calories }) => {
    const newData = {
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      calories: calories,
    }
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/food/list',
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
  'food/updateList',
  async ({ listid, breakfast, lunch, dinner, calories }) => {
    console.log()
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/food/updateList',
      {
        listid,
        breakfast,
        lunch,
        dinner,
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
  'food/removeList',
  async (listid) => {
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/food/removeList',
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
  'food/addCalories',
  async ({ calories, date }) => {
    const newData = {
      calories: calories,
      date: date,
    }
    const response = await axios.post(
      'https://healthTracker.bravesoldier.repl.co/food/addCalories',
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

export const foodSlice = createSlice({
  name: 'food',
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
    [getFoodAsync.pending]: (state) => {
      state.status = 'loading'
    },
    [getFoodAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload.foodData[0].data
      state.calories = action.payload.foodData[0].calories
    },
    [getFoodAsync.rejected]: (state, action) => {
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

export const { addList, updateList } = foodSlice.actions

export const selectFood = (state) => state.food

export default foodSlice.reducer
