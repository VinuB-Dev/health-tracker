import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectHappy, getHappyAsync, setHappyAsync } from './happySlice'

export default function Happy() {
  const happy = useSelector(selectHappy)
  var happyData = useSelector((state) => state.happy.data)
  const happyStatus = useSelector((state) => state.happy.status)
  const dispatch = useDispatch()
  const [note, setNote] = useState({
    note: '',
    happy: 0,
    date: new Date().toISOString().slice(0, 10),
  })
  const [change, setChange] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (happyStatus === 'idle' || happyStatus === 'loading')
      dispatch(getHappyAsync())
  }, [happyStatus, change])

  const submit = (e) => {
    e.preventDefault()
    if (
      happyData[happyData.length - 1]?.date ===
      new Date().toISOString().slice(0, 10)
    ) {
      setError('can only add once a day.')
      setChange(1)
      return
    }
    dispatch(setHappyAsync(note))

    setChange(1)
    setNote({
      _id: happyData.length + 1,
      note: '',
      happy: 0,
      date: '',
    })
  }

  useEffect(() => {
    setChange(0)
  }, [change])

  const streakCalculator = () => {
    let count = 0
    happyData?.reverse().forEach((el, i) => {
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
    <div className='mb-10'>
      <Navbar />
      <div className='flex justify-evenly m-4 p-4 '>
        <div className='bg-blue-400 p-4'>
          Streak : {streakCalculator()} days
        </div>
      </div>
      <form
        onSubmit={submit}
        className='container mx-auto border-2 w-96 rounded-lg p-4'
      >
        {<div className='text-red-400'>{error}</div>}
        <div>Add note</div>
        <div className=' p-4 border-2 m-4 rounded'>
          Rate your happiness today :
          <input
            className='w-1/12 ml-1 border-b-2 text-center outline-none'
            type='text'
            value={note.happy}
            onChange={(e) => setNote({ ...note, happy: e.target.value })}
          />
          / 10
        </div>
        <div className='mt-8 mb-2 text-left ml-4'>How was your day?</div>
        <textarea
          type='text'
          value={note.note}
          onChange={(e) => setNote({ ...note, note: e.target.value })}
          className='resize-none w-80 h-40 border-2 border-black outline-none rounded p-2'
        ></textarea>
        <button
          class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-8'
          type='submit'
        >
          Save
        </button>
      </form>
      <div className='m-10 font-bold'>
        <div>Previous day notes</div>
      </div>
      <div class='grid grid-cols-3 gap-4 text-center auto-cols-auto justify-center'>
        {happyData.map((happy) => {
          return (
            <div
              class='container border-2 border-black p-2'
              style={{
                backgroundColor: happy.happy > 5 ? '#6EE7B7' : '#FCA5A5',
              }}
            >
              <div className='text-right'>{happy.date}</div>
              {happy.note}
            </div>
          )
        })}
      </div>
    </div>
  )
}
