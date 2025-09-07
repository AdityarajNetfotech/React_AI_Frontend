import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CandidateSidebar from "./components/CandidateSidebar";

const CandidateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <CandidateSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto bg-gray-100 p-6 max-[555px]:p-0 ${collapsed ? "ml-20" : "ml-64"
          }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default CandidateLayout;
