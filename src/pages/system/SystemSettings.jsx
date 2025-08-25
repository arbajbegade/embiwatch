import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar/Navbar'
import apiFetch from '../../services/apiFetch';
import SystemTable from './SystemTable';

const SystemSettings = () => {
  const [devices, setDevices] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedInterface, setSelectedInterface] = useState('');
  const [interfaceFields, setInterfaceFields] = useState([]);
  const [deviceSettings, setDeviceSettings] = useState([]);

  // Fetch devices + interfaces initially
  useEffect(() => {
    apiFetch('/devices', { method: 'GET', headers: { 'accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setDevices(data.data || []))
      .catch(err => console.error("Error fetching devices:", err));

    apiFetch('/interfaces', { method: 'GET', headers: { 'accept': 'application/json' } })
      .then(res => res.json())
      .then(data => setInterfaces(data.data || []))
      .catch(err => console.error("Error fetching interfaces:", err));
  }, []);

  // When interface is selected, fetch its fields
  useEffect(() => {
    if (!selectedInterface) return;
    apiFetch(`/interfacefields?interface_id=${selectedInterface}`, {
      method: 'GET',
      headers: { 'accept': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setInterfaceFields(data.data || []))
      .catch(err => console.error("Error fetching interface fields:", err));
  }, [selectedInterface]);

  // When device is selected, fetch its settings
  useEffect(() => {
    if (!selectedDevice) return;
    apiFetch(`/device/settings?device_id=${selectedDevice}`, {
      method: 'GET',
      headers: { 'accept': 'application/json' }
    })
      .then(res => res.json())
      .then(data => setDeviceSettings(data.data || []))
      .catch(err => console.error("Error fetching device settings:", err));
  }, [selectedDevice]);

  return (
    <div>
      <Navbar />
      <div className='py-6 w-full px-8 bg-primary'>
        <h1 className='text-2xl font-bold text-center mb-6'>System Settings</h1>

        {/* Device Selector */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Devices</label>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Device</option>
            {devices.map((device) => (
              <option key={device.device_id} value={device.device_id}>{device.device_name}</option>
            ))}
          </select>
        </div>

        {/* Interface Selector */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Interfaces</label>
          <select
            value={selectedInterface}
            onChange={(e) => setSelectedInterface(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Interface</option>
            {interfaces.map((intf) => (
              <option key={intf.interface_id} value={intf.interface_id}>{intf.interface_name}</option>
            ))}
          </select>
        </div>

        {/* Interface Fields */}
        {interfaceFields.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Interface Fields</h2>
            {interfaceFields.map((field, idx) => (
              <div key={idx} className="mb-3">
                <label className="block mb-1">{field.label || field.name}</label>
                <input
                  type="text"
                  placeholder={field.placeholder || ''}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            ))}
          </div>
        )}

        <SystemTable deviceSettings={deviceSettings} />
      </div>
    </div>
  )
}

export default SystemSettings;
