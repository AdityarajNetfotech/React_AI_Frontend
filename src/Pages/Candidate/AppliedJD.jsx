import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/ApiConstants'
import { Briefcase, MapPin, Calendar, DollarSign, GraduationCap, Clock, FileText, CheckCircle, XCircle, AlertCircle, Eye, Code, X } from 'lucide-react'

function AppliedJD() {
    const [appliedJobs, setAppliedJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showJDModal, setShowJDModal] = useState(false)
    const [showSkillsModal, setShowSkillsModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)

    useEffect(() => {
        const fetchAppliedJD = async () => {
            const token = localStorage.getItem("candidateAuthToken")
            try {
                const appliedJD = await axios.get(
                    `${baseUrl}/api/candidate/get-all-applied-jobs`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("appliedRes", appliedJD.data.specificItems);
                setAppliedJobs(appliedJD.data.specificItems || [])
            } catch (error) {
                console.log("error", error);
                setError("Failed to fetch applied jobs")
            } finally {
                setLoading(false)
            }
        }
        fetchAppliedJD()
    }, [])

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
            case 'selected':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-500" />
            case 'pending':
            default:
                return <AlertCircle className="w-5 h-5 text-yellow-500" />
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
            case 'selected':
                return 'bg-green-100 text-green-800'
            case 'rejected':
                return 'bg-red-100 text-red-800'
            case 'pending':
            default:
                return 'bg-yellow-100 text-yellow-800'
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const handleViewJD = (job) => {
        setSelectedJob(job)
        setShowJDModal(true)
    }

    const handleViewSkills = (job) => {
        setSelectedJob(job)
        setShowSkillsModal(true)
    }

    const closeModal = () => {
        setShowJDModal(false)
        setShowSkillsModal(false)
        setSelectedJob(null)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-center">
                    <XCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Applied Job Applications</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Applied</p>
                            <p className="text-2xl font-bold text-gray-800">{appliedJobs.length}</p>
                        </div>
                        <Briefcase className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Accepted</p>
                            <p className="text-2xl font-bold text-green-600">
                                {appliedJobs.filter(job => job.status?.toLowerCase() === 'accepted' || job.status?.toLowerCase() === 'selected').length}
                            </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Rejected</p>
                            <p className="text-2xl font-bold text-red-600">
                                {appliedJobs.filter(job => job.status?.toLowerCase() === 'rejected').length}
                            </p>
                        </div>
                        <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {appliedJobs.filter(job => !job.status || job.status?.toLowerCase() === 'pending').length}
                            </p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Details
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Requirements
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applied Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appliedJobs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No job applications found
                                    </td>
                                </tr>
                            ) : (
                                appliedJobs.map((job, index) => (
                                    <tr key={job.jobId || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {job.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {job.empType} Position
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm text-gray-900">
                                                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                                {job.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <div className="flex items-center text-gray-900">
                                                    <GraduationCap className="w-4 h-4 mr-1 text-gray-400" />
                                                    {job.qualification}
                                                </div>
                                                <div className="flex items-center text-gray-600 mt-1">
                                                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                                    {job.experience} years
                                                </div>
                                                <div className="flex items-center text-gray-600 mt-1">
                                                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                                                    {job.salary} LPA
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                                {formatDate(job.appliedAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(job.status)}
                                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                                                    {job.status || 'Pending'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewJD(job)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View JD
                                                </button>
                                                <button
                                                    onClick={() => handleViewSkills(job)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Code className="w-3 h-3 mr-1" />
                                                    Skills
                                                </button>
                                                {job.resume && (
                                                    <a
                                                        href={job.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        <FileText className="w-3 h-3 mr-1" />
                                                        Resume
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showJDModal && selectedJob && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-xl rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Job Match Summary</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mt-2 max-h-96 overflow-y-auto">
                            {selectedJob.matchSummary ? (
                                <div className="space-y-4">
                                    {selectedJob.matchSummary.split('**').map((section, index) => {
                                        if (section.trim() === '') return null;

                                        if (section.match(/^\d+\./)) {
                                            return (
                                                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                                                    <p className="font-semibold text-gray-800">{section.trim()}</p>
                                                </div>
                                            );
                                        }

                                        if (section.includes('Yes/No') || section.includes('Detailed Explanation')) {
                                            return (
                                                <div key={index} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                                                    <p className="font-semibold text-gray-800">{section.trim()}</p>
                                                </div>
                                            );
                                        }

                                        if (section.startsWith('*')) {
                                            const cleanSection = section.replace(/^\*+/, '').trim();
                                            if (cleanSection) {
                                                return (
                                                    <div key={index} className="ml-4 border-l-2 border-gray-300 pl-4 py-1">
                                                        <p className="text-gray-700">{cleanSection}</p>
                                                    </div>
                                                );
                                            }
                                        }

                                        if (section.trim().length > 0) {
                                            return (
                                                <div key={index} className="py-1">
                                                    <p className="text-gray-700">{section.trim()}</p>
                                                </div>
                                            );
                                        }

                                        return null;
                                    }).filter(Boolean)}
                                </div>
                            ) : (
                                <p className="text-gray-500">No match summary available</p>
                            )}
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={closeModal}
                                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSkillsModal && selectedJob && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-xl rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Required Skills</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-2">
                                {selectedJob.skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={closeModal}
                                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AppliedJD