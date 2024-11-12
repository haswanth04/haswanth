import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Define the API URL specifically for faculties
  const API_URL = process.env.REACT_APP_API_URL.replace('/students', '/faculties');

  useEffect(() => {
    fetchFaculties();
  }, []);

  // Fetch the list of faculties from the backend
  const fetchFaculties = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  // Save a new faculty or update an existing one
  const saveFaculty = async () => {
    try {
      const facultyData = {
        name,
        department,
        experience: parseInt(experience),
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setExperience('');
      fetchFaculties();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  // Function to delete a faculty
  const deleteFaculty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty member?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculties(); // Refresh the faculty list after deletion
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("Failed to delete faculty. Please try again.");
    }
  };

  // Edit a faculty entry
  const editFaculty = (faculty) => {
    setEditingId(faculty._id);
    setName(faculty.name);
    setDepartment(faculty.department);
    setExperience(faculty.experience);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-teal-400 mb-4">Manage Faculties</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="number"
          placeholder="Experience (Years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full md:w-1/4 p-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={saveFaculty}
          className="w-full md:w-auto px-4 py-2 rounded-lg bg-teal-500 text-gray-900 font-semibold hover:bg-teal-600 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-4">
        {faculties.length > 0 ? (
          faculties.map((faculty) => (
            <li key={faculty._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md">
              <div>
                <p className="text-lg font-bold text-teal-400">{faculty.name}</p>
                <p className="text-gray-300">
                  Department: {faculty.department}, Experience: {faculty.experience} years
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editFaculty(faculty)}
                  className="px-3 py-1 text-sm rounded-lg bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFaculty(faculty._id)}
                  className="px-3 py-1 text-sm rounded-lg bg-red-500 text-gray-100 font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No faculties found.</p>
        )}
      </ul>
    </div>
  );
}

export default FacultyList;
