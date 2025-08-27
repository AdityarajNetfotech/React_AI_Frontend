import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router";
import axios from "axios";
import SkeletonJDCard from "../../Components/Skeletons/SkeletonJDCard";
import Pagination from "../../Components/Pagination/Pagination";

const MyJD = () => {
    const navigate = useNavigate();
    const [jdData, setJdData] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchJDs = async () => {
            try {
                const token = localStorage.getItem("recruiterAuthToken");
                const res = await axios.get("http://localhost:5000/api/jd/get-all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJdData(res.data.jds);
                console.log(res.data.jds);
            } catch (error) {
                toast("Error fetching JDs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJDs();
    }, []);

    const totalClicks = jdData.reduce((sum, jd) => sum + (jd.filteredResumes.length + jd.unfilteredResumes.length), 0);
    const totalFiltered = jdData.reduce((sum, jd) => sum + jd.filteredResumes.length, 0);
    const totalUnfiltered = jdData.reduce((sum, jd) => sum + jd.unfilteredResumes.length, 0);

    // Pagination calculations
    const totalPages = Math.ceil(jdData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = jdData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const openModal = (skills) => {
        setSelectedSkills(skills);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedSkills([]);
        setShowModal(false);
    };

    const handleSelectChange = (e, jd) => {
        const value = e.target.value;
        setSelectedAction((prev) => ({ ...prev, [jd._id]: value }));

        if (value === "delete") {
            handleDelete(jd._id);
        } else if (value === "open") {
            handleViewDetails(jd._id, jd.jobSummary);
        }
    };


    const handleViewDetails = (id, jobSummary) => {
        navigate("/Recruiter-Dashboard/My-Jd/JDDetails", {
            state: { id, jobSummary }
        });
    };



    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this JD?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("recruiterAuthToken");
            await axios.delete(`http://localhost:5000/api/jd/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setJdData(prev => prev.filter(jd => jd._id !== id));
        } catch (error) {
            toast.error("Failed to delete JD!", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Job Descriptions</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Total JD Clicks</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{loading ? "..." : totalClicks}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Filtered Resumes</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">{loading ? "..." : totalFiltered}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Unfiltered Resumes</h3>
                    <p className="text-2xl font-bold text-red-600 mt-1">{loading ? "..." : totalUnfiltered}</p>
                </div>
            </div>

            {/* JD Table */}
            <div className="bg-white rounded-xl shadow border border-gray-100">
                {loading ? (
                    <SkeletonJDCard />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-[1024px] w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 text-left">
                                <tr>
                                    <th className="px-6 py-3">Job ID</th>
                                    <th className="px-6 py-3">Job Title</th>
                                    <th className="px-6 py-3">Created On</th>
                                    <th className="px-6 py-3">Skills</th>
                                    <th className="px-6 py-3">Filtered</th>
                                    <th className="px-6 py-3">Unfiltered</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((jd, index) => (
                                    <tr key={jd._id} className="border-t hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-800">{startIndex + index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{jd.title}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(jd.createdAt).toLocaleDateString("en-IN")}
                                        </td>
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
                                        <td className="px-6 py-4 text-green-600">{jd.filteredResumes.length}</td>
                                        <td className="px-6 py-4 text-red-600">{jd.unfilteredResumes.length}</td>
                                        <td className="py-4 px-6 space-x-3 flex">
                                            <select
                                                value={selectedAction[jd._id] || ""}
                                                onChange={(e) => handleSelectChange(e, jd)}
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
                )}
            </div>

            {/* Pagination Component */}
            {!loading && jdData.length > rowsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

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