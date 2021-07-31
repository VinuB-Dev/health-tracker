import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Auth/authSlice'
import detailsReducer from '../features/Details/detailsSlice'
import exerciseReducer from '../features/Exercise/exerciseSlice'
import foodReducer from '../features/Food/foodSlice'
import happyReducer from '../features/Happy/happySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    details: detailsReducer,
    exercise: exerciseReducer,
    food: foodReducer,
    happy: happyReducer,
  },
})
