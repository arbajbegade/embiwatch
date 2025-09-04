import React, { useEffect, useState } from 'react'
import Navbar from '../../component/navbar/Navbar'
import apiFetch from '../../services/apiFetch';
import DeviceTable from './DeviceTable';
import DeviceForm from './DeviceForm';
import DeviceLogic from './DeviceLogic';

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [interfaces, setInterfaces] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedInterface, setSelectedInterface] = useState('');
    const [interfaceFields, setInterfaceFields] = useState([]);
    const [deviceSettings, setDeviceSettings] = useState([]);

    // Fetch devices + interfaces initially
    useEffect(() => {
        apiFetch('/device/devices', { method: 'GET', headers: { 'accept': 'application/json' } })
            .then(res => res.json())
            .then(data => setDevices(data.data || []))
            .catch(err => console.error("Error fetching devices:", err));

        apiFetch('/device/interfaces', { method: 'GET', headers: { 'accept': 'application/json' } })
            .then(res => res.json())
            .then(data => setInterfaces(data.data || []))
            .catch(err => console.error("Error fetching interfaces:", err));
    }, []);

    // When interface is selected, fetch its fields
    useEffect(() => {
        if (!selectedInterface) return;
        apiFetch(`/device/interfacefields?interface_id=${selectedInterface}`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        })
            .then(res => res.json())
            .then(data => setInterfaceFields(data.data || []))
            .catch(err => console.error("Error fetching interface fields:", err));
    }, [selectedInterface]);

    // When device is selected, fetch its settings
    const fetchDeviceSettings = (Device_Id) => {
        if (!Device_Id) return;
        apiFetch(`/device/settings?device_id=${Device_Id}`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        })
            .then(res => res.json())
            .then(data => setDeviceSettings(data.data || []))
            .catch(err => console.error("Error fetching device settings:", err));
    }

    useEffect(() => {
        fetchDeviceSettings(selectedDevice)
    }, [selectedDevice]);

    return (
        <div>
            <Navbar />
            <div className='py-6 w-full px-8 bg-gray-100'>
                <h1 className='text-2xl font-bold text-center mb-6'>Device Settings</h1>
                <div className="grid grid-cols-2 gap-4 mb-2">
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
                </div>

                <DeviceLogic
                    interfaceFields={interfaceFields}
                    selectedDevice={selectedDevice}
                    setInterfaceFields={setInterfaceFields}
                    fetchDeviceSettings={fetchDeviceSettings}
                    deviceSettings={deviceSettings}
                    selectedInterface={selectedInterface}
                />
                <DeviceTable deviceSettings={deviceSettings} />
            </div>
        </div>
    )
}


export default DeviceList