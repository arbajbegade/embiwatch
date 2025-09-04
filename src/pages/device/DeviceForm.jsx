import { useEffect } from "react";


const DeviceForm = ({ formValues, interfaceFields, handleChange, handleComPort, handleSubmit, deviceSettings,setFormValues }) => {
    const mergedFields = interfaceFields.map(field => {
        const matchedSetting = deviceSettings.find(
            setting =>
                setting.interface_id === field.interface_id &&
                setting.setting_name === field.interface_field
        );

        return {
            ...field,
            i_value: matchedSetting ? matchedSetting.setting_value : "" // add new key i_value
        };
    });

    useEffect(() => {
        const initialValues = {};
        mergedFields.forEach(item => {
            initialValues[item.interface_field] = item.i_value || "";
        });
        setFormValues(initialValues); // assuming you have setFormValues from parent
    }, [interfaceFields, deviceSettings]);

    return (
        <div>
            {mergedFields.length > 0 && (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-4">Interface Fields</h2>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        {mergedFields.map((item, index) => (
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
                                ) : item.interface_type === "button" ? (
                                    <button className="btn" onClick={() => handleComPort(item.if_id)} type="button">
                                        Refresh
                                    </button>
                                ) : (
                                    <input
                                        type="text"
                                        className="border rounded w-full py-2 px-3"
                                        value={formValues[item.interface_field] || item.i_value}
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
