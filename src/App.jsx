import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import DashboardSidebar from './Components/Recruter/DashboardSidebar';
import Dashboard from './Components/Admin/Dashboard';
import DashboardStudent from './Components/Candidates/DashboardStudent';
import Register from './Components/Auth/Register';
import LandingPage from './Pages/MainLandingPage';
import RecriuterRegister from "./Pages/Recruiter/RecriuterRegister"
import RecruiterLogin from "./Pages/Recruiter/RecruiterLogin"
import AdminRegister from "./Pages/Admin/AdminRegister"
import AdminLogin from "./Pages/Admin/AdminLogin"
import EmailResetPage from "./Pages/Recruiter/EmailResetPage"
import EmailOtpPage from "./Pages/Recruiter/EmailOtpPage"
// import ChangePassword from "./Pages/Recruiter/ChangePasswordPage"
import ChangePassword from "./Pages/Recruiter/ChangePasswordPage"
import RecruiterMainLandingPage from "./Pages/Recruiter/RecruiterMainLandingPage"
import AdminDashboard from "./Pages/Admin/Admin Dashboard/AdminDashboard"
import MainContext from "./Components/Context/RecruiterProvider"
import RecruiterProvider from "./Components/Context/RecruiterProvider"
import Sidebar from './Pages/Recruiter/Sidebar';
import Layout from './Pages/Recruiter/Layout';
import RecruiterDashboard from './Pages/Recruiter/RecuriterDashboard';
import MyJD from './Pages/Recruiter/MyJD';
import CreateJDManually from './Pages/Recruiter/CreateJDManually';
import CreateJDAI from './Pages/Recruiter/CreateJDAI';
import AdminLayout from './Pages/Admin/Admin Dashboard/AdminLayout';
import AdminProfile from './Pages/Admin/Admin Dashboard/AdminProfile';
import RecruiterProfilePage from './Pages/Recruiter/RecruiterProfile/RecruiterProfilePage';
import JDDetails from './Pages/Recruiter/MyJD/JDDetails';
import RegisteredRecruiters from './Pages/Admin/RegisteredRecruiters';



const App = () => {
  return (
    <div>
      <RecruiterProvider >

        <Router>
          <Routes>
            <Route path="/DashboardSidebar" element={<DashboardSidebar />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/RecruiterMainLandingPage" element={<RecruiterMainLandingPage />} />
            <Route path="/RecruiterRegister" element={<RecriuterRegister />} />
            <Route path="/RecruiterLogin" element={<RecruiterLogin />} />
            <Route path="/EmailResetPage" element={<EmailResetPage />} />
            <Route path="/EmailOtpPage" element={<EmailOtpPage />} />
            <Route path="/ChangePasswordPage" element={<ChangePassword />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="AdminDashboard" element={<AdminDashboard />} />
              <Route path="Profile" element={<AdminProfile />} />
              <Route path="RegisteredRecruiters" element={<RegisteredRecruiters />} />
            </Route>

            <Route path="/AdminRegister" element={<AdminRegister />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />

            <Route path="/Recruiter-Dashboard" element={<Layout />}>
              <Route index element={<RecruiterDashboard />} />
              <Route path="CreateJDManually" element={<CreateJDManually />} />
              <Route path="CreateJDAI" element={<CreateJDAI />} />
              <Route path="My-Jd" element={<MyJD />} />
              <Route path="RecruiterProfile" element={<RecruiterProfilePage />} />
            </Route>
            
            <Route path="/JDDetails/:id" element={<JDDetails />} />
            

          </Routes>
        </Router>
      </RecruiterProvider>

    </div>
  )
}

export default App
