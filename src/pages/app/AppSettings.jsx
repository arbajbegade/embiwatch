import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import Navbar from '../../component/navbar/Navbar'
import JobsDetails from './JobsDetails'
import SDetails from './SDetails'
import apiFetch from '../../services/apiFetch';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const AppSettings = () => {
  const [tabValue, setTabValue] = useState(0)
  const [units, setUnits] = useState([])
  const [settingsName, setSettingsName] = useState([])
  const [jobName, setJobName] = useState([])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const fetchData = () => {
    apiFetch('/app/units', {
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
        setUnits(data.data || []);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
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
        setSettingsName(data.data || []);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };
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
        setJobName(data.data || []);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };

  useEffect(() => {
    fetchData();
    fetchSettingData();
    fetchJobNameData();
  }, []);

  return (
    <div className="min-h-screen bg-app-color">
      <Navbar back />
      <div className='w-full'>
        <Box sx={{ width: '100%', margin: '0 auto', px: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="app settings tabs" centered>
              <Tab label="Settings" />
              <Tab label="Jobs" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <SDetails units={units} settingsName={settingsName} jobName={jobName} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <JobsDetails />
          </TabPanel>
        </Box>
      </div>
    </div>
  )
}

export default AppSettings