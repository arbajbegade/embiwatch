import { useState, useEffect } from 'react';
import { useSocketContext } from '../contexts/SocketContext';

export const useDeviceStatus= ()=>{
  const { socket, isConnected } = useSocketContext();
  const [deviceStatus, setDeviceStatus] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected) {
      setError('Socket not connected');
      return;
    }
   
    // Listen for getdeviceStatus event
    
    socket.on('comstatus', (statusData) => {
        console.log('comstatus',statusData);
        statusData = JSON.parse(statusData);
      setDeviceStatus(statusData);
      setError(null);
    });

    // Handle socket errors
    socket.on('error', (err) => {
      setError(err.message || 'Socket error occurred');
    });

    // Cleanup listeners on unmount or socket change
    return () => {
      socket.off('comstatus');
      socket.off('error');
    };
  }, [socket, isConnected]);

 
  return { deviceStatus, isConnected, error };
};


