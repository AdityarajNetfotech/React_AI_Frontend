import React, { useEffect, useState } from "react";
import {
  UserPlus,
  ClipboardList,
  Users,
  Building2,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Award,
  Target,
  FileText,
  Briefcase
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
import { baseUrl } from "../../../utils/ApiConstants";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#EC4899'];

const AdminDashboard = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [jds, setJDs] = useState([]);
  const [statsBackend, setStatsBackend] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats
        const statsResponse = await axios.get(`${baseUrl}/api/admin/getAlldata`);
        console.log("state", statsResponse.data);
        
        setStatsBackend(statsResponse.data);

        // Fetch recruiters
        const recruitersResponse = await axios.get(`${baseUrl}/api/admin/getAllRecruiters`);
        console.log("rec", recruitersResponse.data);
        
        setRecruiters(recruitersResponse.data.recruiters || []);

        // Fetch JDs
        const token = localStorage.getItem("recruiterAuthToken");
        const jdsResponse = await axios.get(`${baseUrl}/api/jd/get-all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("jd", jdsResponse.data);
        
        setJDs(jdsResponse.data.jds || []);

        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Process JDs data for charts
  const processJDsData = () => {
    if (!jds.length) return { skillsData: [], locationData: [], salaryData: [], experienceData: [] };

    // Skills distribution
    const skillsMap = {};
    jds.forEach(jd => {
      if (jd.skills && Array.isArray(jd.skills)) {
        jd.skills.forEach(skill => {
          // Split comma-separated skills
          const skillsList = skill.split(',').map(s => s.trim());
          skillsList.forEach(s => {
            skillsMap[s] = (skillsMap[s] || 0) + 1;
          });
        });
      }
    });
    const skillsData = Object.entries(skillsMap).map(([name, value]) => ({ name, value }));

    // Location distribution
    const locationMap = {};
    jds.forEach(jd => {
      if (jd.location) {
        const location = jd.location.charAt(0).toUpperCase() + jd.location.slice(1);
        locationMap[location] = (locationMap[location] || 0) + 1;
      }
    });
    const locationData = Object.entries(locationMap).map(([location, jobs]) => ({ location, jobs }));

    // Salary distribution
    const salaryMap = {};
    jds.forEach(jd => {
      if (jd.salaryRange) {
        let range;
        const salary = jd.salaryRange.toLowerCase();
        if (salary.includes('3') && !salary.includes('-')) {
          range = '0-3 LPA';
        } else if (salary.includes('2-7') || salary.includes('3-5')) {
          range = '3-7 LPA';
        } else if (salary.includes('7') || salary.includes('10')) {
          range = '7+ LPA';
        } else {
          range = 'Other';
        }
        salaryMap[range] = (salaryMap[range] || 0) + 1;
      }
    });
    const salaryData = Object.entries(salaryMap).map(([range, count]) => ({ range, count }));

    // Experience distribution
    const experienceMap = {};
    jds.forEach(jd => {
      let exp;
      if (jd.experience === null || jd.experience === "null" || jd.experience === "0") {
        exp = 'Fresher';
      } else if (jd.experience === "1") {
        exp = '1 Year';
      } else if (jd.experience === "2") {
        exp = '2 Years';
      } else if (parseInt(jd.experience) >= 3) {
        exp = '3+ Years';
      } else {
        exp = 'Not Specified';
      }
      experienceMap[exp] = (experienceMap[exp] || 0) + 1;
    });
    const experienceData = Object.entries(experienceMap).map(([experience, count]) => ({ experience, count }));

    return { skillsData, locationData, salaryData, experienceData };
  };

  // Process recruiters data
  const processRecruitersData = () => {
    if (!recruiters.length) return { companyData: [], monthlyData: [] };

    // Company distribution
    const companyMap = {};
    recruiters.forEach(recruiter => {
      const company = recruiter.company || recruiter.companyName || 'Unknown';
      companyMap[company] = (companyMap[company] || 0) + 1;
    });
    const companyData = Object.entries(companyMap)
      .map(([company, recruiters]) => ({ company, recruiters }))
      .sort((a, b) => b.recruiters - a.recruiters)
      .slice(0, 6); // Top 6 companies

    // Monthly growth
    const monthlyMap = {};
    recruiters.forEach(recruiter => {
      if (recruiter.createdAt) {
        const date = new Date(recruiter.createdAt);
        const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthlyMap[monthYear] = (monthlyMap[monthYear] || 0) + 1;
      }
    });
    
    const monthlyData = Object.entries(monthlyMap)
      .map(([month, recruiters]) => ({ month, recruiters }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    return { companyData, monthlyData };
  };

  // Process JD-Recruiter mapping
  const processJDRecruiterData = () => {
    if (!jds.length || !recruiters.length) return [];

    const recruiterJDMap = {};
    
    // Initialize all recruiters
    recruiters.forEach(recruiter => {
      recruiterJDMap[recruiter.name] = { recruiters: 1, jobs: 0 };
    });

    // Count JDs per recruiter
    jds.forEach(jd => {
      if (jd.recruiter && jd.recruiter.name) {
        if (recruiterJDMap[jd.recruiter.name]) {
          recruiterJDMap[jd.recruiter.name].jobs += 1;
        }
      }
    });

    return Object.entries(recruiterJDMap)
      .map(([name, data]) => ({ name, ...data }))
      .slice(0, 10); // Top 10 recruiters
  };

  // Get processed data
  const { skillsData, locationData, salaryData, experienceData } = processJDsData();
  const { companyData, monthlyData } = processRecruitersData();
  const recruiterJDData = processJDRecruiterData();

  // Calculate resume statistics
  const totalResumes = jds.reduce((sum, jd) => {
    const filtered = jd.filteredResumes ? jd.filteredResumes.length : 0;
    const unfiltered = jd.unfilteredResumes ? jd.unfilteredResumes.length : 0;
    return sum + filtered + unfiltered;
  }, 0);

  const filteredResumes = jds.reduce((sum, jd) => 
    sum + (jd.filteredResumes ? jd.filteredResumes.length : 0), 0);

  const stats = [
    {
      label: "Total Candidates",
      value: statsBackend.Candidate_count || 0,
      icon: <Users className="h-8 w-8 text-blue-600" />,
      color: "blue"
    },
    {
      label: "Active Recruiters", 
      value: statsBackend.Recruiter_count || 0,
      icon: <UserPlus className="h-8 w-8 text-green-600" />,
      color: "green"
    },
    {
      label: "Job Postings",
      value: statsBackend.countJd || 0,
      icon: <ClipboardList className="h-8 w-8 text-purple-600" />,
      color: "purple"
    },
    {
      label: "Total Resumes",
      value: totalResumes,
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      color: "orange"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time overview of your recruitment platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Active Companies</span>
              <p className="font-semibold">{companyData.length}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Skills in JDs</h2>
            </div>
            {skillsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillsData.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillsData.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No skills data available
              </div>
            )}
          </div>

          {/* Location Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Jobs by Location</h2>
            </div>
            {locationData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No location data available
              </div>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Experience Requirements */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Experience Levels</h2>
            </div>
            {experienceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={experienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="count"
                    label={({ experience, percent }) => `${experience} ${(percent * 100).toFixed(0)}%`}
                  >
                    {experienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No experience data available
              </div>
            )}
          </div>

          {/* Salary Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Salary Ranges</h2>
            </div>
            {salaryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No salary data available
              </div>
            )}
          </div>

          {/* Top Companies */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Companies</h2>
            </div>
            <div className="space-y-4">
              {companyData.length > 0 ? (
                companyData.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{company.company}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(company.recruiters / Math.max(...companyData.map(c => c.recruiters))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 min-w-[20px]">{company.recruiters}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No company data available</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recruiter Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Recruiters & Their Job Postings</h2>
          </div>
          {recruiterJDData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={recruiterJDData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobs" fill="#10B981" radius={[4, 4, 0, 0]} name="Job Postings" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No recruiter data available
            </div>
          )}
        </div>

        {/* Monthly Growth Trend */}
        {monthlyData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recruiter Growth Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="recruiters"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  name="New Recruiters"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Resume Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Resume Statistics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Resumes</span>
                <span className="text-2xl font-bold text-blue-600">{totalResumes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Filtered Resumes</span>
                <span className="text-2xl font-bold text-green-600">{filteredResumes}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{ width: `${totalResumes > 0 ? (filteredResumes / totalResumes) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {totalResumes > 0 ? ((filteredResumes / totalResumes) * 100).toFixed(1) : 0}% of resumes are filtered
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Active Data</h2>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Active</div>
                <p className="text-gray-600">System Status</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-semibold text-blue-600">{jds.filter(jd => jd.filteredResumes && jd.filteredResumes.length > 0).length}</div>
                  <p className="text-xs text-gray-500">Jobs with Filtered Resumes</p>
                </div>
                <div>
                  <div className="text-xl font-semibold text-purple-600">{companyData.length}</div>
                  <p className="text-xs text-gray-500">Total Active Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;