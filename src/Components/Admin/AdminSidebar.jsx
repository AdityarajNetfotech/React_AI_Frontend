import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const sidebarItems = [
  { label: "Dashboard", icon: FiHome, path: "AdminDashboard" },
  { label: "Registered Recruiter", icon: FiUserPlus, path: "RegisteredRecruiters" },
  { label: "Registered Applicants", icon: FiUsers, path: "RegisteredApplicants" },
  { label: "Scheduled Test", icon: FiCalendar, path: "ScheduledTest" },
  { label: "Job Posted", icon: FiBriefcase, path: "JobPosted" },
  { label: "Profile", icon: FiUser, path: "Profile" },
];

const AdminSidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

      <div className="flex flex-col space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}

        {/* Logout Item */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-red-700 transition-colors duration-200 text-red-400 hover:text-white"
        >
          <FiLogOut className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
