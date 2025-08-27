import { Routes, Route } from 'react-router-dom';
import AutoRun from '../pages/autorun/AutoRun';
import Home from '../layout/Home';
import NotFound from '../layout/NotFound';
import Report from '../pages/report/Report';
import Settings from '../pages/settings/Settings';
import SettingsDetails from '../pages/settings/Details';
import { Toaster } from 'react-hot-toast';
import AppSettings from '../pages/app/AppSettings';
import SystemSettings from '../pages/system/SystemSettings';
import DeviceList from '../pages/device/DeviceList';

const AppRoutes = () => (
    <div className="h-screen bg-gray-100">
        <Toaster />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/autorun" element={<AutoRun />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/device" element={<DeviceList />} />
            <Route path="/settings/details" element={<SettingsDetails />} />
            <Route path="/settings/app" element={<AppSettings />} />
            <Route path="/settings/system" element={<SystemSettings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
);

export default AppRoutes;
