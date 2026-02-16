import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        name: "",
        age: "",
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
        e.preventDefault();
        const { email, name, age, password } = userDetails;
        try {
            const res = await axios.post('http://localhost:3000/api/std/signup', { email, age, name, password });
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
            {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">SIGNUP PAGE</h1> */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
             <h1 className="mx-12 text-3xl font-bold mb-6 text-gray-800">SIGNUP PAGE</h1>
                <input
                    type='text'
                    value={userDetails.name}
                    placeholder='Name'
                    name='name'
                    onChange={handleFormChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={userDetails.email}
                    placeholder='Email'
                    name='email'
                    onChange={handleFormChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={userDetails.age}
                    placeholder='Age'
                    name='age'
                    onChange={handleFormChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    value={userDetails.password}
                    placeholder='Password'
                    name='password'
                    onChange={handleFormChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-md transition duration-200"
                >
                    Signup
                </button>
                <div className=" mx-10 mt-4 text-Black-600">
                    Already have an account?
                    <Link to='/login' className="text-black-100 hover:underline ml-1">
                        Login
                    </Link>
                </div>
            </form>

            <br />

        </div>
    )
}
export default Signup;