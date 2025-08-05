// import socket from "../services/SocketService";
import AppBar from "../components/AppBar";
import { theme } from "../theme/colors";
import { useProduction } from '../hooks/useProduction';
import { useDeviceStatus } from '../hooks/useDeviceStatus';
import { useAlert } from '../hooks/useAlert';
import { formatFullDate } from "../utils/formatFullDate";
import {  useEffect } from 'react';
function AutorunConnector() {
  
  const { deviceStatus } = useDeviceStatus();
  const { socket, production} = useProduction();
  const {alert} = useAlert();
  const shift = '';
  const dateString = formatFullDate(new Date().toLocaleDateString());

 
  useEffect(() => {
    console.log('useprod');
    socket.emit('production', 'production');
   
  }, []);
  const getBlockColor = () => {
    switch (production.valid) {     
      case 2:
        return "bg-gray-300";
      case 1:
        return "bg-green-500";
      case 0:
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };
 
  return (
    <div className={`min-h-screen ${theme.text} ${theme.background}`}>
      <AppBar shift={shift} dateString={dateString} deviceStatus={deviceStatus} />
      
      <div className="mt-15 flex flex-col gap-6 p-6 text-black bg-blue-100">
        {/* Main Status Row */}
        <div className="flex flex-row gap-6 text-5xl font-semibold">
          
          {/* Left Section: Scanner and Loads */}
          <div className="basis-2/3 flex flex-col gap-4 bg-white p-6 rounded-xl ">
            <div className={`" ${getBlockColor()} flex justify-between border p-2 text-gray-600 text-4xl `}>
              <span className="">Scanner</span>
              <span  className="text-right">{production.scanner}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 text-2xl">Current Load</span>
              <span>{production.current_load} kg</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600 text-2xl">Pull Peak Load</span>
              <span>{production.pull_peak_load} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-2xl">Push Peak Load</span>
              <span>{production.push_peak_load} kg</span>
            </div>
          </div>

          {/* Right Section: OK/NotOK */}
          <div className="basis-1/3 flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md border">
            <div className="bg-green-100 border border-green-500 text-center rounded-xl p-4">
              OK: {production.part_ok}
            </div>
            <div className="bg-red-100 border border-red-500 text-center rounded-xl p-4">
              Not OK: {production.part_notok}
            </div>
          </div>
        </div>

        {/* Message / Alert Section */}
        <div className="text-center p-8 text-6xl bg-yellow-100 border border-yellow-400 rounded-xl shadow-lg">
          {alert.message}
        </div>
      </div>
    </div>
  );
}

export default AutorunConnector;
