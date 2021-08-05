import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAsync } from './authSlice'
import { useDispatch } from 'react-redux'

export default function Login() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(0)

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
      navigate('/')
    } else {
      setError(1)
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
            {error ? (
              <div>
                <h3 style={{ color: 'red' }}>Username or password wrong</h3>
                <h3 style={{ color: '#065F46' }}>Signup if u haven't yet</h3>
              </div>
            ) : (
              <div></div>
            )}
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
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              type='submit'
            >
              Login
            </button>
            <h1
              className='mt-4 rounded p-2'
              style={{ backgroundColor: '#A7F3D0' }}
            >
              Not registered yet?{' '}
              <span
                className='cursor-pointer'
                style={{ color: '#065F46' }}
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
