import { useState, useEffect } from 'react';
import { useSocketContext } from '../contexts/SocketContext';

export const useProduction= ()=>{
  const { socket, isConnected } = useSocketContext();
  const [production, setProduction] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected) {
      setError('Socket not connected');
      return;
    }
   
    // Listen for getdeviceStatus event
    
    socket.on('production', (statusData) => {
        console.log('production',statusData);
        statusData = JSON.parse(statusData);
        setProduction((prev) => ({
          ...prev,
          ...statusData
        }));
      setError(null);
    });

    // Handle socket errors
    socket.on('error', (err) => {
      setError(err.message || 'Socket error occurred');
    });

    // Cleanup listeners on unmount or socket change
    return () => {
      socket.off('production');
      socket.off('error');
    };
  }, [socket, isConnected]);

 
  return { socket, production, isConnected, error };
};


