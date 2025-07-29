import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from '../../../Components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 z-50">
        <AdminSidebar />
      </div>

      {/* Scrollable Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
