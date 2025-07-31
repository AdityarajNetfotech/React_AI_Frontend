import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from "axios";
import { Building2, MapPin } from "lucide-react";
import { Briefcase, Clock3, IndianRupee } from "lucide-react";
import { UserRound } from "lucide-react";
import { Sparkles } from "lucide-react";
import { FileText } from "lucide-react";

const JobDetails = () => {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async (req, res) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/getJob/${id}`)
                console.log("Job", response.data.job);
                setJob(response.data.job)
            } catch (error) {
                console.log("Error fetching job", error)
            }
        }
        fetchJob();

    }, [id])

    return (
        <>
            {job && (

                <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-xl border-2 border-blue-300 mt-4">

                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
                        {job.title}
                    </h1>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <UserRound className="w-6 h-6 text-blue-600" />
                            <span>Recruiter Information</span>
                        </h2>
                        <hr className="border-blue-200 mb-6" />


                        <div className="flex items-start gap-2 text-sm text-gray-800">
                            <UserRound className="w-4 h-4 mt-[1px] text-blue-600 shrink-0" />
                            <p className="leading-snug">
                                <span className="text-blue-600 font-semibold uppercase tracking-wide text-sm mr-1">Name:</span>
                                <span className="text-[15px] font-medium text-gray-900">{job.recruiter?.name || "N/A"}</span>
                            </p>
                        </div>
                    </section>
                    <br></br>


                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            <span>Company Information</span>
                        </h2>
                        <hr className="border-blue-200 mb-6" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-base text-gray-800">
                           
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm uppercase tracking-wide">
                                    <Building2 className="w-4 h-4 mt-[1px]" />
                                    <span>Company Name</span>
                                </div>
                                <p className="text-[15px] font-medium text-gray-900 leading-tight">
                                    {job.company || "N/A"}
                                </p>
                            </div>

                          
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs uppercase tracking-wide">
                                    <MapPin className="w-4 h-4 mt-[1px]" />
                                    <span>Location</span>
                                </div>
                                <p className="text-[15px] font-medium text-gray-900 leading-tight">
                                    {job.location || "N/A"}
                                </p>
                            </div>
                        </div>
                    </section>


                    <br></br>


                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                            <span>Job Details</span>
                        </h2>
                        <hr className="border-blue-200 mb-6" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-base text-gray-800">
                           
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm uppercase tracking-wide">
                                    <Briefcase className="w-4 h-4 mt-[1px]" />
                                    <span>Job Type</span>
                                </div>
                                <p className="text-[15px] font-medium text-gray-900 leading-tight">
                                    {job.employmentType || "N/A"}
                                </p>
                            </div>

                           
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm uppercase tracking-wide">
                                    <Clock3 className="w-4 h-4 mt-[1px]" />
                                    <span>Experience</span>
                                </div>
                                <p className="text-[15px] font-medium text-gray-900 leading-tight">
                                    {job.experience || "N/A"} years
                                </p>
                            </div>

                           
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm uppercase tracking-wide">
                                    <IndianRupee className="w-4 h-4 mt-[1px]" />
                                    <span>Salary</span>
                                </div>
                                <p className="text-[15px] font-medium text-gray-900 leading-tight">
                                    {job.salaryRange || "N/A"}
                                </p>
                            </div>
                        </div>
                    </section>
                    <br></br>

                 

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                            <span>Required Skills</span>
                        </h2>
                        <hr className="border-blue-200 mb-6" />

                        <div className="flex flex-wrap gap-3">
                            {job.skills?.length > 0 ? (
                                job.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm border border-blue-200"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-700 text-sm">N/A</p>
                            )}
                        </div>
                    </section>

                    <br></br>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            <span>Full Job Description</span>
                        </h2>
                        <hr className="border-blue-200 mb-6" />

                        <div className="whitespace-pre-line text-[15px] text-gray-800 leading-relaxed">
                            {job.fullJD || "No description provided."}
                        </div>
                    </section>
                </div>

            )}
        </>
    )
}

export default JobDetails
