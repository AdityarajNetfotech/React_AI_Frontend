import React, { useEffect, useState } from 'react';
import { Users, FileText, Activity, Trash2 } from "lucide-react";
import axios from "axios";
import Pagination from '../../Components/Pagination/Pagination';

const RegisteredApplicants = () => {

    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const applicantsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/api/admin/getAllApplicants");
                console.log("Applicants:", res.data.Candidates);
                setApplicants(res.data.Candidates);
            } catch (err) {
                console.error("Error fetching applicants", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, []);

    const handleDelete = (id) => {
        setOpenModal(true);
        setSelectedApplicant(id);
    };

   const handleConfirmDelete = async () => {
        setOpenModal(false);

        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/deleteApplicant/${selectedApplicant}`);
            console.log("Applicant deleted successfully:", response.data.message);
            alert("Applicant Deleted Successfully!!")

            const updated = applicants.filter((app) => app._id !== selectedApplicant);
            setApplicants(updated);
        } catch (error) {
            console.log("Error deleting applicant:", error);
        }
    }

    const handleModalCancel = () => {
        setOpenModal(false);
        setSelectedApplicant(null);
    };

    const indexOfLast = currentPage * applicantsPerPage;
    const indexOfFirst = indexOfLast - applicantsPerPage;
    const currentApplicants = applicants.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(applicants.length / applicantsPerPage);

    return (
        <div className="flex flex-col bg-gray-50 text-gray-800">
            <div className="flex-1 p-6 transition-all duration-300">

                <div className='bg-gray-100 border-l-4 border-blue-700 p-5 rounded-lg shadow-lg mb-6'>
                    <h2 className='text-2xl font-bold text-blue-700 mb-4'>Registered Applicants</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-full"><Users className="text-blue-500" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Total Applicants</p>
                                <p className="text-xl font-semibold">{applicants.length}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-full"><Activity className="text-yellow-500" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Active Applicants</p>
                                <p className="text-xl font-semibold">30</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-full"><FileText className="text-green-500" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Total Applications</p>
                                <p className="text-xl font-semibold">45</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 mt-4">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500 mt-4">{error}</p>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
                        <table className="min-w-[1024px] w-full text-sm font-[500] border-2 border-blue-200">
                            <thead className="text-gray-500 text-[13px] bg-blue-50 border-b border-gray-200 tracking-wide uppercase">
                                <tr>
                                    <th className="px-6 py-3 text-left text-blue-900 text-[15px]">ID</th>
                                    <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Name</th>
                                    <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Email</th>
                                    <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Score</th>
                                    <th className="px-6 py-3 text-center text-blue-900 text-[15px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentApplicants.map((app, index) => (
                                    <tr key={index} className="group border-t hover:bg-white/80 transition duration-200">
                                        <td className="px-6 py-4 text-xs text-gray-600 break-all max-w-[180px]">{app._id}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-semibold">
                                                {app.name ? app.name[0].toUpperCase() : "?"}
                                            </div>
                                            {app.name || "N/A"}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">{app.email || "N/A"}</td>
                                        <td className="px-6 py-3 text-gray-600">{app.score || "N/A"}</td>
                                        <td className="px-6 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(app._id)}
                                                className="px-3 py-1.5 text-xs bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

            </div>

            {openModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full px-8 py-6 text-center">
                        <div className="flex justify-center mb-4">
                            <svg
                                className="w-12 h-12 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Delete</h2>
                        <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this applicant?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleConfirmDelete}
                                className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleModalCancel}
                                className="px-5 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisteredApplicants;
