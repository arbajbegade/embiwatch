import { Link } from "react-router-dom";
import { theme } from "../theme/colors";

const settingsMenus = [
  { name: "App", path: "/settings/app" },
  // { name: "Calibration", path: "/settings/calibration" },
  { name: "System", path: "/settings/system" },
  // { name: "Print", path: "/settings/print" },
];

export default function Settings() {
  return (
    <div className={`min-h-screen ${theme.text} flex items-center justify-center ${theme.background}`}>
      <div className="flex flex-wrap gap-8 justify-center p-8 max-w-7xl">
        {settingsMenus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.path}
            className={`${theme.block} ${theme.hover.settings} transition-colors duration-200 rounded-2xl shadow-xl flex items-center justify-center text-2xl font-bold w-56 h-44`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
