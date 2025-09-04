import React, { useState } from "react";
import DeviceForm from './DeviceForm'
import apiFetch from "../../services/apiFetch";
import toast from "react-hot-toast";

const DeviceLogic = ({ interfaceFields, selectedDevice, fetchDeviceSettings, setInterfaceFields, deviceSettings,selectedInterface }) => {
    const [formValues, setFormValues] = useState({});
    const handleChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleComPort = async (item_id) => {
        try {
            const res = await apiFetch(`/device/comports`, {
                method: "GET",
                headers: { "accept": "application/json", "Content-Type": "application/json" },
            });
            const data = await res.json();
            console.log('data', data.data);

            // Find the comPort field and update it
            const updatedInterfaceFields = interfaceFields.map(field => {
                if (field.interface_field === "comPort") {
                    return {
                        ...field,
                        interface_value: JSON.stringify(data.data)
                    };
                }
                return field;
            });
            setInterfaceFields(updatedInterfaceFields);
            setFormValues((prev) => ({
                ...prev,
                comPort: ""
            }));
            toast.success("COM ports refreshed successfully");
        } catch (err) {
            console.error("Error saving settings:", err);
            toast.error(err.message || "An unexpected error occurred");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDevice) {
            toast.error("Please select a device before saving settings");
            return;
        }
        try {
            const res = await apiFetch(`/device/settings`, {
                method: "POST",
                headers: { "accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formValues,
                    device_id: Number(selectedDevice),
                    interface_id: Number(selectedInterface),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save settings");
            }
            const data = await res.json();
            fetchDeviceSettings(selectedDevice);
            toast.success(data.message || "Settings saved successfully");
            setFormValues({});
        } catch (err) {
            console.error("Error saving settings:", err);
            toast.error(err.message || "An unexpected error occurred");
        }
    };
    return (
        <div>
            <DeviceForm
                formValues={formValues}
                interfaceFields={interfaceFields}
                handleChange={handleChange}
                handleComPort={handleComPort}
                handleSubmit={handleSubmit}
                deviceSettings={deviceSettings}
                setFormValues={setFormValues}
            />
        </div>
    )
}

export default DeviceLogic