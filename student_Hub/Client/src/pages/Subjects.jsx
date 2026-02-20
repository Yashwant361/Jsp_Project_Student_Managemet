import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Subjects = () => {

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [subject, setSubject] = useState("");
  const [allSubject, setAllSubject] = useState([]);
  const { setIsLogin } = useUser();
  const navigate = useNavigate();
  async function getAllSub() {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/std/subject/allsubject', {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setIsLogin(true);
      setAllSubject(res.data.allSubjects);
    } catch (error) {
      toast.error(error.response.data.message);
      localStorage.removeItem('token');
      navigate('/');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/std/subject/add', { subject }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      setSubject("");
      getAllSub();
    } catch (error) {
      toast.error(error.response.data.message);
      setSubject("");
    }
  }
  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:3000/api/std/subject/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message);
      getAllSub();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    getAllSub();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `http://localhost:3000/api/std/subject/update/${id}`,
        { subject: editValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      setEditId(null);
      setEditValue("");
      // fetchSubjects();
      getAllSub()

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')]">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Subjects
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 mb-6"
          >
            <input
              type="text"
              value={subject}
              placeholder="Enter subject name"
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Add
            </button>
          </form>


          <ul className="space-y-3">
            {allSubject.map((s) => (
              <li
                key={s._id}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
              >
                {editId === s._id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="px-2 py-1 border rounded"
                    />

                    <div className="flex gap-2">
                      <button
                        type='button'
                        onClick={() => handleUpdate(s._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>

                      <button
                        type='button'
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="font-medium">{s.subject}</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditId(s._id);
                          setEditValue(s.subject);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleRemove(s._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  )
}

export default Subjects

