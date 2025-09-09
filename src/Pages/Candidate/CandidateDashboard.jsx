import React from "react";
import { Briefcase, CheckCircle, XCircle, Mail, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const CandidateDashboard = () => {
  const stats = [
    { title: "Total JDs Available", value: 12, icon: <Briefcase />, color: "bg-blue-100 text-blue-600" },
    { title: "JDs Applied", value: 8, icon: <Users />, color: "bg-green-100 text-green-600" },
    { title: "Responses Received", value: 5, icon: <Mail />, color: "bg-purple-100 text-purple-600" },
    { title: "Selections", value: 2, icon: <CheckCircle />, color: "bg-emerald-100 text-emerald-600" },
    { title: "No Response", value: 3, icon: <XCircle />, color: "bg-red-100 text-red-600" },
  ];

  const applications = [
    { jdTitle: "Frontend Developer", applied: 11 },
    { jdTitle: "Backend Developer", applied: 8 },
    { jdTitle: "UI/UX Designer", applied: 10 },
    { jdTitle: "DevOps Engineer", applied: 7 },
    { jdTitle: "Data Analyst", applied: 3 },
  ];

  const pieData = [
    { name: "Selected", value: 2 },
    { name: "Rejected", value: 1 },
    { name: "Pending", value: 5 },
  ];
  const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

  const topSkills = [
    { name: "React.js", level: "Expert", percent: 85 },
    { name: "Node.js", level: "Intermediate", percent: 70 },
    { name: "UI/UX Design", level: "Advanced", percent: 60 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Candidate Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <div className={`p-3 rounded-full ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{s.title}</p>
              <p className="text-xl font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Applications by Job Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jdTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applied" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Application Status</h2>
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Last Month Applications</p>
          <p className="text-2xl font-bold text-blue-600">32</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500">Last Week Applications</p>
          <p className="text-2xl font-bold text-red-600">14</p>
        </div>
      </div>

      {/* Candidate Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <img src="https://via.placeholder.com/80" alt="Candidate" className="mx-auto rounded-full mb-3" />
          <h3 className="font-semibold">Martha Hunt</h3>
          <p className="text-sm text-gray-500">Frontend Developer</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg">Hire Me</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <img src="https://via.placeholder.com/80" alt="Candidate" className="mx-auto rounded-full mb-3" />
          <h3 className="font-semibold">James Anderson</h3>
          <p className="text-sm text-gray-500">UI/UX Designer</p>
          <button className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg">Hire Me</button>
        </div>
      </div>

      {/* Top Skills Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Top Skills</h2>
        <div className="space-y-4">
          {topSkills.map((skill, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{skill.name}</p>
                <p className="text-sm text-gray-500">{skill.level}</p>
              </div>
              <div className="w-40 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
