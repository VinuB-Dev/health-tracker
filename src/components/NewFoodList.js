import Navbar from './Navbar'
import { AiTwotoneDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'

export default function FoodTracker() {
  const [addCard, setCard] = useState([1])

  return (
    <div>
      <Navbar />
      <div className='container max-w-sm mx-auto my-auto px-2 pt-4'>
        <form class='bg-white w-full max-w-sm  px-6 py-6 rounded shadow-md text-black w-full pt-5 mt-10'>
          <h1 className='text-2xl mb-3'>Please enter the details</h1>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label
                class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                for='inline-full-name'
              >
                Age
              </label>
            </div>
            <div class='md:w-2/3'>
              <input
                class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring'
                id='inline-full-name'
                type='text'
                placeholder='years'
              />
            </div>
          </div>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label
                class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                for='inline-full-name'
              >
                Weigth
              </label>
            </div>
            <div class='md:w-2/3'>
              <input
                class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring'
                id='inline-full-name'
                type='text'
                placeholder='kg'
              />
            </div>
          </div>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label
                class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                for='inline-full-name'
              >
                Height
              </label>
            </div>
            <div class='md:w-1/3 mr-1'>
              <input
                class='bg-gray-200 appearance-none border-grey-light rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring'
                id='inline-full-name'
                type='text'
                placeholder='ft'
              />
            </div>
            <div class='md:w-1/3'>
              <input
                class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight  focus:outline-none focus:ring'
                id='inline-full-name'
                type='text'
                placeholder='in'
              />
            </div>
          </div>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label
                class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                for='inline-full-name'
              >
                Gender
              </label>
            </div>
            <div class='md:w-2/3'>
              <select
                class='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-state'
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
