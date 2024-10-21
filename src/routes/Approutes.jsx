import React from 'react'
import SignIn from '../components/auth/Login'
import SignUp from '../components/auth/Register'
import MainLayout from '../components/common/MainLayout'
import { Route ,Routes } from 'react-router-dom'

const Approutes = () => {
  return (
  <Routes>
    <Route path='/' element={<MainLayout/>}/>   
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
  </Routes>
  )
}

export default Approutes
