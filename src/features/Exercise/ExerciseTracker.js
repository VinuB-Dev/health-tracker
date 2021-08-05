import Navbar from '../../components/Navbar'
import { AiTwotoneDelete, AiFillEdit } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectExercise,
  getExcerciseAsync,
  addList,
  addListAsync,
  updateListAsync,
  updateList,
  removeListAsync,
  addCalories,
} from './exerciseSlice'

export default function ExcerciseTracker() {
  const [click, setClick] = useState({})
  const [deleteCard, setDelete] = useState([])
  const [change, setChange] = useState(0)
  const [save, setSave] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const exercise = useSelector(selectExercise)
  var data = useSelector((state) => state.exercise.data)
  const exerciseData = data
  const exerciseStatus = useSelector((state) => state.exercise.status)
  var caloriesConsumed = useSelector((state) => state.exercise.calories)
  const dispatch = useDispatch()
  var morning
  var newData = {
    _id: exerciseData.length + 1,
    exercises: ['squats', 'pushups', 'yoga', 'pullups'],
    calories: 500,
  }

  useEffect(() => {
    if (exerciseStatus === 'idle' || exerciseStatus === 'loading')
      dispatch(getExcerciseAsync())
  }, [exerciseStatus, change])

  useEffect(() => {
    setChange(0)
  }, [change])

  const streakCalculator = () => {
    let count = 0
    caloriesConsumed?.reverse().forEach((el, i) => {
      if (
        new Date().setUTCHours(0, 0, 0, 0) -
          new Date(el.date).setUTCHours(0, 0, 0, 0) ===
        i * 86400000
      ) {
        count++
      }
    })
    return count
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-evenly m-4 p-4 '>
        <div className='bg-blue-400 p-4'>
          Streak : {streakCalculator()} days
        </div>
        <div class='text-center'>
          Add your own list
          <div
            class='rounded-full bg-blue-400 h-8 w-8 items-center justify-center text-2xl cursor-pointer'
            onClick={() => {
              dispatch(addList(newData))
              dispatch(
                addListAsync({
                  exercises: newData.exercises,
                  calories: newData.calories,
                })
              )

              setChange(1)
            }}
          >
            +
          </div>
        </div>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'red' }}>{success}</div>}
      <div
        className='text-center'
        style={{ display: click._id ? 'block' : 'none' }}
      >
        You have burned {click.calories} calories
        <button
          className='bg-black hover:bg-green-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer text-white m-5'
          onClick={() => {
            if (
              caloriesConsumed[caloriesConsumed.length - 1]?.date ===
              new Date().toISOString().slice(0, 10)
            ) {
              setError('can only add once a day.')
              setChange(1)
              return
            } else {
              dispatch(
                addCalories({
                  calories: click.calories,
                  date: new Date().toISOString().slice(0, 10),
                })
              )
              setSuccess('added')
              setChange(1)
            }
          }}
        >
          Save
        </button>
      </div>
      <div class='grid gap-4 text-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {exerciseData.map((ele) => {
          return (
            <div
              key={ele._id}
              className='m-4 p-10  pt-0 bg-blue-400 w-80 rounded text-center shadow-lg max-w-max'
              style={{
                backgroundColor: ele._id === click._id ? 'green' : '',
                display: deleteCard.includes(ele._id) ? 'none' : '',
              }}
            >
              <div className='text-2xl cursor-pointer flex justify-evenly mb-4'>
                <span
                  onClick={() => {
                    morning = document.getElementsByClassName(
                      'exercise' + ele._id
                    )
                    for (
                      var i = 0, len = morning.length | 0;
                      i < len;
                      i = (i + 1) | 0
                    ) {
                      morning[i].disabled = false
                    }
                    setSave(ele._id)
                  }}
                >
                  <AiFillEdit />
                </span>
                <span
                  onClick={() => {
                    setDelete([...deleteCard, ele._id])
                    dispatch(removeListAsync(ele._id))
                  }}
                >
                  <AiTwotoneDelete />
                </span>
              </div>
              <div className='pl-4 text-left font-bold'>Exercises</div>
              <div className='pl-4 text-left mb-4'>
                {ele.exercises.map((exercise, i) => {
                  return (
                    <input
                      className={'bg-blue-400 exercise' + ele._id}
                      style={{
                        backgroundColor:
                          click._id === ele._id ? 'green' : '#60A5FA',
                      }}
                      onChange={(e) => {
                        dispatch(
                          updateList({
                            _id: ele._id,
                            food: 'exercises',
                            index: i,
                            changed: e.target.value,
                          })
                        )
                      }}
                      defaultValue={exercise}
                      disabled
                    />
                  )
                })}
              </div>
              <div className='font-bold'>
                Calories :{' '}
                <input
                  disabled
                  className={'bg-blue-400 inline w-16 exercise' + ele._id}
                  style={{
                    backgroundColor:
                      click._id === ele._id ? 'green' : '#60A5FA',
                  }}
                  defaultValue={ele.calories}
                  onChange={(e) => {
                    dispatch(
                      updateList({
                        _id: ele._id,
                        food: 'calories',
                        changed: e.target.value,
                      })
                    )
                    setChange(1)
                  }}
                />
                {save === ele._id && (
                  <button
                    class='bg-black hover:bg-green-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer text-white'
                    onClick={() => {
                      morning = document.getElementsByClassName(
                        'exercise' + ele._id
                      )
                      for (
                        var i = 0, len = morning.length | 0;
                        i < len;
                        i = (i + 1) | 0
                      ) {
                        morning[i].disabled = true
                      }
                      setChange(1)
                      setSave(0)
                      dispatch(
                        updateListAsync({
                          listid: ele._id,
                          exercises: ele.exercises,
                          calories: ele.calories,
                        })
                      )
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              <button
                class='bg-black hover:bg-green-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer text-white'
                onClick={() => {
                  setClick(ele)
                }}
              >
                Select
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
