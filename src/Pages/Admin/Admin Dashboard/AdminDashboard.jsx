import React, { useEffect, useState } from "react";
import {
  UserPlus,
  ClipboardList,
  Users,
  CheckCircle,
  FileText,
  UserCheck,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { baseUrl } from "../../../utils/ApiConstants";



const pieData = [
  { name: "Selected", value: 47 },
  { name: "Rejected", value: 85 },
];

const scatterData = [
  { x: 10, y: 30 },
  { x: 20, y: 50 },
  { x: 30, y: 40 },
  { x: 40, y: 80 },
  { x: 50, y: 70 },
];

const COLORS = ["#34D399", "#EF4444"];

const AdminDashboard = () => {
  const [recruiters, setRecruiters] = React.useState([]);
  const [jds, setJDs] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [monthlyRecruiterData, setMonthlyRecruiterData] = React.useState([]);
  const [statsBackend, setStatsBackend] = useState({})

  const stats = [
    {
      label: "All Recruiters",
      value: statsBackend.Recruiter_count,
      icon: <UserPlus className="h-6 w-6 text-indigo-600" />,
    },
    {
      label: "All JDs",
      value: statsBackend.countJd,
      icon: <ClipboardList className="h-6 w-6 text-green-600" />,
    },
    {
      label: "Total Candidates",
      value: statsBackend.Candidate_count,
      icon: <Users className="h-6 w-6 text-yellow-600" />,
    },
  ];


  useEffect(() => {
    const getAllRecruiter = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/admin/getAllRecruiters`);
        console.log("data", res.data);

        setRecruiters(res.data.recruiters || []);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllRecruiter();
  }, []);

  useEffect(() => {
    const fetchJDs = async () => {
      try {
        const token = localStorage.getItem("recruiterAuthToken");
        const res = await axios.get(`${baseUrl}/api/jd/get-all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("jd", res.data);

        setJDs(res.data.jds || []);
      } catch (error) {
        console.log("Error fetching JDs:", error);
      }
    };
    fetchJDs();
  }, []);

  useEffect(() => {
    if (recruiters.length && jds.length) {
      const recruiterJDCount = recruiters.map(rec => {
        const jdCount = jds.filter(
          jd => jd.recruiter && jd.recruiter._id === rec._id
        ).length;
        return {
          name: rec.name,
          Recruiters: 1,
          JDs: jdCount,
        };
      });
      setChartData(recruiterJDCount);
    }
  }, [recruiters, jds]);

  useEffect(() => {
    if (recruiters.length) {
      const monthCount = {};

      recruiters.forEach((rec) => {
        const date = new Date(rec.createdAt);
        const monthYear = date.toLocaleString("default", { month: "short", year: "numeric" });
        monthCount[monthYear] = (monthCount[monthYear] || 0) + 1;
      });

      const monthData = Object.keys(monthCount)
        .map(monthYear => ({
          month: monthYear,
          Recruiters: monthCount[monthYear],
        }))
        .sort((a, b) => {
          const dateA = new Date(a.month);
          const dateB = new Date(b.month);
          return dateA - dateB;
        });

      setMonthlyRecruiterData(monthData);
    }
  }, [recruiters]);

  const getStatsFromBackend = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/admin/getAlldata`);
      if (response.status === 200) {
        setStatsBackend(response.data)
      }
    } catch (error) {
      console.error("something went wrong", error);

    }
  }

  console.log("stats----->", statsBackend);


  useEffect(() => {
    getStatsFromBackend()
  }, [])



  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4"
          >
            <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recruiters & JDs</h2>
        <div className="overflow-x-auto md:overflow-x-visible"> 
          <div className="min-w-[800px] md:min-w-0"> 
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Recruiters" fill="#6366f1" />
                <Bar dataKey="JDs" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recruiter Growth Trend</h2>
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="min-w-[800px] md:min-w-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRecruiterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Recruiters"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


      {/* Scatter Chart */}

    </div>
  );
};

export default AdminDashboard;
