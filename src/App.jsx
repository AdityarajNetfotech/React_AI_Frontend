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
const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<DashboardSidebar />} />
        </Routes>
        </Router>
    </div>
  )
}

export default App
