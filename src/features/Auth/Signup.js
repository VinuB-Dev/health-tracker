import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupAsync } from './authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/Loader'
import { selectAuth } from './authSlice'

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
  const [errorMessage, setErrorMessage] = useState('')
  const auth = useSelector(selectAuth)
  const authStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    setError(!confirmpasswordValid)
  }, [confirmpasswordValid])

  const submit = async (e) => {
    e.preventDefault()
    if (userData['confirm password'] === userData['password']) {
      const response = await dispatch(
        signupAsync({
          name: userData['name'],
          email: userData['email'],
          password: userData['password'],
        })
      )
      if (response.payload?.success) {
        navigate('/details')
      } else {
        setError(true)
        setErrorMessage('User already exists')
      }
    } else {
      setErrorMessage('password dont match')
      setError(true)
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
      {authStatus === 'loading' && <Loader />}
      {(authStatus === 'idle' ||
        authStatus === 'failed' ||
        authStatus === 'success') && (
        <div className='bg-login-page h-screen bg-cover bg-center md:bg-cover bg-no-repeat'>
          <div className='container max-w-sm mx-auto my-auto px-2 pt-4'>
            <form
              className='bg-white px-6 py-6 rounded shadow-md text-black w-full pt-5 mt-10'
              onSubmit={submit}
            >
              {error ? (
                <div>
                  <h3 style={{ color: 'red' }}>{errorMessage}</h3>
                </div>
              ) : (
                <div></div>
              )}
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
              <h1 className='mb-5 text-xl text-left ml-2'>Name</h1>
              <input
                id='name'
                type='text'
                className='block border border-grey-light w-full p-2 rounded mb-4 focus:outline-none focus:ring'
                value={userData.name}
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
      )}
    </div>
  )
}
