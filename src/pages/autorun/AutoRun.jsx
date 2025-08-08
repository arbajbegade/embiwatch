import React, { useEffect } from 'react'
import Navbar from '../../component/navbar/Navbar'
import apiFetch from '../../services/apiFetch';
import SocketService from '../../services/socketService';
import AutoChart from './AutoChart';

const AutoRun = () => {
  const [graphSettings, setGraphSettings] = React.useState(null);
  const [data, setData] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await apiFetch('/app/graph-settings');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setGraphSettings(data.data);
    } catch (err) {
      console.error('Failed to fetch graph settings:', err.message);
      setGraphSettings(null);
    }
  };

  useEffect(() => {
    SocketService.connect("production", JSON.stringify({ request: "production" }));
    SocketService.on("production", (data) => {
      const jsonData = JSON.parse(data);
      setData(jsonData);
    });
    SocketService.on("alert", (data) => {
      const jsonData = JSON.parse(data);
      if (jsonData.message) {
        setMessage(jsonData.message);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center justify-center py-6 bg-gray-100 w-full'>
        <AutoChart liveData={data} graphSettings={graphSettings} />

      </div>
    </div>
  )
}

export default AutoRun