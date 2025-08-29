import React, { useEffect, useState } from 'react'
import apiFetch from '../../services/apiFetch'
import toast from 'react-hot-toast'
import SettingTable from './SettingTable'

const SDetails = ({ units, settingsName, jobName }) => {
    const [details, setDetails] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = useState({
        job_id: '',
        setting_name: '',
        setting_value: '',
        uom_id: ''
    })

    const fetchData = (jobId) => {
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
        if (formData.job_id) {
            fetchData(formData.job_id);
        }
    }, [formData.job_id]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.job_id || !formData.setting_name || !formData.setting_value || !formData.uom_id) {
            toast.error('All fields are required');
            return;
        }
        const apiData = {
            setting_name: formData.setting_name,
            setting_value: formData.setting_value,
            job_id: parseInt(formData.job_id),
            uom_id: parseInt(formData.uom_id)
        };
        apiFetch('/app/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(apiData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                toast.success('Form submitted successfully!');
                fetchData(apiData.job_id);
                setFormData({
                    setting_name: '',
                    setting_value: '',
                    job_id: formData.job_id, // Keep job_id to maintain the table data
                    uom_id: ''
                });
            })
            .catch(err => {
                console.error('Error submitting form:', err);
                toast.error('Error submitting form');
            });
    };

    const handleReset = () => {
        setFormData({
            job_id: '',
            setting_name: '',
            setting_value: '',
            uom_id: ''
        })
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Row - Job Name and Setting Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                            Job Name
                        </label>
                        <select
                            name="job_id"
                            value={formData.job_id}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent text-primary bg-white transition duration-200"
                        >
                            <option value="">Select Job Name</option>
                            {jobName && jobName.map((item, index) => (
                                <option key={index} value={item.job_id}>
                                    {item.job_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                            Setting Name
                        </label>
                        <select
                            name="setting_name"
                            value={formData.setting_name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent text-primary bg-white transition duration-200"
                        >
                            <option value="">Select Setting Name</option>
                            {settingsName && settingsName.map((item, index) => (
                                <option key={index} value={item.setting_name}>
                                    {item.setting_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Second Row - Setting Value, Units, and Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                            Setting Value
                        </label>
                        <input
                            type="number"
                            name="setting_value"
                            value={formData.setting_value}
                            onChange={handleChange}
                            required
                            placeholder="Enter value"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent text-primary bg-white transition duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                            Units
                        </label>
                        <select
                            name="uom_id"
                            value={formData.uom_id}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent text-primary bg-white transition duration-200"
                        >
                            <option value="">Select unit</option>
                            {units && units.map((unit, index) => (
                                <option key={index} value={unit.uom_id}>
                                    {unit.uom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-4 py-2 text-sm rounded-md border border-gray-800 bg-white text-gray-800 font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm rounded-md border bg-gray-800 text-white font-semibold hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-in-out"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            <SettingTable details={details} error={error} loading={loading} />
        </div>
    )
}

export default SDetails