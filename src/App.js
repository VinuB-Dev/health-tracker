import './App.css'
import Happy from './features/Happy/Happy'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import FoodTracker from './features/Food/FoodTracker'
import ExcerciseTracker from './features/Exercise/ExerciseTracker'
import Login from './features/Auth/Login'
import Signup from './features/Auth/Signup'
import Details from './features/Details/details'
import Result from './features/Details/result_page'
import DetailsUpdate from './features/Details/detailsUpdate'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <div className='App'>
      <Routes className='middle-box'>
        <PrivateRoute path='/' element={<Home />} />
        <PrivateRoute path='/food' element={<FoodTracker />} />
        <PrivateRoute path='/exercise' element={<ExcerciseTracker />} />
        <PrivateRoute path='/happy' element={<Happy />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <PrivateRoute path='/details' element={<Details />} />
        <PrivateRoute path='/detailsupdate' element={<DetailsUpdate />} />
        <PrivateRoute path='/result' element={<Result />} />
      </Routes>
    </div>
  )
}

export default App
