import React from 'react'


const SytemTable = ({ systemData }) => {
    if (!systemData || systemData.length === 0) {
        return <div>No system data available.</div>;
    }
    return (
        <div>
            <table className="w-full divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-color">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">SN ID</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Setting Name</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {systemData.map((item) => (
                        <tr key={item.sn_id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary text-center">{item.sn_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary text-center">{item.setting_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SytemTable