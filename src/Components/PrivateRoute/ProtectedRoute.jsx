import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const adminToken = localStorage.getItem("adminAuthToken");
    const recruiterToken = localStorage.getItem("recruiterAuthToken");

    return adminToken || recruiterToken ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;
