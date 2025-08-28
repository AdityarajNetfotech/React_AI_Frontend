import React, { useEffect, useState } from 'react';
import { Users, Activity, X, Building2, User, MapPin, Briefcase, Clock, CircleDollarSign, Wrench, CalendarDays, FileText } from "lucide-react";
import Pagination from '../../Components/Pagination/Pagination';
import axios from 'axios';
import { baseUrl } from '../../utils/ApiConstants';

const AllJDs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const jobsPerPage = 5;

    useEffect(() => {
        const getAllJDs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/admin/getAllJD`);
                console.log("res", res.data);
                setJobs(res.data.Jd || []);
            } catch (error) {
                console.log("error", error);
            }
        };
        getAllJDs();
    }, []);

    const indexOfLast = currentPage * jobsPerPage;
    const indexOfFirst = indexOfLast - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const validCompanies = new Set(
        jobs.map(j => j.company).filter(c => c && c !== "N/A")
    );

    const validRecruiters = new Set(
        jobs.map(j => j.recruiter?.name).filter(r => r && r !== "N/A")
    );

    return (
        <div className="flex flex-col bg-gray-50 text-gray-800">
            <div className="flex-1 p-6 transition-all duration-300">

                <div className='bg-gray-100 border-l-4 border-blue-700 p-5 rounded-lg shadow-lg mb-6'>
                    <h2 className='text-2xl font-bold text-blue-700 mb-4'>All Job Descriptions</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-full"><Users className="text-blue-500" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Total JDs</p>
                                <p className="text-xl font-semibold">{jobs.length}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-full"><Activity className="text-yellow-500" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Companies</p>
                                <p className="text-xl font-semibold">{validCompanies.size}</p>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-full"><FileText className="text-green-500" /></div>
                            <div>
                                <p className="text-sm text-gray-500">Recruiters</p>
                                <p className="text-xl font-semibold">{validRecruiters.size}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
                    <table className="min-w-[1024px] w-full text-sm font-[500] border-2 border-blue-200">
                        <thead className="text-gray-500 text-[13px] bg-blue-50 border-b border-gray-200 tracking-wide uppercase">
                            <tr>
                                <th className="px-6 py-3 text-left text-blue-900 text-[15px]">ID</th>
                                <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Title</th>
                                <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Recruiter</th>
                                <th className="px-6 py-3 text-left text-blue-900 text-[15px]">Company</th>
                                <th className="px-6 py-3 text-center text-blue-900 text-[15px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {currentJobs.map((job, index) => (
                                <tr key={index} className="group border-t hover:bg-white/80 transition duration-200">
                                    <td className="px-6 py-4 text-xs text-gray-600 break-all max-w-[180px]">{job._id}</td>
                                    <td className="px-6 py-4">{job.title}</td>
                                    <td className="px-6 py-3 text-gray-600">{job.recruiter?.name || "N/A"}</td>
                                    <td className="px-6 py-3 text-gray-600">{job.company || "N/A"}</td>
                                    <td className="px-6 py-3 text-center">
                                        <button
                                            onClick={() => { setSelectedJob(job); setOpenModal(true); }}
                                            className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-all"
                                        >
                                            More Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {openModal && selectedJob && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative overflow-hidden animate-fadeIn">

                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                        >
                            <X size={24} />
                        </button>

                        <div className="border-b px-6 py-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <FileText className="text-blue-600" /> {selectedJob.title}
                            </h2>
                        </div>

                        <div className="px-6 py-6 overflow-y-auto max-h-[75vh]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                <p className="flex items-center gap-2">
                                    <Building2 className="text-blue-600" size={16} />
                                    <span className="font-semibold text-gray-800">Company:</span>
                                    {selectedJob.company}
                                </p>
                                <p className="flex items-center gap-2">
                                    <User className="text-green-600" size={16} />
                                    <span className="font-semibold text-gray-800">Recruiter:</span>
                                    {selectedJob.recruiter?.name || "N/A"}
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="text-red-500" size={16} />
                                    <span className="font-semibold text-gray-800">Location:</span>
                                    {selectedJob.location}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Briefcase className="text-yellow-600" size={16} />
                                    <span className="font-semibold text-gray-800">Employment Type:</span> {selectedJob.employmentType}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock className="text-purple-600" size={16} />
                                    <span className="font-semibold text-gray-800">Experience:</span>
                                    {selectedJob.experience}
                                </p>
                                <p className="flex items-center gap-2">
                                    <CircleDollarSign className="text-emerald-600" size={16} />
                                    <span className="font-semibold text-gray-800">Salary Range:</span> {selectedJob.salaryRange}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Wrench className="text-orange-600" size={16} />
                                    <span className="font-semibold text-gray-800">Skills:</span>
                                    {selectedJob.skills?.join(", ")}
                                </p>
                                <p className="flex items-center gap-2">
                                    <CalendarDays className="text-pink-600" size={16} />
                                    <span className="font-semibold text-gray-800">Created At:</span>
                                    {new Date(selectedJob.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <FileText className="text-blue-600" /> Full Job Description
                                </h3>
                                <div className="p-5 bg-gray-50 rounded-xl text-sm text-gray-700 whitespace-pre-line border border-gray-200 shadow-inner max-h-[300px] overflow-y-auto">
                                    {selectedJob.fullJD}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllJDs;
