import { useState, useEffect } from 'react';
import { useSocketContext } from '../contexts/SocketContext';

export const useAlert= ()=>{
  const { socket, isConnected } = useSocketContext();
  const [alert, setAlert] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected) {
      setError('Socket not connected');
      return;
    }
   
    // Listen for getdeviceStatus event
    
    socket.on('alert', (statusData) => {
        console.log('alert',statusData);
        statusData = JSON.parse(statusData);
        setAlert(statusData);
        setError(null);
    });

    // Handle socket errors
    socket.on('error', (err) => {
      setError(err.message || 'Socket error occurred');
    });

    // Cleanup listeners on unmount or socket change
    return () => {
      socket.off('alert');
      socket.off('error');
    };
  }, [socket, isConnected]);

 
  return { alert, isConnected, error };
};


