import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFilePlus,
  FiFileText,
  FiHelpCircle,
  FiCheckCircle,
  FiLink,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: FiHome, path: "" },
  { label: "All JDs", icon: FiFilePlus, path: "Alljds" },
  { label: "My Results", icon: FiFileText, path: "JDResult" },
  { label: "Update Profile", icon: FiHelpCircle, path: "UpdateCandidate" },
  { label: "Result", icon: FiCheckCircle, path: "Result" },
  { label: "Profile", icon: FiUser, path: "candidate-profile" },
  { label: "Logout", icon: FiLogOut, path: "/CandidateLogin" },
];

const CandidateSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("candidateAuthToken");
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
  }, []);

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 text-white flex flex-col shadow-2xl sticky top-0 transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-700">
        {!collapsed && (
          <span className="text-2xl font-bold tracking-wide">Candidate Dashboard</span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white text-xl"
        >
          {collapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={item.label === "Logout" ? handleLogout : undefined}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-800">
          © 2025 MyCompany
        </div>
      )}
    </div>
  );
};

export default CandidateSidebar;