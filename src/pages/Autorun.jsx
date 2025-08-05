import React from 'react';
import AppBar from '../components/AppBar';
import { theme } from '../theme/colors';
import { useDeviceStatus } from '../hooks/useDeviceStatus';

export default function Autorun() {
  const { deviceStatus, isConnected, error } = useDeviceStatus();
  console.log('Autorun appBarDeviceStatus:', deviceStatus);

  const shift = 'Morning';
  const dateString = new Date().toLocaleDateString();

  return (
    <div className={`min-h-screen ${theme.text} ${theme.background}`}>
      <AppBar shift={shift} dateString={dateString} deviceStatus={deviceStatus} />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">Autorun Page</h1>
        <p>Welcome to the Autorun page.</p>
      </div>
    </div>
  );
}