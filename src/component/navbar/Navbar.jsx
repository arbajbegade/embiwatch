import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoArrowUndo } from "react-icons/io5";
import apiFetch from "../../services/apiFetch";

const Navbar = ({ back }) => {
  const navigate = useNavigate();
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayName = dayNames[today.getDay()];
  const todaysDate = today.getDate();
  const monthName = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const formattedDate = `${dayName} ${todaysDate} ${monthName} ${year}`;

  const [device, setDevices] = useState([]);

  useEffect(() => {
    apiFetch('/device/devices', { method: 'GET', headers: { 'accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setDevices(data.data || []))
      .catch(err => console.error("Error fetching devices:", err));
  }, []);


  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200">
          <FaHome className="text-xl" />
          <span className="hidden sm:inline">Home</span>
        </button>
        {back && (
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200">
            <IoArrowUndo className="text-xl" />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}
      </div>

      <div className='flex'>{
        device.map((dev, index) => (
          <div key={index} className="ml-4 px-3 py-1 bg-gray-700 rounded-2xl text-sm">
            {dev.device_name}
          </div>
        ))
      }</div>

      <div className="text-sm font-medium">{formattedDate}</div>
    </div>
  );
};

export default Navbar;