import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    age: "",
    password: ""
  })
  

  const navigate = useNavigate()

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setUserDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:3000/api/std/signup',
        userDetails
      )

      toast.success(res.data.message)
      navigate('/login')

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Backend not running"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name"
            value={userDetails.name}
            onChange={handleFormChange}
            className="w-full border p-2 rounded" />

          <input type="email" name="email" placeholder="Email"
            value={userDetails.email}
            onChange={handleFormChange}
            className="w-full border p-2 rounded" />

          <input type="number" name="age" placeholder="Age"
            value={userDetails.age}
            onChange={handleFormChange}
            className="w-full border p-2 rounded" />

          <input type="password" name="password" placeholder="Password"
            value={userDetails.password}
            onChange={handleFormChange}
            className="w-full border p-2 rounded" />

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Signup
          </button>
        </form>

        <div className="text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
