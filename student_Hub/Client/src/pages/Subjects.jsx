import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Subjects = () => {

    const [subject,setSubject]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const token=localStorage.getItem('token');
            const res=await axios.post('http://localhost:3000/api/std/subject/add',{subject},{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        });
          toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
   <>
     <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Subject
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={subject}
            placeholder="Enter Subject Name"
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 
                       text-white py-2 rounded-lg transition duration-200"
          >
            Add Subject
          </button>

        </form>

      </div>
    </div>
   </>
  )
}

export default Subjects