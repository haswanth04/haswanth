import React from 'react';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-900">
      <div className="w-full max-w-5xl p-4">
        <h1 className="text-4xl mb-8 text-teal-400 font-bold text-center">Management System</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <StudentList />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <FacultyList />
        </div>
      </div>
    </div>
  );
}

export default App;
