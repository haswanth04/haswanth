import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-teal-400 mb-4">Manage Students</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={saveStudent}
          className="w-full md:w-auto px-4 py-2 rounded-lg bg-teal-500 text-gray-900 font-semibold hover:bg-teal-600 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
            <div>
              <p className="text-lg font-bold text-teal-400">{student.name}</p>
              <p className="text-gray-300">Age: {student.age}, Grade: {student.grade}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editStudent(student)}
                className="px-3 py-1 text-sm rounded-lg bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStudent(student._id)}
                className="px-3 py-1 text-sm rounded-lg bg-red-500 text-gray-100 font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
