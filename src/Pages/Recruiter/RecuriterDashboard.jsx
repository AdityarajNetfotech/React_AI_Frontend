import React, { useEffect, useState } from 'react';
import { Briefcase, Users, Filter, XCircle } from 'lucide-react';
import axios from "axios";
import { baseUrl } from '../../utils/ApiConstants';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const RecruiterDashboard = () => {
  const [recentFiltered, setRecentFilterd] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [jds, setJds] = useState([]);
  const [fetchStats, setFetchStats] = useState({});

  const handleStats = async () => {
    const token = localStorage.getItem('recruiterAuthToken');
    try {
      const response = await axios.get(`${baseUrl}/api/jd/get-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setFetchStats(response.data.data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleGetJds = async () => {
    const token = localStorage.getItem("recruiterAuthToken");
    try {
      const response = await axios.get(`${baseUrl}/api/jd/get-recentJds`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setJds(response.data.data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleRecentFilter = async () => {
    setFilterLoading(true);
    const token = localStorage.getItem('recruiterAuthToken');
    try {
      const response = await axios.get(`${baseUrl}/api/jd/get-all-recent-filtered`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setRecentFilterd(response.data.recentFilteredResumes);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    handleRecentFilter();
    handleStats();
    handleGetJds();
  }, []);

  const totalFiltered = jds.reduce((sum, jd) => sum + (jd.filteredResumesCount || 0), 0);
  const totalUnfiltered = jds.reduce((sum, jd) => sum + (jd.unfilteredResumesCount || 0), 0);

  const stats = [
    { title: 'Total Applicants', value: fetchStats.totalApplicants, icon: <Users className="text-blue-500" /> },
    { title: 'Total JDs', value: fetchStats.totalJds, icon: <Briefcase className="text-green-500" /> },
    { title: 'Total Filtered Applicants', value: totalFiltered, icon: <Filter className="text-purple-500" /> },
    { title: 'Total Unfiltered Applicants', value: totalUnfiltered, icon: <XCircle className="text-red-500" /> },
  ];

  const pieData = [
    { name: "Filtered", value: totalFiltered },
    { name: "Unfiltered", value: totalUnfiltered }
  ];

  const COLORS = ["#3b82f6", "#10b981"]; 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Recruiter Dashboard</h1>

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

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Applicants per JD</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jds} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jdTitle" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="filteredResumesCount" fill="#3b82f6" name="Filtered" />
            <Bar dataKey="unfilteredResumesCount" fill="#10b981" name="Unfiltered" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">Overall Applicants Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Job Listings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[600px]">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 px-2">Job Title</th>
                <th className="py-2 px-2">Filtered</th>
                <th className="py-2 px-2">Unfiltered</th>
                <th className="py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {jds.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2">{job.jdTitle}</td>
                  <td className="py-2 px-2">{job.filteredResumesCount}</td>
                  <td className="py-2 px-2">{job.unfilteredResumesCount}</td>
                  <td className="py-2 px-2 font-semibold">
                    {(job.filteredResumesCount || 0) + (job.unfilteredResumesCount || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Applicants Filtered</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[600px]">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Position</th>
                <th className="py-2 px-2">Email</th>
                <th className="py-2 px-2">JD ID</th>
              </tr>
            </thead>
            <tbody>
              {!filterLoading ? (
                recentFiltered.map((applicant, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{applicant.name}</td>
                    <td className="py-2 px-2">{applicant.jdTitle}</td>
                    <td className="py-2 px-2">{applicant.email}</td>
                    <td className="py-2 px-2">{applicant.jdId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
