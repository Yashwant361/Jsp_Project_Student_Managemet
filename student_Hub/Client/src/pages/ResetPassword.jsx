import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {

  const { token } = useParams();
  // const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error('New password is required');
      return
    }

    try {
      const res = await axios.patch(
        'http://localhost:3000/api/std/resetpassword',
        {
          token,
          newPassword
        }
      );

      toast.success(res.data.message);
      navigate('/login');

    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password")
    }
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-center ">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>

            <input
              type='text'
              placeholder='Enter Reset Token'
              value={token}
              onChange={(e) => setToken(e.target.value)}
              // required
              className='w-full px-4 py-2 border rounded-lg'
            />
            <input
              type='password'
              placeholder='Enter New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg'
            />
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition'
            >
              Reset Password
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default ResetPassword