import React from 'react'

const SystemTable = ({ deviceSettings }) => {
    return (
        <>{
            deviceSettings.length > 0 &&
            <div className="mt-1 flex justify-center p-9">
                <div className="shadow-lg w-full">
                    <table className="w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-color sticky top-0 ">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Device ID
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Setting ID
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Setting Name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Setting Value
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {deviceSettings.length > 0 ? (
                                deviceSettings.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary text-center">
                                            {item.device_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary text-center">
                                            {item.setting_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary text-center">
                                            {item.setting_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary text-center">
                                            {item.setting_value}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary text-center">
                                            {item.createdAt}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="px-6 py-8 text-center text-sm text-gray-500"
                                    >
                                        No jobs available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        }</>

    )
}

export default SystemTable