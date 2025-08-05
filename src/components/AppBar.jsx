import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const AppBar = ({shift, dateString, deviceStatus}) => { 
// console.log(Object.entries(deviceStatus));
  return (
    
    <div className="bg-gray-900 text-white shadow-md px-6 py-4 flex items-center justify-between rounded-b-xl">
      {/* Left: Home */}
      <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
        <Home size={28} />
      </Link>
      {/* Device Status Blocks */}
      <div className="flex gap-4 items-center text-sm text-white">
        {Object.entries(deviceStatus)?.map(([key, value]) => (
          <div key={key} className="flex gap-1 items-center">
            <div>
              {key
                .toLowerCase()
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </div>
            <div
              className={`w-4 h-4 rounded-sm ${value ? 'bg-green-500' : 'bg-red-500'}`}
              title={`${key}: ${value ? 'Online' : 'Offline'}`}
            />
          </div>
        ))}
</div>

      
      <div className="flex items-center gap-4">
        <div className="text-md font-medium text-gray-200 whitespace-nowrap">
          {shift} {dateString}
        </div>        
      </div>
      </div>
  );
  };

export default AppBar;
