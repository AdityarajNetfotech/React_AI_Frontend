import React, { useState } from "react";
import { X } from "lucide-react";

const jdData = [
    {
        title: "Frontend Developer",
        totalClicks: 154,
        filtered: 23,
        unfiltered: 47,
        status: "Open",
        createdOn: "2025-07-15",
        skills: ["React", "Tailwind", "JavaScript"],
    },
    {
        title: "Backend Engineer",
        totalClicks: 92,
        filtered: 12,
        unfiltered: 28,
        status: "Closed",
        createdOn: "2025-06-20",
        skills: ["Node.js", "Express", "MongoDB"],
    },
    {
        title: "UI/UX Designer",
        totalClicks: 67,
        filtered: 15,
        unfiltered: 20,
        status: "Open",
        createdOn: "2025-07-10",
        skills: ["Figma", "Sketch", "Adobe XD"],
    },
];

const MyJD = () => {
    const totalClicks = jdData.reduce((sum, jd) => sum + jd.totalClicks, 0);
    const totalFiltered = jdData.reduce((sum, jd) => sum + jd.filtered, 0);
    const totalUnfiltered = jdData.reduce((sum, jd) => sum + jd.unfiltered, 0);

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = (skills) => {
        setSelectedSkills(skills);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedSkills([]);
        setShowModal(false);
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📁 My Job Descriptions</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Total JD Clicks</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{totalClicks}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Filtered Resumes</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">{totalFiltered}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Unfiltered Resumes</h3>
                    <p className="text-2xl font-bold text-red-600 mt-1">{totalUnfiltered}</p>
                </div>
            </div>

            {/* JD Table */}
            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-50 text-gray-700 text-left">
                        <tr>
                            <th className="px-6 py-3">Job Title</th>
                            <th className="px-6 py-3">Created On</th>
                            <th className="px-6 py-3">Skills</th>
                            <th className="px-6 py-3">Total Clicks</th>
                            <th className="px-6 py-3">Filtered</th>
                            <th className="px-6 py-3">Unfiltered</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jdData.map((jd, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">{jd.title}</td>
                                <td className="px-6 py-4 text-gray-600">{jd.createdOn}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openModal(jd.skills)}
                                        className="inline-flex items-center gap-1 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200"
                                    >
                                        View Skills
                                        <span className="text-xs font-semibold text-indigo-500">
                                            ({jd.skills.length})
                                        </span>
                                    </button>
                                </td>

                                <td className="px-6 py-4 text-blue-600 font-semibold">{jd.totalClicks}</td>
                                <td className="px-6 py-4 text-green-600">{jd.filtered}</td>
                                <td className="px-6 py-4 text-red-600">{jd.unfiltered}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${jd.status === "Open"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {jd.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Skills */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex justify-center items-center">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Required Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {selectedSkills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default MyJD;
