import React, { useEffect, useState } from 'react'
import apiFetch from '../../services/apiFetch';
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_WS_URL

const DevStatus = () => {
    const [devices, setDevices] = useState([]);
    const [deviceStatus, setDeviceStatus] = useState({});

    useEffect(() => {
        apiFetch('/device/devices', { 
            method: 'GET', 
            headers: { 'accept': 'application/json' } 
        })
        .then(res => res.json())
        .then(data => {
            setDevices(data.data || [])
            console.log("Fetched devices:", data.data);
        })
        .catch(err => console.error("Error fetching devices:", err));
    }, []);

    useEffect(() => {
        const socket = io(SOCKET_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
        });

        socket.on("connect", () => {
            console.log("✅ Connected to socket:", SOCKET_URL);
        });

        socket.on("comstatus", (data) => {
            console.log("📡 comstatus received:", data);
            let parsedData = JSON.parse(data);
            // Update device status with the received data
            setDeviceStatus(prevStatus => ({
                ...prevStatus,
                ...parsedData
            }));
        });

        socket.on("error", (error) => {
            console.error("❌ Socket error:", error);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const getDeviceStatusColor = (deviceName) => {
        const status = deviceStatus[deviceName.toLowerCase()];
        if (status === 1) return 'bg-green-500';
        if (status === 0) return 'bg-red-500';
        return 'bg-gray-700'; 
    };
    return (
        <div className='flex gap-2'>
            {
                devices.map((dev, index) => (
                    <div 
                        key={dev.device_id || index} 
                        className={`px-3 py-1 rounded-2xl text-sm text-white ${getDeviceStatusColor(dev.device_name)}`}
                    >
                        {dev.device_name}
                    </div>
                ))
            }
        </div>
    )
}

export default DevStatus