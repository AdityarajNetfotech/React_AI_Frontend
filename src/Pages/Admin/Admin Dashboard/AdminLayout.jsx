import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from '../../../Components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
