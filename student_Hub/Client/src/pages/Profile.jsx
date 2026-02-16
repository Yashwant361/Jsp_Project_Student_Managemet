import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../redux/slice/userSlice'

const Profile = () => {
  const { name, email, age } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getStdDetails = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        return navigate('/login')
      }

      try {
        const res = await axios.get(
          'http://localhost:3000/api/std/get',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        dispatch(updateUser({ ...res.data.std, isLogin: true }))

      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Backend not running"
        )
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    getStdDetails()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

        <div className="space-y-2 text-lg">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
