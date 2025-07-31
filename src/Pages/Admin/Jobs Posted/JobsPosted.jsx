import React, { useEffect, useState } from 'react'
import { Users, FileText, Activity, Trash2 } from "lucide-react";
import Pagination from '../../../Components/Pagination/Pagination';
import PrimaryIcon from "../../../Components/Images/PrimaryIcon.png";
import axios from 'axios';
import { useNavigate } from 'react-router';

const JobsPosted = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedJd, setSelectedJd] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const indexOfLastJob = jobsPerPage * currentPage;
    const indexofFirstjob = indexOfLastJob - jobsPerPage;
    const totalPages = Math.ceil(jobs.length / jobsPerPage);
    const currentJobs = jobs.slice(indexofFirstjob, indexOfLastJob);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllJD = async (req, res) => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/admin/getAllJD");
                console.log("JD", response.data.Jd)
                setJobs(response.data.Jd);
            } catch (error) {
                setError(error.message);
                console.log("Error fetching Jd", error);
            } finally {
                setLoading(false)
            }
        }
        fetchAllJD();

    }, [])

    const handleDelete = (id) => {
        setOpenModal(true);
        setSelectedJd(id);
    }

    const handleConfirmDelete = () => {
        setOpenModal(false);
        const deleteJob = jobs.filter((job) => job._id !== selectedJd);
        setJobs(deleteJob);
    }

    const handleModalCancel = () => {
        setOpenModal(false);
        setSelectedJd(null);
    }

    const handleView = (id) => {
        navigate(`/admin/JobDetails/${id}`);
    }

    return (
        <>
            <div className='flex flex-col bg-gray-50 text-gray-800'>

                <div className='flex-1 p-6 transition-all duration-300'>

                    <div className='bg-gray-100 border-l-4 border-blue-700 p-5 rounded-lg shadow-lg mb-6'>
                        <h2 className='text-2xl font-bold text-blue-700 mb-4'>Jobs Posted</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-full"><Users className="text-blue-500" /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Recruiters</p>
                                    <p className="text-xl font-semibold">23</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-full"><Activity className="text-yellow-500" /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Active Recruiters</p>
                                    <p className="text-xl font-semibold">30</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-full"><FileText className="text-green-500" /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Job Posts</p>
                                    <p className="text-xl font-semibold">{jobs.length}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {loading ? (
                        <p className='text-center text-gray-500 mt-4'>Loading...</p>
                    ) : error ? (
                        <p className='text-center text-gray-500 mt-4'>{error}</p>
                    ) : (
                        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto'>
                            <table className='min-w-[1024px] w-full text-sm font-[500] border-2 border-blue-200'>
                                <thead className='text-gray-500 text-[13px] bg-blue-50 border-b border-gray-200'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>ID</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>TITLE</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>COMPANY</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>RECRUITER</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>LOCATION</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>EXPERIENCE</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>TYPE</th>
                                        <th className='px-6 py-3 text-left text-blue-900 text-[15px]'>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {currentJobs.map((job, index) => (
                                        <tr key={index} className="group border-t hover:bg-white/80 transition duration-200 relative">
                                            <td className='px-6 py-4 text-xs text-gray-600 break-all max-w-[180px]'>{job._id}</td>
                                            <td className='px-6 py-3 text-gray-600'>{job.title || "N/A"}</td>
                                            <td className='px-6 py-3 text-gray-600'>{job.company || "N/A"}</td>
                                            <td className='px-6 py-3 text-gray-600'>{job.recruiter?.name || "N/A"}</td>
                                            <td className='px-6 py-3 text-gray-600'>{job.location || "N/A"}</td>
                                            <td className='px-6 py-3 text-gray-600'>{job.experience || "N/A"} Yrs</td>
                                            <td className='px-6 py-3 text-gray-600'>{job.employmentType || "N/A"}</td>
                                            <td className='px-6 py-3'>
                                                <div className='flex gap-2'>
                                                    <button
                                                    onClick={() => handleView(job._id)}
                                                        className="text-gray-600 hover:text-gray-800 transition"
                                                    >
                                                        <img src={PrimaryIcon} alt='view' className='w-7 h-7' />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(job._id)}
                                                        className='text-red-500'>
                                                        🗑️
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
            {
                openModal && (
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
                                Are you sure you want to delete this Job Post?
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
                )
            }
        </>
    )
}

export default JobsPosted
