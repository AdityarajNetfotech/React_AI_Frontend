import React from 'react'
import './App.css' // Assuming you have an App.css for styles
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

    
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Router>
      <Routes>
        <Route path="/DashboardSidebar" element={<DashboardSidebar />} />
        </Routes>
        </Router>
    </div>
  )
}

export default App
