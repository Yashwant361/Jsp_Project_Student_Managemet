import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import { useUser } from './context/userContext'
import Subjects from './pages/Subjects'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  const { isLogin } = useUser()
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      {isLogin && <Navbar />}
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={
          token ? <Navigate to='/profile' />
            : <Navigate to='/login' />
        } />
        <Route path="/forget-password" element={<ForgetPassword />} />
        
        <Route path='/reset-password/:token' element={<ResetPassword/>} ></Route>
        
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/profile' element={<Profile />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/subject' element={<Subjects />} ></Route>


      </Routes>

    </BrowserRouter>
  )
}

export default App