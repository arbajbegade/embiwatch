import React from 'react'
import Navbar from '../../component/navbar/Navbar'

const Settings = () => {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className="text-2xl font-bold text-center mt-8">Settings Page</h1>
            <p className="text-gray-600 mt-4">This is the Settings page where you can configure your application settings.</p>
            <p className="text-gray-600 mt-2">Use the navigation bar to go back to the home page or access other features.</p>
            <p className="text-gray-600 mt-2">More features will be added soon!</p>
            </div>
    </div>
  )
}

export default Settings