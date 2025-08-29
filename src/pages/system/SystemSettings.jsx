import { useEffect } from 'react';
import Navbar from '../../component/navbar/Navbar'
import apiFetch from "../../services/apiFetch"

const SystemSettings = () => {
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
       console.log(data);
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
      <div className='py-6 w-full px-8 bg-gray-100'>
        <h1 className='text-2xl font-bold text-center mb-6'>System Settings</h1>

      </div>
    </div>
  )
}

export default SystemSettings;
