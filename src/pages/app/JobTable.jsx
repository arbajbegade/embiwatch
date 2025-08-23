import React from 'react'

const JobTable = ({ allJobs }) => {
    return (
        <div className="mt-1 flex justify-center p-9">
            <div className="shadow-lg overflow-hidden w-full max-h-96 overflow-y-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', }}>
                <style jsx>{`div::-webkit-scrollbar {display: none; /* Chrome, Safari, Opera */}`}</style>
                <table className="w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-color sticky top-0 ">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Job ID
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                Job Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allJobs && allJobs.length > 0 ? (
                            allJobs.map((job, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary text-center">
                                        {job.job_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary text-center">
                                        {job.job_name}
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
    )
}

export default JobTable