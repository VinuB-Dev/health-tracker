import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signupAsync } from './authSlice'
import { useDispatch } from 'react-redux'

export default function Signup() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    name: '',
    tag: '',
    email: '',
    password: '',
    'confirm password': '',
  })

  const [confirmpasswordValid, updateConfirmPasswordValid] = useState(true)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setError(!confirmpasswordValid)
  }, [confirmpasswordValid])

  const submit = async (e) => {
    e.preventDefault()
    updateConfirmPasswordValid(
      userData['confirm password'] === userData['password']
    )
    if (!error) {
      const response = await dispatch(
        signupAsync({
          name: userData['name'],
          email: userData['email'],
          password: userData['password'],
        })
      )
      if (response.payload?.success) {
        console.log(response.payload)
        navigate('/details')
      } else {
        console.log(response.error)
      }
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
            className='bg-white px-6 py-6 rounded shadow-md text-black w-full pt-5 mt-10'
            onSubmit={submit}
          >
            <h1 className='mb-5 text-2xl text-center pb-1'>Signup</h1>
            <h1 className='mb-5 text-xl text-left ml-2'>Email</h1>
            <input
              id='email'
              type='email'
              className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
              value={userData.email}
              required
              placeholder='Enter Email'
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <h1 className='mb-5 text-xl text-left ml-2'>name</h1>
            <input
              id='name'
              type='text'
              className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
              value={userData.name}
              type='text'
              required
              placeholder='Enter your name'
              autoComplete='off'
              onChange={onChangeHandler}
            />
            <h1 className='mb-5 text-xl text-left ml-2'>Password</h1>
            <input
              id='password'
              type='password'
              className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
              value={userData.password}
              type='password'
              required
              placeholder='Enter Password'
              onChange={onChangeHandler}
            />
            <h1 className='mb-5 text-xl text-left ml-2'>Confirm Password</h1>
            <input
              id='confirm password'
              type='password'
              className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
              value={userData['confirm password']}
              type='password'
              required
              placeholder='Confirm Password'
              onChange={onChangeHandler}
            />
            <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
