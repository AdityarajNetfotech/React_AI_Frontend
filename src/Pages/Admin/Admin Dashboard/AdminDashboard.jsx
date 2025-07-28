import React from "react";
import {
  UserPlus,
  ClipboardList,
  Users,
  CheckCircle,
  FileText,
  UserCheck,
} from "lucide-react";

const stats = [
  {
    label: "All Recruiters",
    value: 25,
    icon: <UserPlus className="h-6 w-6 text-indigo-600" />,
  },
  {
    label: "All JDs",
    value: 40,
    icon: <ClipboardList className="h-6 w-6 text-green-600" />,
  },
  {
    label: "Applied Candidates",
    value: 132,
    icon: <Users className="h-6 w-6 text-yellow-600" />,
  },
  {
    label: "Selected Candidates",
    value: 47,
    icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
  },
  {
    label: "Result List",
    value: 20,
    icon: <FileText className="h-6 w-6 text-purple-600" />,
  },
  {
    label: "Active Users",
    value: 150,
    icon: <UserCheck className="h-6 w-6 text-pink-600" />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
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
    </div>
  );
};

export default AdminDashboard;
