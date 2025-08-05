import { useEffect, useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';

export const useSocket = (eventName) => {
  const { socket } = useSocketContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on(eventName, (newData) => {
      setData(newData);
    });

    return () => {
      socket.off(eventName);
    };
  }, [socket, eventName]);

  const emit = (event, payload) =>{
    console.log(event, payload);
    if (socket) {
      socket.emit(event, payload);
    }
  };

  return { data, emit };
};