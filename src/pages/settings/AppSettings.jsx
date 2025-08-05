import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import { theme } from "../../theme/colors";

import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { formatFullDate } from "../../utils/formatFullDate";

import {useSocket } from '../../hooks/useSocket';

function AppSettings() {
  const { emit } = useSocket('updateappsettings');
  const { data: appsetting, emit:getemit } = useSocket('getappsettings');

  const { deviceStatus } = useDeviceStatus();
  const [appdata, SetAppData] = useState({'pull_peak_load':0, 'push_peak_load':0, 'tolerance':0});
  const shift = '';
  const dateString = formatFullDate(new Date().toLocaleDateString());
 // Handle input change to update the specific device address value
 useEffect(() => {
  console.log('useapp');
  getemit(
    "getappsettings",
    JSON.stringify({
      request: "getappsettings",
    })
  );
 
}, []);

useEffect(() => {
  console.log(appsetting);
  const parsed = typeof appsetting === 'string' ? JSON.parse(appsetting) : appsetting;
    SetAppData((prev) => ({
      ...prev,...parsed
    }));
    // console.log(appdata);
}, [appsetting]);


 const handleInputChange = (e, id) => {
  let { value } = e.target;

  // Convert the value to an integer if it is numerical
  if (!isNaN(value) && value.trim() !== "") {
    value = parseInt(value, 10);
  }
  // console.log(id, value);
  if(id==='1'){
    SetAppData(prevappdata => ({ ...prevappdata, 'pull_peak_load': value }));
  }
  if(id==='2'){
    SetAppData(prevappdata => ({ ...prevappdata, 'push_peak_load': value }));
  }
  if(id==='3'){
    SetAppData(prevappdata => ({ ...prevappdata, 'tolerance': value }));
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  // Log the updated data
  console.log("App Data:", appdata);

  // Emit the updated data to the server
  emit(
    "updateappsettings",
    JSON.stringify({
      request: "updateappsettings",
      data: appdata,
    })
  );


  
};

  return (
 <div className={`min-h-screen ${theme.text} ${theme.background}`}>
    <AppBar shift={shift} dateString={dateString} deviceStatus={deviceStatus}/>
    <div className="flex flex-row items-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4" key='1'>
            <label
              htmlFor='pull_peak_load'
              className="block text-gray-700 font-bold mb-2 capitalize"
            >
              Pull Peak Load(Kg)
            </label>
            <input
              type="text"
              id='pull_peak_load'
              value={appdata.pull_peak_load}
              onChange={(e) => handleInputChange(e, '1')}
              placeholder='Pull Peak Load'
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4" key='2'>
            <label
              htmlFor='pull_peak_load'
              className="block text-gray-700 font-bold mb-2 capitalize"
            >
              Push Peak Load (Kg)
            </label>
            <input
              type="text"
              id='push_peak_load'
              value={appdata.push_peak_load}
              onChange={(e) => handleInputChange(e, '2')}
              placeholder='Push Peak Load'
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4" key='3'>
            <label
              htmlFor='tolerance'
              className="block text-gray-700 font-bold mb-2 capitalize"
            >
              Tolerance (Kg)
            </label>
            <input
              type="text"
              id='tolerance'
              value={appdata.tolerance}
              onChange={(e) => handleInputChange(e, '3')}
              placeholder='Tolerance'
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default AppSettings;
