import Navbar from '../../components/Navbar'
import { AiTwotoneDelete, AiFillEdit } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFood,
  getFoodAsync,
  addList,
  addListAsync,
  updateListAsync,
  updateList,
  removeListAsync,
  addCalories,
} from './foodSlice'

export default function FoodTracker() {
  const [click, setClick] = useState({})
  const [deleteCard, setDelete] = useState([])
  const [change, setChange] = useState(0)
  const [save, setSave] = useState(0)
  const food = useSelector(selectFood)
  var data = useSelector((state) => state.food.data)
  var caloriesConsumed = useSelector((state) => state.food.calories)
  const foodData = data
  const foodStatus = useSelector((state) => state.food.status)
  const dispatch = useDispatch()
  var morning
  var newData = {
    _id: foodData.length + 1,
    breakfast: ['Apple', 'Upma', 'Vada', 'Chutney'],
    lunch: ['Apple', 'Upma', 'Vada', 'Chutney'],
    dinner: ['Apple', 'Upma', 'Vada', 'Chutney'],
    calories: 2400,
  }

  const [consumed, setConsumed] = useState({
    calories: 0,
    date: new Date().toISOString().slice(0, 10),
  })

  useEffect(() => {
    if (foodStatus === 'idle' || foodStatus === 'loading')
      dispatch(getFoodAsync())
  }, [foodStatus, change])

  useEffect(() => {
    setChange(0)
  }, [change])

  const streakCalculator = () => {
    let arrayForSort = [...caloriesConsumed]
    let count = 0
    arrayForSort.reverse().forEach((el, i) => {
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
        <div className='text-center'>
          Add your own list
          <div
            className='rounded-full bg-blue-400 h-8 w-8 items-center justify-center text-2xl cursor-pointer'
            onClick={() => {
              dispatch(addList(newData))
              dispatch(
                addListAsync({
                  breakfast: newData.breakfast,
                  lunch: newData.lunch,
                  dinner: newData.dinner,
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
      <div
        className='text-center'
        style={{ display: click._id ? 'block' : 'none' }}
      >
        You have had {click.calories} calories today
        <button
          className='bg-black hover:bg-green-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer text-white m-5'
          onClick={() => {
            if (
              caloriesConsumed[caloriesConsumed.length - 1]?.date ===
              new Date().toISOString().slice(0, 10)
            ) {
              return
            } else {
              dispatch(
                addCalories({
                  calories: click.calories,
                  date: new Date().toISOString().slice(0, 10),
                })
              )
            }
          }}
        >
          Save
        </button>
      </div>
      <div className='grid grid-cols-4 gap-4 text-center'>
        {foodData.map((ele) => {
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
                      'breakfast' + ele._id
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
              <div className='font-bold text-xl mb-2 text-center '>
                Monday diet
              </div>
              <div className='pl-4 text-left font-bold'>Breakfast</div>
              <div className='pl-4 text-left mb-4'>
                {ele.breakfast.map((food, i) => {
                  return (
                    <input
                      className={'bg-blue-400 breakfast' + ele._id}
                      style={{
                        backgroundColor:
                          click._id === ele._id ? 'green' : '#60A5FA',
                      }}
                      onChange={(e) => {
                        dispatch(
                          updateList({
                            _id: ele._id,
                            food: 'breakfast',
                            index: i,
                            changed: e.target.value,
                          })
                        )
                      }}
                      defaultValue={food}
                      disabled
                    />
                  )
                })}
              </div>
              <div className='pl-4 text-left font-bold'>Lunch</div>
              <div className='pl-4 text-left  mb-4'>
                {ele.lunch.map((food, i) => {
                  return (
                    <input
                      className={'bg-blue-400 breakfast' + ele._id}
                      style={{
                        backgroundColor:
                          click._id === ele._id ? 'green' : '#60A5FA',
                      }}
                      onChange={(e) => {
                        dispatch(
                          updateList({
                            _id: ele._id,
                            food: 'lunch',
                            index: i,
                            changed: e.target.value,
                          })
                        )
                      }}
                      defaultValue={food}
                      disabled
                    />
                  )
                })}
              </div>
              <div className='pl-4 text-left font-bold'>Dinner</div>
              <div className='pl-4 text-left  mb-4'>
                {ele.dinner.map((food, i) => {
                  return (
                    <input
                      className={'bg-blue-400 breakfast' + ele._id}
                      style={{
                        backgroundColor:
                          click._id === ele._id ? 'green' : '#60A5FA',
                      }}
                      onChange={(e) => {
                        dispatch(
                          updateList({
                            _id: ele._id,
                            food: 'dinner',
                            index: i,
                            changed: e.target.value,
                          })
                        )
                      }}
                      defaultValue={food}
                      disabled
                    />
                  )
                })}
              </div>
              <div className='font-bold'>
                Calories :{' '}
                <input
                  disabled
                  className={'bg-blue-400 inline w-16 breakfast' + ele._id}
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
                  style={{
                    backgroundColor:
                      click._id === ele._id ? 'green' : '#60A5FA',
                  }}
                  defaultValue={ele.calories}
                />
                {save === ele._id && (
                  <button
                    className='bg-black hover:bg-green-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer text-white'
                    onClick={() => {
                      morning = document.getElementsByClassName(
                        'breakfast' + ele._id
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
                          breakfast: ele.breakfast,
                          lunch: ele.lunch,
                          dinner: ele.dinner,
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
                className='bg-black hover:bg-green-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer text-white'
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
