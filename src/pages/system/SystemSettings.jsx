import { useEffect, useState } from 'react';
import Navbar from '../../component/navbar/Navbar'
import apiFetch from "../../services/apiFetch"
import SytemTable from './SytemTable';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const [systemData, setSystemData] = useState([])
  const [setting_name, setSettingName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { "setting_name": setting_name };
    apiFetch('/system/setting-names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
      )
      .then(data => {
        toast.success('Setting added successfully!');
        fetchSettingData();
        setSettingName('');
      })
      .catch(err => {
        console.error('Error submitting data:', err);
      });
  };

  const fetchSettingData = () => {
    apiFetch('/system/setting-names', {
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
        setSystemData(data.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };
  useEffect(() => {
    fetchSettingData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="py-6 w-full px-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">System Settings</h1>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4 mb-6">
          <div>
            <input
              type="text"
              id="setting_name"
              name="setting_name"
              value={setting_name}
              onChange={(e) => setSettingName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter setting name"
            />
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
        </form>

        <div className="mt-8">
          <SytemTable systemData={systemData} />
        </div>
      </div>
    </div>

  )
}

export default SystemSettings;
