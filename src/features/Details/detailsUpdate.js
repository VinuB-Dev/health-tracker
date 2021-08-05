import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  setDetailsAsync,
  setDetails,
  selectDetails,
  updateDetailsAsync,
  getDetailsAsync,
} from './detailsSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function DetailsUpdate() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    age: 0,
    weight: 0,
    height: 0,
  })

  const details = useSelector(selectDetails)
  const userDetails = useSelector((state) => state.details.user_details)

  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(getDetailsAsync())
      setUserData({
        age: userDetails.age,
        weight: userDetails.weight,
        height: userDetails.height,
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const dispatch = useDispatch()
  const submit = async (e) => {
    e.preventDefault()
    const response = await dispatch(
      updateDetailsAsync({
        age: userData['age'],
        weight: userData['weight'],
        height: userData['height'],
      })
    )

    if (response.payload?.success) {
      dispatch(setDetails(userData))
      navigate('/result')
    }
  }

  function onChangeHandler(e) {
    setUserData({
      ...userData,
      [e.currentTarget.id]: JSON.parse(JSON.stringify(e.currentTarget.value)),
    })
  }
  return (
    <div>
      <div className='bg-login-page h-screen bg-cover bg-center md:bg-cover bg-no-repeat'>
        <div className='container max-w-sm mx-auto my-auto px-2 pt-4'>
          <form
            class='bg-white w-full max-w-sm  px-6 py-6 rounded shadow-md text-black w-full pt-5 mt-10'
            onSubmit={submit}
          >
            <h1 className='text-2xl mb-3'>Please enter the details</h1>
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                  Age
                </label>
              </div>
              <div class='md:w-2/3'>
                <input
                  class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring'
                  type='number'
                  placeholder='years'
                  onChange={onChangeHandler}
                  value={userData.age}
                  id='age'
                  min='0'
                />
              </div>
            </div>
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                  Weigth(kg)
                </label>
              </div>
              <div class='md:w-2/3'>
                <input
                  class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring'
                  type='number'
                  placeholder='kg'
                  onChange={onChangeHandler}
                  value={userData.weight}
                  id='weight'
                  min='0'
                />
              </div>
            </div>
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                  Height (cm)
                </label>
              </div>
              <div class=' mr-1'>
                <input
                  class='bg-gray-200 appearance-none border-grey-light rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring'
                  type='number'
                  placeholder='cm'
                  onChange={onChangeHandler}
                  value={userData.height}
                  id='height'
                  min='0'
                />
              </div>
            </div>
            <button
              class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              type='submit'
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
