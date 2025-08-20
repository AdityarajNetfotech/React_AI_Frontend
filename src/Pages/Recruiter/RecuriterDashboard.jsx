import React, { useEffect, useState } from 'react';
import { Briefcase, Users, Calendar, CheckCircle } from 'lucide-react';
import axios from "axios"



const stats = [
  { title: 'Total Applicants', value: 1245, icon: <Users className="text-blue-500" /> },
  { title: 'Open Positions', value: 8, icon: <Briefcase className="text-green-500" /> },
  { title: 'Interviews Scheduled', value: 32, icon: <Calendar className="text-purple-500" /> },
  { title: 'Hires', value: 15, icon: <CheckCircle className="text-yellow-500" /> },
];

const jobs = [
  { title: 'Frontend Developer', location: 'Remote', status: 'Open', applicants: 102 },
  { title: 'Backend Engineer', location: 'Bangalore', status: 'Closed', applicants: 85 },
  { title: 'UI/UX Designer', location: 'Remote', status: 'Open', applicants: 44 },
];

const applicants = [
  { name: 'Anjali Mehra', position: 'Frontend Developer', status: 'Interview Scheduled' },
  { name: 'Rohit Sharma', position: 'Backend Engineer', status: 'Under Review' },
  { name: 'Priya Singh', position: 'UI/UX Designer', status: 'Hired' },
];

const RecruiterDashboard = () => {

const [recentFiltered, setRecentFilterd] = useState([])
const [filterLoading, setFilterLoading] = useState(false);
  const handleRecentFilter = async() => {
    setFilterLoading(true);
    const token = localStorage.getItem('recruiterAuthToken')
    try {
      const response = await axios.get("http://localhost:5000/api/jd/get-all-recent-filtered",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200){
        console.log("filtered resumes data --->", response.data.recentFilteredResumes);
        setRecentFilterd(response.data.recentFilteredResumes)
      }
    } catch (error) {
      console.error("something went wrong",error)
    }finally{
      setFilterLoading(false)
    }
  }

  useEffect(()=>{
    handleRecentFilter()
  },[])

  console.log("recentFiltereddata--->",recentFiltered);
 
  
  return (

    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Recruiter Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Job Listings */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Job Listings</h2>
        <div className="space-y-3">
          {jobs.map((job, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    job.status === 'Open'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">{job.applicants} Applicants</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applicants Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Applicants Filtered</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Position</th>
              <th className="py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {!filterLoading? recentFiltered.map((applicant, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{applicant.name}</td>
                <td className="py-2">{applicant.jdTitle}</td>
                <td className="py-2">{applicant.email}</td>
              </tr>
            )):"Loading...."}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
