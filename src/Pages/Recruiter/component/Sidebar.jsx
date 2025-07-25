import React, { useState } from "react";
import {
  FiHome,
  FiFilePlus,
  FiFileText,
  FiHelpCircle,
  FiCheckCircle,
  FiLink,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 text-white flex flex-col shadow-2xl sticky top-0 transition-all duration-300`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-700">
        {!collapsed && (
          <span className="text-2xl font-bold tracking-wide">MyPortal</span>
        )}
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/Recruiter-Dashboard"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiHome className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>

          <li>
            <Link
              to="CreateJD"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiFilePlus className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">Create JD</span>}
            </Link>
          </li>

          <li>
            <Link
              to="CreateJDAI"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiFileText className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">My JD</span>}
            </Link>
          </li>

          <li>
            <Link
              to="#myquestion"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiHelpCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">My Question</span>}
            </Link>
          </li>

          <li>
            <Link
              to="#result"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiCheckCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">Result</span>}
            </Link>
          </li>

          <li>
            <Link
              to="#mylink"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiLink className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">My Link</span>}
            </Link>
          </li>

          <li>
            <Link
              to="#profile"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">Profile</span>}
            </Link>
          </li>

          <li>
            <Link
              to="#logout"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <FiLogOut className="w-5 h-5 text-gray-400 group-hover:text-white" />
              {!collapsed && <span className="ml-3">Logout</span>}
            </Link>
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
  );
};

export default Sidebar;
