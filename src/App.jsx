// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
// import Autorun from "./pages/Autorun";
// import AutorunHci from "./pages/AutorunHci";
// import AutorunGlycol from "./pages/AutorunGlycol";
// import AutorunPlotter from "./pages/AutorunPlotter";
import AutorunConnector from "./pages/AutorunConnector";
import Reports from "./pages/Report/Report";
import Settings from "./pages/Settings";
import Manual from "./pages/Manual";
import IO from "./pages/IO";
import AppSettings from "./pages/settings/AppSettings";
import CalibrationSettings from "./pages/settings/CalibrationSettings";
import SystemSettings from "./pages/settings/SystemSettings";
import PrintSettings from "./pages/settings/PrintSettings";
import { SocketProvider } from './contexts/SocketContext';

function App() {
  return (
    <SocketProvider>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Menu />} />
          {/* <Route path="/autorun" element={<Autorun />} /> */}
          {/* <Route path="/autorun" element={<AutorunPlotter />} /> */}
          {/* <Route path="/autorun" element={<AutorunGlycol />} /> */}
          {/* <Route path="/autorun" element={<AutorunHci />} /> */}
          <Route path="/autorun" element={<AutorunConnector />} />
          
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/io" element={<IO />} />
          <Route path="/settings/app" element={<AppSettings />} />
          <Route path="/settings/calibration" element={<CalibrationSettings />} />
          <Route path="/settings/system" element={<SystemSettings />} />
          <Route path="/settings/print" element={<PrintSettings />} />
        </Routes>
      {/* </BrowserRouter> */}
    </SocketProvider>
  );
}

export default App;
