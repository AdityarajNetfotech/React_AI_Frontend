import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Users,
  Filter,
  XCircle,
  TrendingUp,
  FileText,
  UserCheck,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
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
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

const RecruiterDashboard = () => {
  const [recentFiltered, setRecentFiltered] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [jds, setJds] = useState([]);
  const [fetchStats, setFetchStats] = useState({});
  const [statsLoading, setStatsLoading] = useState(true);
  const [jdsLoading, setJdsLoading] = useState(true);

  const handleStats = async () => {
    const token = localStorage.getItem('recruiterAuthToken');
    try {
      const response = await axios.get(`${baseUrl}/api/jd/get-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("jd count", response.data);

      if (response.status === 200) {
        setFetchStats(response.data.data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleGetJds = async () => {
    const token = localStorage.getItem("recruiterAuthToken");
    try {
      const response = await axios.get(`${baseUrl}/api/jd/get-recentJds`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("recent jd", response.data);

      if (response.status === 200) {
        setJds(response.data.data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setJdsLoading(false);
    }
  };

  const handleRecentFilter = async () => {
    setFilterLoading(true);
    const token = localStorage.getItem('recruiterAuthToken');
    try {
      const response = await axios.get(`${baseUrl}/api/jd/get-all-recent-filtered`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("recent filtered", response.data);

      if (response.status === 200) {
        setRecentFiltered(response.data.recentFilteredResumes || []);
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
  const totalApplications = totalFiltered + totalUnfiltered;

  const stats = [
    {
      title: 'Total Resumes',
      value: totalApplications,
      positive: true,
      icon: <Users className="text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Filtered',
      value: totalFiltered,
      positive: false,
      icon: <Filter className="text-red-500" />,
      bgColor: 'bg-red-50'
    },
    {
      title: 'Active JDs',
      value: fetchStats.totalJds || 0,
      positive: true,
      icon: <Briefcase className="text-green-500" />,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Applicants',
      value: fetchStats.totalApplicants || 0,
      positive: true,
      icon: <UserCheck className="text-purple-500" />,
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Unfiltered',
      value: totalUnfiltered,
      positive: false,
      icon: <XCircle className="text-orange-500" />,
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Success Rate of JD applied resumes',
      value: totalApplications > 0 ? Math.round((totalFiltered / totalApplications) * 100) : 0,
      positive: false,
      icon: <TrendingUp className="text-indigo-500" />,
      bgColor: 'bg-indigo-50'
    }
  ];

  const pieData = [
    { name: "Filtered", value: totalFiltered, color: "#3b82f6" },
    { name: "Unfiltered", value: totalUnfiltered, color: "#10b981" }
  ];

  const COLORS = ["#3b82f6", "#10b981"];

  const developmentData = jds.slice(0, 7).map((jd, index) => ({
    date: `Day ${index + 1}`,
    applications: (jd.filteredResumesCount || 0) + (jd.unfilteredResumesCount || 0)
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiter Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your recruitment process.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {statsLoading ? (
                  <span className="animate-pulse bg-gray-200 rounded h-8 w-16 block"></span>
                ) : (
                  typeof stat.value === 'number' && stat.title.includes('Rate') ? `${stat.value}%` : stat.value
                )}
              </p>
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Development Activity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Application Activity</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Applications</span>
            </div>
          </div>
          {!jdsLoading ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={developmentData}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorApplications)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Status Distribution</h2>
          {!jdsLoading && (totalFiltered > 0 || totalUnfiltered > 0) ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              {jdsLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Job Listings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Job Listings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Job Title</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">Filtered</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">Pending</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {!jdsLoading ? (
                  jds.slice(0, 5).map((job, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900 truncate max-w-xs">{job.jdTitle}</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.filteredResumesCount || 0}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.unfilteredResumesCount || 0}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-gray-900">
                          {(job.filteredResumesCount || 0) + (job.unfilteredResumesCount || 0)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Filtered Applicants */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Filtered Applicants</h2>
          <div className="space-y-4">
            {!filterLoading ? (
              recentFiltered.length > 0 ? (
                recentFiltered.slice(0, 5).map((applicant, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {applicant.name ? applicant.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{applicant.name || 'Unknown'}</p>
                      <p className="text-sm text-gray-500 truncate">{applicant.email || 'No email'}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-32">{applicant.jdTitle || 'N/A'}</p>
                      <p className="text-xs text-gray-500 truncate max-w-32">
                        {applicant.jdId ? applicant.jdId.substring(0, 8) + '...' : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No filtered applicants found</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-500 mt-2">Loading applicants...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Applications per Job Description</h2>
        {!jdsLoading ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={jds} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="jdTitle"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar
                dataKey="filteredResumesCount"
                fill="#A78BFA"
                name="Filtered Applications"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="unfilteredResumesCount"
                fill="#38BDF8"
                name="Pending Applications"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[350px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

    </div>
  );
};

export default RecruiterDashboard;