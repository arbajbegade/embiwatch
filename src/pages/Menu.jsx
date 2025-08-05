// MenuPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../theme/colors";

const menus = [
  { name: "Autorun", path: "/autorun" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings", protected: true },
  // { name: "Manual", path: "/manual" },
  // { name: "IO", path: "/io" },
];

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [targetPath, setTargetPath] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    if (menu.protected) {
      setTargetPath(menu.path);
      setShowModal(true);
    } else {
      navigate(menu.path);
    }
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === "1") {
      setShowModal(false);
      setEnteredPassword("");

      // Navigate on next render cycle to ensure modal closes
      requestAnimationFrame(() => {
        navigate(targetPath);
      });
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className={`min-h-screen ${theme.text} flex items-center justify-center ${theme.background}`}>
      <div className="flex flex-wrap gap-8 justify-center p-8 max-w-7xl">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => handleMenuClick(menu)}
            className={`${theme.block} ${theme.hover.main} transition-colors duration-200 rounded-2xl shadow-xl flex items-center justify-center text-2xl font-bold w-56 h-44`}
          >
            {menu.name}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-2xl w-96">
            <h2 className="text-lg font-semibold mb-4">Enter Settings Password</h2>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Password"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowModal(false);
                  setEnteredPassword("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handlePasswordSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
