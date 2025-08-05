import ChartGraph from "../components/ChartGraph"
import socket from '../services/SocketService';
import { useEffect, useState } from "react";

import AppBar from '../components/AppBar';
import { theme } from '../theme/colors';
import { useDeviceStatus } from '../hooks/useDeviceStatus';

function AutorunPlotter() {
  const [scannerdata, setScannerData] = useState({'scanner':'', 'valid':2});
  const [message, setMessage] = useState("");
   const { deviceStatus, isConnected, error } = useDeviceStatus();
    console.log('Autorun appBarDeviceStatus:', deviceStatus);
  
    const shift = 'Morning';
    const dateString = new Date().toLocaleDateString();

useEffect(() => {
    socket.emit("production", JSON.stringify({ request: "production" }));
    socket.on("production", (data) => {
      const jsonData = JSON.parse(data);
      console.log(jsonData);

      if (jsonData.scanner) {
        // It's scanner data
        setScannerData(jsonData);
      }
    });
    socket.on("alert", (data) => {
      const jsonData = JSON.parse(data);
      console.log(jsonData);

      if (jsonData.message) {
        // It's scanner data
        setMessage(jsonData.message);
      }
    });

  // return () => {
  //   socket.disconnect();
  // };
}, []);
  
return (
  <div className={`min-h-screen ${theme.text} ${theme.background}`}>
      <AppBar shift={shift} dateString={dateString} deviceStatus={deviceStatus} />
    <div>
      
      <div className="justify-items-center mt-5 ml-10 mr-8 w-100">
      <div className="mb-4 flex w-full gap-6">
        {/* Scanned Data Display */}
        <textarea
          placeholder="Part No"
          value={scannerdata.scanner}
          disabled
          className={`border p-4 text-1xl font-semibold focus:outline-none focus:border-blue-500 w-full h-16 resize-none shadow-2xl flex-1 ${
            scannerdata.valid === 1
              ? "bg-green-600"
              : scannerdata.valid === 0
              ? "bg-red-600"
              : "bg-white"
          }`}
        />

        {/* Status Message */}
        <textarea
          placeholder="Message"
          value={message}
          disabled
          className={`border p-4 text-1xl font-semibold focus:outline-none focus:border-blue-500 w-full h-16 resize-none shadow-2xl flex-1`}
        />
      </div>
    </div>
    <div className="flex flex-row flex-1 w-full">
    <ChartGraph heightval="250px" widthval="100%" />
</div>

    </div>
    </div>
  );
}

export default AutorunPlotter;
