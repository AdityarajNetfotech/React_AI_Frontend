import React, { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import axios from 'axios';

const MyResult = () => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [backendData, setBackendData] = useState([]);

    const getCandidatesData = async()=>{
        setLoading(true)
        try {
             const response = await axios.get("https://kshitij-11.onrender.com/result");
        if(response.status === 200){
            console.log("candidate_Response----->",response.data)
            setAllData(response.data)
        }
            
        } catch (error) {
            console.error("something went wrong",error)
        }finally{
             setLoading(false);
        }
       
    }
    
    
    useEffect(() => {
        // const backendData = [
        //     {
        //         "candidates": [
        //             {
        //                 "candidate_id": "candidate_101",
        //                 "candidate_name": "Priya Sharma",
        //                 "cheating_insights": {
        //                     "cheating_probability": "Low",
        //                     "copy_paste_events": 0,
        //                     "inactivity_warnings": 1,
        //                     "tab_switches": 2
        //                 },
        //                 "email": "priya.sharma@example.com",
        //                 "feedback": "The candidate's performance was evaluated with a final score of 8.8.\nThe candidate performed exceptionally well in the test.\nThe candidate was honest and did not cheat during the assessment.\n",
        //                 "score": 8.8,
        //                 "test_summary": {
        //                     "duration_minutes": 45,
        //                     "end_time": "2025-07-23T10:45:00Z",
        //                     "max_score": 10,
        //                     "start_time": "2025-07-23T10:00:00Z",
        //                     "test_id": "test_abc_123",
        //                     "total_score": 8.8
        //                 }
        //             },
        //             {
        //                 "candidate_id": "candidate_102",
        //                 "candidate_name": "John Doe",
        //                 "cheating_insights": {
        //                     "cheating_probability": "Medium",
        //                     "copy_paste_events": 0,
        //                     "inactivity_warnings": 2,
        //                     "tab_switches": 3
        //                 },
        //                 "email": "john.doe@example.com",
        //                 "feedback": "The candidate's performance was evaluated with a final score of 7.5.\nThe candidate performed moderately well in the test.\nThere were concerns regarding cheating during the assessment.\n",
        //                 "score": 7.5,
        //                 "test_summary": {
        //                     "duration_minutes": 45,
        //                     "end_time": "2025-07-23T11:45:00Z",
        //                     "max_score": 10,
        //                     "start_time": "2025-07-23T11:00:00Z",
        //                     "test_id": "test_abc_124",
        //                     "total_score": 7.5
        //                 }
        //             }
        //         ],
        //         "job_id": "job_1",
        //         "job_title": "Frontend Developer"
        //     },
        //     {
        //         "candidates": [
        //             {
        //                 "candidate_id": "candidate_103",
        //                 "candidate_name": "Alice Smith",
        //                 "cheating_insights": {
        //                     "cheating_probability": "Low",
        //                     "copy_paste_events": 0,
        //                     "inactivity_warnings": 0,
        //                     "tab_switches": 1
        //                 },
        //                 "email": "alice.smith@example.com",
        //                 "feedback": "The candidate's performance was evaluated with a final score of 9.2.\nThe candidate performed exceptionally well in the test.\nThe candidate was honest and did not cheat during the assessment.\n",
        //                 "score": 9.2,
        //                 "test_summary": {
        //                     "duration_minutes": 45,
        //                     "end_time": "2025-07-24T10:45:00Z",
        //                     "max_score": 10,
        //                     "start_time": "2025-07-24T10:00:00Z",
        //                     "test_id": "test_xyz_123",
        //                     "total_score": 9.2
        //                 }
        //             }
        //         ],
        //         "job_id": "job_2",
        //         "job_title": "Backend Developer"
        //     },
        //     {
        //         "candidates": [],
        //         "job_id": "job_3",
        //         "job_title": "Full Stack Engineer"
        //     },
        //     {
        //         "candidates": [],
        //         "job_id": "job_4",
        //         "job_title": "React JS Developer"
        //     },
        //     {
        //         "candidates": [],
        //         "job_id": "job_5",
        //         "job_title": "Node.js API Developer"
        //     }
        // ];
        getCandidatesData()
        // setAllData(backendData);
       
    }, []);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedJobCandidates, setSelectedJobCandidates] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState("");
    const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = allData.slice(startIndex, startIndex + itemsPerPage);

    const totalCandidates = allData.reduce((sum, job) => sum + job.candidates?.length || 0, 0);

    const handleActionChange = (e, job) => {
        const action = e.target.value;
        if (action === "open") {
            if (job.candidates && job.candidates.length > 0) {
                setSelectedJobCandidates(job.candidates);
                setSelectedJobTitle(job.jobTitle);
                setCurrentCandidateIndex(0);
                setIsPopupOpen(true);
            } else {
                alert("No result data available for this test");
            }
        } else if (action === "delete") {
            alert(`Delete functionality for ${job.jobTitle}`);
        }
        e.target.value = "";
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedJobCandidates(null);
        setSelectedJobTitle("");
        setCurrentCandidateIndex(0);
    };

    const handleNextCandidate = () => {
        if (currentCandidateIndex < selectedJobCandidates.length - 1) {
            setCurrentCandidateIndex(currentCandidateIndex + 1);
        }
    };

    const handlePreviousCandidate = () => {
        if (currentCandidateIndex > 0) {
            setCurrentCandidateIndex(currentCandidateIndex - 1);
        }
    };

    const getCheatRiskColor = (probability) => {
        switch (probability?.toLowerCase()) {
            case 'low':
            case 'very low':
                return 'text-green-600';
            case 'medium':
                return 'text-yellow-600';
            case 'high':
            case 'very high':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const currentCandidate = selectedJobCandidates?.[currentCandidateIndex];

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto mt-10 px-4 text-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📁 My Result</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Total Jobs</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{allData.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <h3 className="text-sm text-gray-500">Total Candidates</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">{totalCandidates}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-50 text-gray-700 text-left">
                        <tr>
                            <th className="px-6 py-3">S.No</th>
                            <th className="px-6 py-3">Job ID</th>
                            <th className="px-6 py-3">Job Title</th>
                            <th className="px-6 py-3">Total Candidates</th>
                            <th className="px-6 py-3">Test Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((job, index) => (
                            <tr key={job.jobId} className="border-t hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {startIndex + index + 1}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{job.jobId}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">{job.jobTitle}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className={`${job.candidates?.length > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'} px-2 py-1 rounded-full text-xs font-medium`}>
                                        {job.candidates?.length || 0} Candidates
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {job.candidates?.[0]?.test_summary?.start_time 
                                        ? new Date(job.candidates[0].test_summary.start_time).toLocaleDateString("en-IN")
                                        : "N/A"}
                                </td>
                                <td className="py-4 px-6 space-x-3 flex">
                                    <select
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 cursor-pointer"
                                        onChange={(e) => handleActionChange(e, job)}
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

            {isPopupOpen && currentCandidate && (
                <>
                    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"
                        onClick={closePopup} />

                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
                            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{selectedJobTitle}</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Candidate {currentCandidateIndex + 1} of {selectedJobCandidates.length}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closePopup}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {/* <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                    <div className={`text-4xl font-bold ${getScoreColor(currentCandidate.score)}`}>
                                        Score: {currentCandidate.score}/{currentCandidate.test_summary.max_score}
                                    </div>
                                </div> */}

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-700 mb-3">Candidate Information</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">ID:</span>
                                                <span className="ml-2 font-medium">{currentCandidate.ID}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Name:</span>
                                                <span className="ml-2 font-medium">{currentCandidate.name}</span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-gray-500">Email:</span>
                                                <span className="ml-2 font-medium">{currentCandidate.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-700 mb-3">Test Summary</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Test ID:</span>
                                                <span className="ml-2 font-medium">{currentCandidate.testId}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Evaluated at</span>
                                                <span className="ml-2 font-medium">{currentCandidate.evaluated_at} </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Max Score</span>
                                                <span className="ml-2 font-medium">{currentCandidate.maxScore} </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Score</span>
                                                <span className="ml-2 font-medium">{currentCandidate.score}</span>
                                            </div>
                                             <div>
                                                <span className="text-gray-500">Status</span>
                                                <span className="ml-2 font-medium">{currentCandidate.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-700 mb-3">Cheating Insights</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500 block">Risk Level</span>
                                                {/* <span className={`font-semibold ${getCheatRiskColor(currentCandidate.cheating_insights.cheating_probability)}`}>
                                                    {currentCandidate.cheating_insights.cheating_probability}
                                                </span> */}
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block">Copy/Paste</span>
                                                <span className="font-semibold">{currentCandidate.pastes}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block">Tab Switches</span>
                                                {/* <span className="font-semibold">{currentCandidate.cheating_insights.tab_switches}</span> */}
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block">Inactivity</span>
                                                {/* <span className="font-semibold">{currentCandidate.cheating_insights.inactivity_warnings}</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3">Feedback</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{currentCandidate.status}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={handlePreviousCandidate}
                                        disabled={currentCandidateIndex === 0}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition
                                            ${currentCandidateIndex === 0
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </button>

                                    <div className="flex gap-2">
                                        {selectedJobCandidates.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentCandidateIndex(index)}
                                                className={`w-8 h-8 rounded-full text-sm font-medium transition
                                                    ${index === currentCandidateIndex
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleNextCandidate}
                                        disabled={currentCandidateIndex === selectedJobCandidates.length - 1}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition
                                            ${currentCandidateIndex === selectedJobCandidates.length - 1
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        Next
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyResult;