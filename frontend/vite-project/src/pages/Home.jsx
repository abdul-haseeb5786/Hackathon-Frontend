import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <Link 
      to="/admin" 
      className="px-6 py-3 bg-blue-200 text-blue-700 font-semibold rounded-lg transition duration-300 hover:bg-blue-300"
    >
      Admin
    </Link>
    <Link 
      to="/receptionist" 
      className="px-6 py-3 bg-green-200 text-green-700 font-semibold rounded-lg transition duration-300 hover:bg-green-300"
    >
      Receptionist
    </Link>
  </div>
</div>

      
    );
}

export default Home;
