import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaFileAlt, FaCog } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const OptionButton = ({ label, path, Icon }) => (
    <button
      onClick={() => navigate(path)}
      className="w-36 h-36 rounded-full bg-gray-100 text-gray-800 font-bold text-lg shadow-2xl hover:shadow-xl hover:bg-gray-200 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-2"
    >
      <Icon className="text-3xl" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-row gap-16">
        <OptionButton label="Autorun" path="/autorun" Icon={FaPlay} />
        <OptionButton label="Report" path="/report" Icon={FaFileAlt} />
        <OptionButton label="Settings" path="/settings" Icon={FaCog} />
      </div>
    </div>
  );
};

export default Home;
