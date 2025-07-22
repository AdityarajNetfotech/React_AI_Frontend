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
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/DashboardSidebar" element={<DashboardSidebar />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
