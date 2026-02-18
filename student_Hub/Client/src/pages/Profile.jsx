import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Profile = () => {

  const [edit, setEdit] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { userDetails, setUserDetails, setIsLogin } = useUser();
  const navigate = useNavigate();

  const getStdDetails = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }

    try {
      const res = await axios.get(
        'http://localhost:3000/api/std/get',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUserDetails(res.data.std);
      setIsLogin(true);

    } catch (error) {
      toast.error(error.response?.data?.message || "Session expired");
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    getStdDetails();
  }, []);

  const handleUpdateName = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.patch(
        'http://localhost:3000/api/std/updatename',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data.message);
      setEdit("");
      setName("");
      getStdDetails();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating name");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.patch(
        'http://localhost:3000/api/std/updatepassword',
        { password, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data.message);

      localStorage.removeItem('token');
      setIsLogin(false);
      navigate('/login');

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password");
    } finally {
      setPassword("");
      setNewPassword("");
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    console.log("Sending:", { email, password });
    try {
      const token = localStorage.getItem('token');

      const res = await axios.patch(
        'http://localhost:3000/api/std/updateemail',
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data.message);

      setEdit("");
      setEmail("");
      setPassword("");
      getStdDetails();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
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

        {/* Update Password Button */}
        <div className="mt-6">
          <button
            onClick={() => setEdit("password")}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition"
          >
            Update Password
          </button>
        </div>

        {/* Update Email Button */}
        <div className="mt-4">
          <button
            onClick={() => setEdit("email")}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition"
          >
            Update Email
          </button>
        </div>

        {edit === "name" && (
          <form onSubmit={handleUpdateName} className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Update Name
            </button>
          </form>
        )}

        {edit === "password" && (
          <form onSubmit={handleUpdatePassword} className="mt-4 space-y-3">
            <input
              type="password"
              placeholder="Old Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => setEdit(edit === "password" ? "" : "password")}
              className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition"
            >
              {edit === "password" ? "Cancel" : "Update Password"}
            </button>

          </form>
        )}

        {edit === "email" && (
          <form onSubmit={handleUpdateEmail} className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => setEdit(edit === "email" ? "" : "email")}
              className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition"
            >
              {edit === "email" ? "Cancel" : "Update Email"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default Profile;
