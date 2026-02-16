import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../redux/slice/userSlice';
const Profile = () => {
  const { name, email, age } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getStdDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }
      try {
        const res = await axios.get('http://localhost:3000/api/std/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        dispatch(updateUser({ ...res.data.std, isLogin: true }));
      } catch (error) {
        toast.error(error.response.data.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
    getStdDetails();
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">

      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=2563eb&color=fff&size=128`}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />

        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="space-y-3 text-gray-700 text-lg">
          <p><span className="font-semibold">Name:</span> {name}</p>
          <p><span className="font-semibold">Age:</span> {age}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="mt-6 w-full bg-green-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>

      </div>
    </div>
  );

}

export default Profile