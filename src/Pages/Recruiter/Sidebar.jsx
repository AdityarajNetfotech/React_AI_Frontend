import React, { useState } from "react";
import {
  FiHome,
  FiFilePlus,
  FiFileText,
  FiHelpCircle,
  FiEdit,
  FiCheckCircle,
  FiLink,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: FiHome },
  { label: "Create JD", icon: FiFilePlus },
  { label: "My JD", icon: FiFileText },
  { label: "My Question", icon: FiHelpCircle },
//   { label: "Exam", icon: FiEdit },
  { label: "Result", icon: FiCheckCircle },
  { label: "My Link", icon: FiLink },
  { label: "Profile", icon: FiUser },
  { label: "Logout", icon: FiLogOut },
];

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
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a
                  href={`#${item.label.toLowerCase().replace(/\s/g, "")}`}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  {!collapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </a>
              </li>
            );
          })}
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
