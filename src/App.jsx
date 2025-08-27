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
import { Toaster } from 'react-hot-toast';
import CreateJDOption from './Pages/Recruiter/component/CreateJDOption';
import RegisteredApplicants from './Pages/Admin/RegisteredApplicants';
import MyQuestion from './Pages/Recruiter/MyQuestions';
import Questions from './Pages/Recruiter/Questions';
import MyResult from './Pages/Recruiter/MyResult';
import GenerateTest from './Pages/Recruiter/combinedcodes/GenerateTest';
import FinalizeTest from './Pages/Recruiter/combinedcodes/FinalizeTest';
import GiveTestWrapper from './Pages/Recruiter/component/GiveTestWrapper';
import NewRegisterAdmin from './Pages/Admin/NewRegisterAdmin';
import UserEmail from './Components/Instructions_page/UserEmail';
import ProtectedRoute from './Components/PrivateRoute/ProtectedRoute';
import AllJDs from './Pages/Admin/AllJDs';



const App = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "8px",
            padding: "14px 18px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.25)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

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
            <Route path="/AdminRegister" element={<AdminRegister />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/UserEmail" element={<UserEmail />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Admin-Dashboard" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="Profile" element={<AdminProfile />} />
                <Route path="RegisteredRecruiters" element={<RegisteredRecruiters />} />
                <Route path="RegisteredApplicants" element={<RegisteredApplicants />} />
                <Route path="RegisteredApplicants" element={<RegisteredApplicants />} />
                <Route path="NewRegisterAdmin" element={<NewRegisterAdmin />} />
                <Route path="AllJDs" element={<AllJDs />} />
              </Route>
            </Route>



            <Route element={<ProtectedRoute />}>
              <Route path="/Recruiter-Dashboard" element={<Layout />}>
                <Route path="jd-details/:id" element={<JDDetails />} />
                <Route index element={<RecruiterDashboard />} />
                <Route path="/Recruiter-Dashboard/CreateJDOption/CreateJDManually" element={<CreateJDManually />} />
                <Route path="/Recruiter-Dashboard/CreateJDOption/CreateJDAI" element={<CreateJDAI />} />
                <Route path="My-Jd" element={<MyJD />} />
                <Route path="My-Question" element={<MyQuestion />} />
                <Route path="/Recruiter-Dashboard/My-Question/Questions" element={<Questions />} />
                <Route path="Result" element={<MyResult />} />
                <Route path="CreateJDOption" element={<CreateJDOption />} />
                <Route path="RecruiterProfile" element={<RecruiterProfilePage />} />
                <Route path="/Recruiter-Dashboard/My-Jd/JDDetails" element={<JDDetails />} />
                <Route path="generate-test" element={<GenerateTest />} />
                <Route path="finalize-test" element={<FinalizeTest />} />
                <Route path="test/:id" element={<GiveTestWrapper />} />
              </Route>
            </Route>




          </Routes>
        </Router>
      </RecruiterProvider>

    </div>
  )
}

export default App
