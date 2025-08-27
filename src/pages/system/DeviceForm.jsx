import React, { useState } from "react";

const DeviceForm = ({ interfaceFields }) => {
    const [formValues, setFormValues] = useState({});

    const handleChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formValues);
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
                                ) : (
                                    <input
                                        type="text"
                                        className="border rounded w-full py-2 px-3"
                                        value={formValues[item.interface_field] || item.interface_value}
                                        onChange={(e) =>
                                            handleChange(item.interface_field, e.target.value)
                                        }
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
