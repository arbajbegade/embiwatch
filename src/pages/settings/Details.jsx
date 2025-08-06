import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaCogs } from 'react-icons/fa'; // Updated icons

const SettingsDetails = () => {
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
                <OptionButton label="App" path="/app" Icon={FaMobileAlt} />
                <OptionButton label="System" path="/system" Icon={FaCogs} />
            </div>
        </div>
    );
};

export default SettingsDetails;
