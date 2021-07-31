import food_img from '../images/pexels-ba-tik-3754300.jpg'
import exercise_img from '../images/pexels-victor-freitas-841130.jpg'
import happy_img from '../images/pexels-julia-avamotive-1236678.jpg'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div className='bg-home-page bg-cover bg-center bg-no-repeat flex xl:h-screen md:h-screen lg:h-screen  sm:h-auto'>
        <div class='flex flex-wrap overflow-hidden m-auto'>
          <div class='my-2 px-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'>
            <div class='bg-white max-w-xs m-auto rounded overflow-hidden shadow-lg m-4'>
              <img
                class='w-full h-60'
                src={food_img}
                alt='Sunset in the mountains'
              />
              <div class='px-6 py-4'>
                <div class='font-bold text-xl mb-2'>Count what you Eat</div>
                <p class='text-gray-700 text-base'>Track your Food habits</p>
                <button
                  class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8'
                  onClick={() => navigate('/food')}
                >
                  Track Now
                </button>
              </div>
            </div>
          </div>

          <div class='my-2 px-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'>
            <div class='bg-white max-w-xs m-auto rounded overflow-hidden shadow-lg m-4'>
              <img
                class='w-full h-60'
                src={exercise_img}
                alt='Sunset in the mountains'
              />
              <div class='px-6 py-4'>
                <div class='font-bold text-xl mb-2'>Count calories Burned</div>
                <p class='text-gray-700 text-base'>
                  Track your calories burned
                </p>
                <button
                  class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8'
                  onClick={() => navigate('/exercise')}
                >
                  Track Now
                </button>
              </div>
            </div>
          </div>

          <div class='my-2 px-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'>
            <div class='bg-white max-w-xs m-auto rounded overflow-hidden shadow-lg m-4'>
              <img
                class='w-full h-60'
                src={happy_img}
                alt='Sunset in the mountains'
              />
              <div class='px-6 py-4'>
                <div class='font-bold text-xl mb-2'>Were you happy today?</div>
                <p class='text-gray-700 text-base'>
                  Track what makes you happy.
                </p>
                <button
                  class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8'
                  onClick={() => navigate('/happy')}
                >
                  Track Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
