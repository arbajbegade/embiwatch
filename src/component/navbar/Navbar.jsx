import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Get today's date in dd/mm/yyyy format
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(
    today.getMonth() + 1
  ).padStart(2, '0')}/${today.getFullYear()}`;

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      {/* Left: Home Icon */}
      <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-gray-300">
        <FaHome className="text-xl" />
        <span className="hidden sm:inline">Home</span>
      </button>

      {/* Right: Date */}
      <div className="text-sm font-medium">{formattedDate}</div>
    </div>
  );
};

export default Navbar;
