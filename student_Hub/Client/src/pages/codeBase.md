import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';

const Profile = () => {
  const [edit, setEdit] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { userDetails, setUserDetails, setIsLogin } = useUser()
  const navigate = useNavigate();
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
      setUserDetails(res.data.std);
      setIsLogin(true);
    } catch (error) {
      toast.error(error.response.data.message);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }
  useEffect(() => {
    getStdDetails();
  }, []);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch('http://localhost:3000/api/std/updatename', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success(res.data.message);
      setEdit("");
      getStdDetails();
      setName("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch('http://localhost:3000/api/std/updatepassword', { password, newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success(res.data.message);
      localStorage.removeItem('token');
      navigate('/login');
      setIsLogin(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setPassword("");
      setNewPassword("");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${userDetails.name || "User"}&background=2563eb&color=fff&size=128`}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {userDetails.name}
          </h1>
        </div>

        {/* Profile Info */}
        <div className="space-y-3 text-gray-700">

          <div className="flex justify-between items-center">
            <p><span className="font-semibold">Name:</span> {userDetails.name}</p>
            <button
              onClick={() => setEdit("name")}
              className="text-blue-500 hover:underline text-sm"
            >
              Edit
            </button>
          </div>

          <p><span className="font-semibold">Age:</span> {userDetails.age}</p>
          <p><span className="font-semibold">Email:</span> {userDetails.email}</p>

        </div>

        {/* Edit Name */}
        {edit === "name" && (
          <form onSubmit={handleUpdateName} className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Update Name
            </button>
          </form>
        )}

        {/* Update Password Button */}
        <div className="mt-6">
          <button
            onClick={() => setEdit("password")}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition"
          >
            Update Password
          </button>
        </div>

        {/* Edit Password */}
        {edit === "password" && (
          <form onSubmit={handleUpdatePassword} className="mt-4 space-y-3">
            <input
              type="password"
              placeholder="Old Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
            >
              Update Password
            </button>
          </form>
        )}

      </div>
    </div>
  );

}

export default Profile