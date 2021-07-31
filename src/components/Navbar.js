import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <div className=' bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-500 p-2'>
      <div className='flex justify-between mx-auto'>
        <div
          className='ml-2 text-xl font-extrabold cursor-pointer'
          onClick={() => {
            navigate('/')
          }}
        >
          Health Tracker
        </div>
        <div className='flex gap-x-4 mr-4'>
          <button
            class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer transform hover:scale-110'
            onClick={() => {
              navigate('/detailsupdate')
            }}
          >
            Profile
          </button>
          <button
            class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded cursor-pointer'
            onClick={() => {
              localStorage.removeItem('tracker')
              navigate('/login')
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
