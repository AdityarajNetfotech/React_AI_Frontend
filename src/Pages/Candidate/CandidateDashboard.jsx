import React, { useState, useEffect } from "react";
import { Briefcase, CheckCircle, XCircle, Mail, Users, TrendingUp, Clock, MapPin } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area
} from "recharts";
import axios from "axios";
import { baseUrl } from "../../utils/ApiConstants";

const CandidateDashboard = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allJdRes = await axios.get(`${baseUrl}/api/admin/getAllJD`);
        console.log("allJdRes", allJdRes.data);

        setAllJobs(allJdRes.data.Jd || []);

        const token = localStorage.getItem("candidateAuthToken");
        if (token) {
          const appliedRes = await axios.get(
            `${baseUrl}/api/candidate/get-all-applied-jobs`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("appliedRes", appliedRes.data);

          setAppliedJobs(appliedRes.data.specificItems || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rejectedCount = appliedJobs.filter(job => job.status === 'rejected').length;
  const acceptedCount = appliedJobs.filter(job => job.status === 'accepted' || job.status === 'selected').length;

  const stats = [
    {
      title: "Total JDs Available",
      value: allJobs.length,
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "JDs Applied",
      value: appliedJobs.length,
      icon: <Users className="w-5 h-5" />,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Accepted",
      value: acceptedCount,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Rejected",
      value: rejectedCount,
      icon: <XCircle className="w-5 h-5" />,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Pending",
      value: appliedJobs.length > 0 ? appliedJobs.length - appliedJobs.filter(job => job.status).length : 0,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      bgColor: "bg-amber-50"
    },
  ];

  const locationData = allJobs.reduce((acc, job) => {
    const location = job.location || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const locationChartData = Object.entries(locationData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const recentJobs = allJobs.slice(-4).reverse();

  const skillsData = allJobs.reduce((acc, job) => {
    if (job.skills && Array.isArray(job.skills)) {
      job.skills.forEach(skill => {
        if (typeof skill === 'string') {
          const skills = skill.split(',').map(s => s.trim());
          skills.forEach(s => {
            acc[s] = (acc[s] || 0) + 1;
          });
        }
      });
    }
    return acc;
  }, {});

  const topSkillsData = Object.entries(skillsData)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const applicationStatus = [
    { name: "Applied", value: appliedJobs.length, color: "#3B82F6" },
    { name: "Available", value: Math.max(0, allJobs.length - appliedJobs.length), color: "#10B981" },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Candidate Dashboard</h1>
        <p className="text-gray-600">Track your job applications and opportunities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.bgColor} backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Jobs by Location */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Jobs by Location
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.9} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Application Status Pie */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Application Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {applicationStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Job Openings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Job Openings</h2>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all cursor-pointer">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">{job.title || 'Job Title'}</h3>
                  <p className="text-xs text-gray-600 mt-1">{job.company || 'Company'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{job.location || 'Location'}</p>
                  <p className="text-xs font-semibold text-blue-600 mt-1">New</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Most Demanded Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {topSkillsData.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <span className="font-medium text-gray-700">{skill.skill}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  {skill.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Job Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Salary</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.slice(0, 5).map((job, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{job.title}</td>
                  <td className="py-3 px-4 text-gray-600">{job.location}</td>
                  <td className="py-3 px-4 text-gray-600">{job.salary ? `${job.salary} LPA` : 'Not specified'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        job.status === 'accepted' || job.status === 'selected' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                      {job.status || 'Applied'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;