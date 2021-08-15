import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { selectExercise, getExcerciseAsync } from '../Exercise/exerciseSlice'
import { selectFood, getFoodAsync } from '../Food/foodSlice'
import { selectHappy, getHappyAsync } from '../Happy/happySlice'

export default function Dashboard() {
  const exercise = useSelector(selectExercise)
  const food = useSelector(selectFood)
  const happy = useSelector(selectFood)
  var exercise_data = useSelector((state) => state.exercise.calories)
  const foodStatus = useSelector((state) => state.food.status)
  var food_data = useSelector((state) => state.food.calories)
  const exerciseStatus = useSelector((state) => state.exercise.status)
  const happydata = useSelector((state) => state.happy.data)
  const happyStatus = useSelector((state) => state.happy.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (exerciseStatus === 'idle' || exerciseStatus === 'loading')
      dispatch(getExcerciseAsync())
    if (foodStatus === 'idle' || foodStatus === 'loading')
      dispatch(getFoodAsync())
    if (happyStatus === 'idle' || happyStatus === 'loading')
      dispatch(getHappyAsync())
  }, [exerciseStatus, foodStatus, happyStatus])
  console.log(happydata)
  const dateHandler = (num) => {
    setPrevious(previous + num)
  }

  const [previous, setPrevious] = useState(0)
  let date = new Date(new Date().setUTCHours(0, 0, 0, 0) - previous * 86400000)
    .toISOString()
    .slice(0, 10)

  const calories = (arr) => {
    const data = arr.filter((calorie) => calorie.date === date)
    if (data[0] === undefined) return 0
    else return data[0].calories
  }

  const happyness = (arr) => {
    const data = arr.filter((happy) => happy.date === date)
    if (data[0] === undefined) return 0
    else return data[0].happy
  }

  return (
    <div>
      <Navbar />
      <div className='container mx-auto w-96 rounded-t border-b-2 p-4 mt-32 bg-black text-white boxshadow1'>
        Dashboard
        <div className='m-4'>{date}</div>
        {previous > 0 && (
          <button
            className='bg-white p-2 mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer transform hover:scale-110'
            onClick={() => {
              dateHandler(-1)
            }}
          >
            Next day
          </button>
        )}
        <button
          className='bg-white p-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer transform hover:scale-110'
          onClick={() => {
            dateHandler(1)
          }}
        >
          Previous day
        </button>
      </div>
      <div className='container mx-auto w-96 rounded-b p-4 bg-black text-white'>
        <div>Calories burnt : {calories(exercise_data)}</div>
        <div>Calories consumed : {calories(food_data)}</div>
        <div>Happyness : {happyness(happydata)}</div>
      </div>
    </div>
  )
}
