import React, { useEffect, useState } from 'react'
import apiFetch from '../../services/apiFetch'
import JobTable from './JobTable'
import toast from 'react-hot-toast'

const JobsDetails = () => {
    const [job_name, setJobName] = useState('')
    const [job_Name, setJob_Name] = useState([])

    const fetchJobNameData = () => {
        apiFetch('/app/jobs', {
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
                setJob_Name(data.data || []);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    };

    const handleChange = (event) => {
        setJobName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const apiData = {
            job_name: job_name,
        };

        apiFetch('/app/jobs', {
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
                toast.success(data.message || 'Job added successfully');
                setJobName('');
                fetchJobNameData();
            })
            .catch(err => {
                console.error('Error submitting form:', err);
                toast.error('Error submitting form');
            });
    }

    const handleReset = () => {
        setJobName('')
    }

    useEffect(() => {
        fetchJobNameData();
    }, [])

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-primary mb-1">
                            Job Name
                        </label>
                        <input
                            type="text"
                            name="jobName"
                            value={job_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter value"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent text-primary bg-white transition duration-200"
                        />
                    </div>
                    <div className="flex gap-2 items-center mt-4">
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
            <JobTable allJobs={job_Name} />
        </div>
    )
}

export default JobsDetails