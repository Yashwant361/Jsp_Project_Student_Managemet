import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';

const Profile = () => {
  // const {name,email,age}=useSelector((state)=>state.user);
  // const dispatch=useDispatch();
  const {userDetails,setUserDetails,setIsLogin} =useUser()
  const navigate=useNavigate();
  useEffect(()=>{
    const getStdDetails=async()=>{
      const token=localStorage.getItem('token');
      if(! token) {
        return navigate('/login');
      }
      try {
        const res=await axios.get('http://localhost:3000/api/std/get',{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserDetails(res.data.std);
        setIsLogin(true);
      } catch (error) {
          toast.error(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/login');
      }
    }
    getStdDetails();
  },[]);
 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">

    <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300">

      <div className="flex justify-center mb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${userDetails.name || "User"}&background=2563eb&color=fff&size=128`}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
        />
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome, {userDetails.name}
      </h1>
      <div className="space-y-3 text-gray-700 text-lg">
        <p>
          <span className="font-semibold">Name:</span> {userDetails.name}
        </p>
        <p>
          <span className="font-semibold">Age:</span> {userDetails.age}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {userDetails.email}
        </p>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setIsLogin(false);
          navigate("/login");
        }}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200 shadow-md"
      >
        Logout
      </button>

    </div>
  </div>
);
}

export default Profile