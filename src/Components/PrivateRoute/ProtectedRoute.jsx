import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const adminToken = localStorage.getItem("adminAuthToken");
    const recruiterToken = localStorage.getItem("recruiterAuthToken");
    const candidateAuthToken = localStorage.getItem("candidateAuthToken");

    return adminToken || recruiterToken || candidateAuthToken ?  (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;
