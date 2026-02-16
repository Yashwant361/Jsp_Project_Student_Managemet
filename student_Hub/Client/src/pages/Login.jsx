import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate()

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/std/login',
        {
          email: userDetails.email,
          password: userDetails.password
        })
      localStorage.setItem('token', res.data.token)
      toast.success(res.data.message);
      navigate('/profile')
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("FULL ERROR:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
     
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type='text'
              value={userDetails.email}
              placeholder='Email'
              name='email'
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              value={userDetails.password}
              placeholder='Password'
              name='password'
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-gray-700">
          Don't have an account? <Link to='/signup' className="text-blue-500 hover:underline">Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Login