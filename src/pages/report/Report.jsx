import React from 'react'
import Navbar from '../../component/navbar/Navbar'

function Report() {
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
                <h1 className="text-2xl font-bold text-center mt-8">Report Page</h1>
                <p className="text-gray-600 mt-4">This is the Report page where you can view and manage your reports.</p>
                <p className="text-gray-600 mt-2">Use the navigation bar to go back to the home page or access other features.</p>
                <p className="text-gray-600 mt-2">More features will be added soon!</p>
            </div>
        </div>
    )
}

export default Report