import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectDetails } from './detailsSlice'
import { calculateBMI, calculateCalories, calculateWeight } from '../../utils'
export default function Result() {
  const navigate = useNavigate()
  const details = useSelector(selectDetails)
  const user_details = useSelector((state) => state.details.user_details)

  return (
    <div>
      <div className='bg-login-page h-screen bg-cover bg-center md:bg-cover bg-no-repeat'>
        <div className='container max-w-lg  mx-auto my-auto px-2 pt-4'>
          <div className='bg-white w-full max-w-lg  px-6 py-6 rounded shadow-md text-black w-full pt-5 mt-10 text-center '>
            <h1 className='mb-3 text-2xl'>
              Your BMI is&nbsp;:&nbsp;
              <span>
                {Math.round(
                  calculateBMI(user_details.height, user_details.weight)
                )}
              </span>
            </h1>
            <div
              class='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
              role='alert'
            >
              <p class='font-bold'>About BMI</p>
              <p class='text-sm '>
                The World Health Organization's (WHO) recommended healthy BMI
                range is 18.5 - 25 for both male and female. Based on the BMI
                range, it is possible to find out a healthy weight for any given
                height.
              </p>
            </div>
            <h1 className='mb-3 text-2xl'>
              Ideal height based on your height and gender must be&nbsp;:&nbsp;
              <span>{Math.round(calculateWeight(user_details.height))}</span>
            </h1>
            <div
              class='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
              role='alert'
            >
              <p class='font-bold'>Informational message</p>
              <p class='text-sm'>
                Some additional text to explain said message.
              </p>
            </div>
            <h1 className='mb-3 text-2xl'>
              Daily calorie consumption to reach ideal weight&nbsp;:&nbsp;
              <span>
                {Math.round(
                  calculateCalories(
                    Math.round(calculateWeight(user_details.height))
                  )
                )}
              </span>
            </h1>
            <div
              class='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
              role='alert'
            >
              <p class='font-bold'>Informational message</p>
              <p class='text-sm'>
                Some additional text to explain said message.
              </p>
            </div>
            <button
              class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8'
              onClick={() => {
                navigate('/')
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
