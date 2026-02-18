import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';


const Navbar = () => {
    const navigate=useNavigate();
    const {setUserDetails,setIsLogin} =useUser()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        toast.success('logout successfully');
        setUserDetails({name:"",email:"",age:"",role:""});
        setIsLogin(false);
        navigate('/login');
    }
 return (
  <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center transition duration-300">

    <h1 className="text-xl font-bold text-gray-800 dark:text-white">
      Student Profile
    </h1>
    <div className="flex items-center space-x-6">
      
      <Link
        to="/profile"
        className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
      >
        Profile
      </Link>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 shadow-md"
      >
        Logout
      </button>

    </div>
  </nav>
);

}

export default Navbar