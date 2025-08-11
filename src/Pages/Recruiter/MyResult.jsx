import React, { useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";

const MyResult = () => {
    const allData = [
        { id: 1, title: "Frontend Developer", createdAt: "2025-08-01" },
        { id: 2, title: "Backend Developer", createdAt: "2025-08-02" },
        { id: 3, title: "Full Stack Engineer", createdAt: "2025-08-03" },
        { id: 4, title: "React JS Developer", createdAt: "2025-08-04" },
        { id: 5, title: "Node.js API Developer", createdAt: "2025-08-05" },
        { id: 6, title: "UI/UX Designer", createdAt: "2025-08-06" },
        { id: 7, title: "Data Analyst", createdAt: "2025-08-07" },
        { id: 8, title: "QA Automation Engineer", createdAt: "2025-08-08" },
    ];

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = allData.slice(startIndex, startIndex + itemsPerPage);

    const totalClicks = 265;

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📁 My Result</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Total JD Clicks</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{totalClicks}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-50 text-gray-700 text-left">
                        <tr>
                            <th className="px-6 py-3">Job ID</th>
                            <th className="px-6 py-3">Job Title</th>
                            <th className="px-6 py-3">Created On</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((jd, index) => (
                            <tr key={jd.id} className="border-t hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {startIndex + index + 1}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-800">{jd.title}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(jd.createdAt).toLocaleDateString("en-IN")}
                                </td>
                                <td className="py-4 px-6 space-x-3 flex">
                                    <select
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
                                    >
                                        <option value="">Choose</option>
                                        <option value="open">Open</option>
                                        <option value="delete">Delete</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                    if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                    }
                }}
            />
        </div>
    );
};

export default MyResult;
