import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SingleCategory from './pages/SingleCategory'
import MealDetails from './pages/MealDetails'
import Login from './pages/Login'
import Register from './pages/Register'


const App = () => {
  
  return (
   <div className='max-w-7xl mx-auto px-5 relative'>
     <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/categories/:category' element={<SingleCategory/>}/>
      <Route path='/meal/:id' element={<MealDetails/>}/>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
