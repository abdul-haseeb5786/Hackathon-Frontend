import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Token remove karein
      localStorage.removeItem("role"); // Role remove karein
      navigate("/login"); // Login page pe redirect karein
    };
    return (
        <div>
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Logout
    </button>
 

        </div>
    );
}

export default Logout;
