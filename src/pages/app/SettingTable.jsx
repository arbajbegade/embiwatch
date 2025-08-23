import React, { useEffect } from 'react'
import apiFetch from '../../services/apiFetch';

const SettingTable = ({ jobId }) => {
    const [details, setDetails] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const fetchData = () => {
        if (!jobId) {
            setError("Job ID is required to fetch settings");
            return;
        }

        setLoading(true);
        setError(null);

        apiFetch(`/app/settings?job_id=${jobId}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDetails(data.data || []);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError("Failed to load settings");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [jobId]);

    return (
        <div className="mt-1 flex justify-center p-9">
            <div
                className="overflow-hidden w-full max-h-96 overflow-y-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style jsx>{`div::-webkit-scrollbar {display: none; /* Chrome, Safari, Opera */}`}</style>

                {error ? (
                    <div className="p-6 text-center text-red-500 font-medium">
                        {error}
                    </div>
                ) : loading ? (
                    <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : (
                    <table className="w-full divide-y divide-gray-200 border border-gray-300">
                        <thead className="bg-color sticky top-0 ">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    setting name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    setting value
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    uom
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {details && details.length > 0 ? (
                                details.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary text-center">
                                            {item.setting_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary text-center">
                                            {item.setting_value}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary text-center">
                                            {item.uom}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-8 text-center text-sm text-gray-500"
                                    >
                                        No settings available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SettingTable;
