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
import ChangePassword from "./Pages/Recruiter/ChangePasswordPage"
import RecruiterMainLandingPage from "./Pages/Recruiter/RecruiterMainLandingPage"
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import MainContext from "./Components/Context/RecruiterProvider"
import RecruiterProvider from "./Components/Context/RecruiterProvider"
import RecruiterProfilePage from './Pages/Recruiter/RecruiterProfile/RecruiterProfilePage';
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
            <Route path = "/RecruiterProfile" element={<RecruiterProfilePage />} />

            <Route path="/AdminRegister" element={<AdminRegister />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />

        </Routes>
      </Router>
       </RecruiterProvider>

    </div>
  )
}

export default App
