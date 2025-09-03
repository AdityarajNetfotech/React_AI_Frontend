import React from "react";
import { Briefcase, CheckCircle, XCircle, Mail, Users } from "lucide-react";
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
} from "recharts";

const CandidateDashboard = () => {
    const stats = [
        { title: "Total JDs Available", value: 12, icon: <Briefcase className="text-blue-500" /> },
        { title: "JDs Applied", value: 8, icon: <Users className="text-green-500" /> },
        { title: "Responses Received", value: 5, icon: <Mail className="text-purple-500" /> },
        { title: "Selections", value: 2, icon: <CheckCircle className="text-emerald-500" /> },
        { title: "No Response", value: 3, icon: <XCircle className="text-red-500" /> },
    ];

    const applications = [
        { jdTitle: "Frontend Developer", applied: 11, response: "Yes", status: "Selected" },
        { jdTitle: "Backend Developer", applied: 8, response: "Yes", status: "Rejected" },
        { jdTitle: "UI/UX Designer", applied: 10, response: "No", status: "Pending" },
        { jdTitle: "DevOps Engineer", applied: 7, response: "Yes", status: "Pending" },
        { jdTitle: "Data Analyst", applied: 3, response: "No", status: "Pending" },
    ];

    const pieData = [
        { name: "Selected", value: 2 },
        { name: "Rejected", value: 1 },
        { name: "Pending", value: 5 },
    ];
    const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Candidate Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
                <h2 className="text-lg font-semibold mb-4">Applications by Job Role</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={applications} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="jdTitle" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="applied" fill="#3b82f6" name="Applied" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Application Status Distribution</h2>
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

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Applied Job Details</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[600px]">
                        <thead>
                            <tr className="text-gray-600 border-b">
                                <th className="py-2 px-2">Job Title</th>
                                <th className="py-2 px-2">Applied</th>
                                <th className="py-2 px-2">Response</th>
                                <th className="py-2 px-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((job, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-2">{job.jdTitle}</td>
                                    <td className="py-2 px-2">{job.applied}</td>
                                    <td className="py-2 px-2">{job.response}</td>
                                    <td
                                        className={`py-2 px-2 font-semibold ${job.status === "Selected"
                                                ? "text-green-600"
                                                : job.status === "Rejected"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                            }`}
                                    >
                                        {job.status}
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
