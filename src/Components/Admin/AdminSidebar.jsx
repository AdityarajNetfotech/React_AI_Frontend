import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const sidebarItems = [
  { label: "Dashboard", icon: FiHome, path: "" },
  { label: "Registered Recruiter", icon: FiUserPlus, path: "RegisteredRecruiters" },
  { label: "Registered Applicants", icon: FiUsers, path: "RegisteredApplicants" },
  { label: "Profile", icon: FiUser, path: "Profile" },
  { label: "Register Admin", icon: FiUsers, path: "NewRegisterAdmin" },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    navigate("/AdminLogin");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  return (
    <>
      <div
        className={`h-screen ${
          collapsed ? "w-20" : "w-64"
        } bg-gray-900 text-white flex flex-col shadow-2xl sticky top-0 transition-all duration-300`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-700">
          {!collapsed && (
            <span className="text-2xl font-bold tracking-wide">Admin Panel</span>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white text-xl transition-colors duration-200"
          >
            {collapsed ? <FiMenu /> : <FiX />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 group relative ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white flex-shrink-0" />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                    
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                        {item.label}
                      </div>
                    )}
                  </NavLink>
                </li>
              );
            })}

            {/* Logout Item */}
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-300 group text-red-400 hover:text-white hover:bg-red-700 relative"
              >
                <FiLogOut className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">Logout</span>}
                
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10">
                    Logout
                  </div>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-800">
            © 2025 MyCompany
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;