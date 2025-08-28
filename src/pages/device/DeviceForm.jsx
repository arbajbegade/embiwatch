import React, { useState } from "react";
import apiFetch from "../../services/apiFetch";
import toast from "react-hot-toast";

const DeviceForm = ({ interfaceFields, selectedDevice, fetchDeviceSettings }) => {
    const [formValues, setFormValues] = useState({});

    const handleChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

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
            {interfaceFields.length > 0 && (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-4">Interface Fields</h2>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        {interfaceFields.map((item, index) => (
                            <div className="mb-4" key={index}>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {item.interface_field}
                                </label>
                                {item.interface_type === "dropdown" ? (
                                    <select
                                        className="border rounded w-full py-2 px-3"
                                        value={formValues[item.interface_field] || ""}
                                        onChange={(e) =>
                                            handleChange(item.interface_field, e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select {item.interface_field}
                                        </option>
                                        {JSON.parse(item.interface_value).map((val, idx) => (
                                            <option key={idx} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                ) : item.interface_type === "textbox" ? (
                                    <textarea
                                        className="border rounded w-full py-2 px-3"
                                        value={formValues[item.interface_field] || item.interface_value}
                                        onChange={(e) =>
                                            handleChange(item.interface_field, e.target.value)
                                        }
                                        rows={4} // you can adjust height
                                        required
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="border rounded w-full py-2 px-3"
                                        value={formValues[item.interface_field] || item.interface_value}
                                        onChange={(e) =>
                                            handleChange(item.interface_field, e.target.value)
                                        }
                                        required
                                    />
                                )}

                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn">Save Settings</button>
                </form>
            )}
        </div>
    );
};

export default DeviceForm;
