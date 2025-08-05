import { Routes, Route } from 'react-router-dom';
import AutoRun from '../pages/autorun/AutoRun';
import Home from '../layout/Home';
import NotFound from '../layout/NotFound';
import Report from '../pages/report/Report';
import Settings from '../pages/settings/Settings';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autorun" element={<AutoRun />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
