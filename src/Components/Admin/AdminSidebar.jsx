import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const sidebarItems = [
  { label: "Dashboard", icon: FiHome, path: "AdminDashboard" },
];

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
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
    </div>
  );
};

export default AdminSidebar;
