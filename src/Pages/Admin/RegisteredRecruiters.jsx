import React, { useEffect, useState } from 'react'
import { Users, FileText, Activity, Trash2 } from "lucide-react";
import axios from "axios"
import Pagination from '../../Components/Pagination/Pagination';
import { baseUrl } from '../../utils/ApiConstants';

const RegisteredRecruiters = () => {

    const [recruiters, setRecruiters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);
    const recruitersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${baseUrl}/api/admin/getAllRecruiters`)
                console.log("Recruiters from backend", response.data.recruiters)
                setRecruiters(response.data.recruiters)
            } catch (error) {
                console.log("Error fetching recruiters", error)
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }
        fetchRecruiters();

    }, [])

    const handleDelete = (id) => {
        setOpenModal(true);
        setSelectedRecruiter(id);

    }

    const handleConfirmDelete = async () => {
        setOpenModal(false);

        try {
            const response = await axios.delete(`${baseUrl}/api/admin/deleteRecruiter/${selectedRecruiter}`);
            console.log("Recruiter deleted successfully:", response.data.message);

            const recruiterDelete = recruiters.filter((recruiter) => recruiter._id !== selectedRecruiter);
            setRecruiters(recruiterDelete);
        } catch (error) {
            console.log("Error deleting recruiter:", error);
        }
    };

    const handleModalCancel = () => {
        setOpenModal(false);
        setSelectedRecruiter(null);
    }

    const indexOfLastRecruiter = currentPage * recruitersPerPage;
    const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
    const currentRecruiters = recruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);
    const totalPages = Math.ceil(recruiters.length / recruitersPerPage);

    return (
        <>
            <div className='flex flex-col bg-gray-50 text-gray-800'>

                <div className='flex-1 p-6 transition-all duration-300'>

                    <div className='bg-gray-100 border-l-4 border-blue-700 p-5 rounded-lg shadow-lg mb-6'>
                        <h2 className='text-2xl font-bold text-blue-700 mb-4'>Registered Recruiters</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 max-[377px]:flex-col">
                                <div className="p-3 bg-gray-100 rounded-full">
                                    <Users className="text-blue-500" />
                                </div>
                                <div className='flex gap-3.5 items-center'>
                                    <p className="text-sm text-gray-500">Total Recruiters</p>
                                    <p className="text-xl font-semibold">{recruiters.length}</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 max-[377px]:flex-col">
                                <div className="p-3 bg-gray-100 rounded-full"><Activity className="text-yellow-500" /></div>
                                <div className='flex gap-3.5 items-center'>
                                    <p className="text-sm text-gray-500">Active Recruiters</p>
                                    <p className="text-xl font-semibold">30</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 max-[377px]:flex-col">
                                <div className="p-3 bg-gray-100 rounded-full"><FileText className="text-green-500" /></div>
                                <div className='flex gap-3.5 items-center'>
                                    <p className="text-sm text-gray-500">Total Job Posts</p>
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
                                        <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Contact</th>
                                        <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Company</th>
                                        <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Designation</th>
                                        <th className="px-6 py-3 text-center text-blue-900 text-[15px]">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {currentRecruiters.map((rec, index) => (
                                        <tr
                                            key={index}
                                            className="group border-t hover:bg-white/80 transition duration-200 relative"
                                        >

                                            <td className="px-6 py-4 text-xs text-gray-600 break-all max-w-[180px]">{rec._id || "N/A"}</td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-semibold">
                                                    {rec.name ? rec.name[0].toUpperCase() : "?"}
                                                </div>
                                                {rec.name || "N/A"}
                                            </td>
                                            <td className="px-6 py-3 text-gray-600">{rec.email || "N/A"}</td>
                                            <td className="px-6 py-3 text-gray-600">{rec.number || "N/A"}</td>
                                            <td className="px-6 py-3 text-gray-600">{rec.companyName || "N/A"}</td>
                                            <td className="px-6 py-3 text-gray-600">{rec.designation || "N/A"}</td>
                                            <td className="px-6 py-3 text-center">
                                                <div className="inline-flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete(rec._id)}
                                                        className="px-3 py-1.5 text-xs bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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




                </div >


            </div >
            {openModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full px-8 py-6 text-center transform transition-all duration-300 scale-100 hover:scale-105">
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

                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Confirm Delete
                        </h2>

                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this recruiter?
                        </p>
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
        </>

    )
}

export default RegisteredRecruiters
