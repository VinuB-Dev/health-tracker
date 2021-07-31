import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginAsync } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectDetails, getDetailsAsync } from '../Details/detailsSlice'

export default function Login() {
  const navigate = useNavigate()
  const details = useSelector(selectDetails)
  const userDetails = useSelector((state) => state.details.user_details)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const submit = async (e) => {
    e.preventDefault()
    const response = await dispatch(
      loginAsync({
        email: userData['email'],
        password: userData['password'],
      })
    )
    if (response.payload?.success) {
      await dispatch(getDetailsAsync())
      console.log(userDetails)
      if (userDetails.age > 0) navigate('/')
      else navigate('/details')
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
        <div className='container max-w-sm mx-auto my-auto px-2 pt-20'>
          <form
            className='bg-white px-6 py-6 rounded shadow-md text-black w-full pt-5 mt-10'
            onSubmit={submit}
          >
            <h1 className='mb-5 text-3xl text-center pb-1'>Login</h1>
            <h1 className='mb-5 text-xl text-left ml-2'>Username</h1>
            <input
              id='email'
              type='Email'
              className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
              value={userData.email}
              required
              placeholder='Enter Email'
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <h1 className='mb-5 text-xl text-left ml-2'>Password</h1>
            <input
              id='password'
              type='password'
              className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
              required
              placeholder='Enter Password'
              onChange={onChangeHandler}
              value={userData.password}
            />
            <button
              class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              type='submit'
            >
              Login
            </button>
            <h1>
              Not registered yet?{' '}
              <span
                class='text-teal-700 cursor-pointer'
                onClick={() => {
                  navigate('/signup')
                }}
              >
                Signup
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  )
}
