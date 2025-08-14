import React, { useState, useEffect, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import toast from "react-hot-toast";
import defaultResumeImg from '../../../Components/Images/resume1.png';
import { useLocation, useParams } from 'react-router'
import Sidebar from '../Sidebar';
import Pagination from '../../../Components/Pagination/Pagination';
import ResumeModal from './ResumeModal';
import axios from "axios";
import SpinLoader from '../../../Components/SpinLoader/SpinLoader';
import { useNavigate } from "react-router-dom";

const JDDetails = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const { id } = location.state || {};
    

    const [activeTab, setActiveTab] = useState("filtered");
    const [resumes, setResumes] = useState([]);
    const fileInputRef = useRef(null);
    const resumePerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResume, setSelectedResume] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [filteredResumes, setFilteredResumes] = useState([]);
    const [unfilteredResumes, setUnfilteredResumes] = useState([]);
    const [filterLoader, setFilterLoader] = useState(false);



    // const filteredResumes = [
    //     {
    //         name: "Aarav Mehta",
    //         email: "aarav.mehta@gmail.com",
    //         skills: "React, Node.js, MongoDB",
    //         experience: "2 years",
    //         fileName: "aarav_resume.pdf",
    //         matchPercentage: 88,
    //         goodFit: "Yes",
    //         keyMatchingSkills: ["React", "Node.js", "MongoDB"],
    //         reasoning: "Candidate has strong experience in full-stack projects using MERN stack.",
    //     },
    //     {
    //         name: "Isha Verma",
    //         email: "isha.verma@outlook.com",
    //         skills: "Java, Spring Boot, MySQL",
    //         experience: "3 years",
    //         fileName: "isha_resume.pdf",
    //         matchPercentage: 72,
    //         goodFit: "Yes",
    //         keyMatchingSkills: ["HTML", "CSS", "JavaScript"],
    //         reasoning: "Has strong frontend skills, aligns with UI/UX requirements of the job.",
    //     },
    //     {
    //         name: "Rohan Kapoor",
    //         email: "rohan.kapoor@example.com",
    //         skills: "Python, Django, PostgreSQL",
    //         experience: "1.5 years",
    //         fileName: "rohan_resume.pdf",
    //         matchPercentage: 72,
    //         goodFit: "Yes",
    //         keyMatchingSkills: ["HTML", "CSS", "JavaScript"],
    //         reasoning: "Has strong frontend skills, aligns with UI/UX requirements of the job.",
    //     },
    // ];

    // const unfilteredResumes = [
    //     {
    //         name: "Sneha Joshi",
    //         email: "sneha.joshi@gmail.com",
    //         skills: "HTML, CSS, Bootstrap",
    //         experience: "1 year",
    //         fileName: "sneha_resume.pdf",
    //         matchPercentage: 42,
    //         goodFit: "No",
    //         keyMatchingSkills: ["Excel"],
    //         reasoning: "Doesn't match tech stack or role expectations.",
    //     },
    //     {
    //         name: "Vikram Rao",
    //         email: "vikram.rao@yahoo.com",
    //         skills: "C++, Data Structures, Algorithms",
    //         experience: "Fresher",
    //         fileName: "vikram_resume.pdf",
    //         matchPercentage: 42,
    //         goodFit: "No",
    //         keyMatchingSkills: ["Excel"],
    //         reasoning: "Doesn't match tech stack or role expectations.",
    //     },
    //     {
    //         name: "Anjali Nair",
    //         email: "anjali.nair@protonmail.com",
    //         skills: "PHP, Laravel, MySQL",
    //         experience: "2 years",
    //         fileName: "anjali_resume.pdf",
    //         matchPercentage: 42,
    //         goodFit: "No",
    //         keyMatchingSkills: ["Excel"],
    //         reasoning: "Doesn't match tech stack or role expectations.",
    //     },
    // ];

    useEffect(() => {
        const fetchResumes = async (jdId) => {
            try {
                const token = localStorage.getItem("recruiterAuthToken");
                const res = await axios.get(`http://localhost:5000/api/jd/resumes/${jdId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { filtered, unfiltered } = res.data;
                setFilteredResumes(filtered);
                setUnfilteredResumes(unfiltered);
            } catch (err) {
                toast.error("Error fetching resumes:", err.response?.data?.message || err.message);
            }
        };

        if (id) {
            fetchResumes(id);
        }
    }, [id]);


    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleResumeUpload = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 20) {
            alert("You can only upload a maximum of 20 resumes at a time.")
            return;
        }

        const allowedTypes = ['application/pdf']

        const validFiles = files.filter(file => allowedTypes.includes(file.type));

        if (validFiles.length < files.length) {
            alert("Some files were not valid. Only PDF, DOC, and DOCX are allowed.");
        }

        setResumes((prev) => [...prev, ...validFiles]);

    }

    const handleOpenModal = (resume) => {
        if (resume) {
            console.log("Resume", resume)
            setSelectedResume(resume);
            setOpenModal(true);
        } else {
            alert("No resume selected");
        }

    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedResume(null);
    }

    const handleFilterResume = async () => {
        if (resumes.length === 0) {
            toast.error("📄 Please upload at least one resume.");
            return;
        }

        const formData = new FormData();
        formData.append("jdId", id);
        formData.append("jdText", "Paste the JD text here or fetch from backend");

        resumes.forEach((resume) => {
            formData.append("resumes", resume);
        });
         
        setFilterLoader(true);

        try {
            const token = localStorage.getItem("recruiterAuthToken");

            const res = await axios.post(
                "http://localhost:5000/api/jd/filter",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const data = res.data;
            // console.log("Filtered Data:", data);

            // Save dynamic resumes to state
            setFilteredResumes(data.filtered || []);
            setUnfilteredResumes(data.unfiltered || []);

            setResumes([]);
            setActiveTab("filtered");

            toast.success(`✅ Resumes Filtered!
        🎯 Filtered: ${data.filtered.length}
        📂 Unfiltered: ${data.unfiltered.length}`);

        } catch (err) {
            console.error(err);
            toast.error("❌ Something went wrong during filtering.");
        }finally{
            setFilterLoader(false)
        }
    };


    const indexOfLastResume = currentPage * resumePerPage;
    const indexOfFirstResume = indexOfLastResume - resumePerPage;
    const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);
    const totalPages = Math.ceil(resumes.length / resumePerPage);


    return (
        <>

            <main className="flex-1 p-6 transition-all duration-300">


                <div className="bg-gray-100 border-l-4 border-blue-700 p-5 rounded-lg shadow mb-6">
                    <h2 className="text-2xl font-bold text-blue-700 mb-1">JD Details Page</h2>
                    <p className="text-sm text-gray-600">Upload, view, and manage resumes for this job listing.</p>
                </div>


                <div className="grid md:grid-cols-2 gap-6 mb-6">


                    <div className="bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg font-semibold text-blue-700 mb-4">Upload Resume</h3>
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <FaUpload />
                            Upload Resume
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            className="hidden"
                            hidden
                        />



                        <p className="text-gray-600 mt-5"> <i>You can only upload 20 resumes at a time!</i></p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-full">
                        {currentResumes.length === 0 ? (
                            <>
                                <img
                                    src={defaultResumeImg}
                                    alt="No Resume"
                                    className="w-40 h-40 object-contain mb-4"
                                />
                                <p className="text-gray-600">No resumes selected</p>

                            </>
                        ) : (
                            <div className="w-full">
                                <h2 className="text-lg font-bold mb-4 text-left">Uploaded Resumes</h2>
                                <ul className="divide-y">
                                    {currentResumes.map((file, index) => (
                                        <li key={index} className="py-2 flex justify-between items-center">
                                            <div className="text-left">
                                                <p className="font-medium text-gray-800">{file.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage} />
                            </div>
                        )}
                        <button
                            className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleFilterResume}
                        >
                            Filter Resume {filterLoader && <SpinLoader/> }
                        </button>

                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow">
                    <div className="flex space-x-4 mb-4 border-b border-gray-300">
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === "filtered" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("filtered")}
                        >
                            Filtered Resumes
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === "unfiltered" ? "text-blue-700 border-b-2 border-blue-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("unfiltered")}
                        >
                            Unfiltered Resumes
                        </button>
                    </div>

                    {activeTab === "filtered" ? (
                        filteredResumes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <img src={defaultResumeImg} alt="No Resume" className="w-28 h-28 object-contain mb-4" />
                                <p className="text-gray-600">No filtered resumes available</p>
                            </div>
                        ) : (
                            <table className="min-w-full text-sm text-gray-700">
                                <thead className="bg-gray-200 text-gray-700">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Candidate Name</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Email</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Skills</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Match %</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResumes.map((resume, index) => (
                                        <tr
                                            key={index}
                                            className={`transition duration-200 ease-in-out hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                        >
                                            <td className="py-4 px-6 font-medium">
                                                <div>{resume.fileName || "Unnamed File"}</div>
                                                <div className="text-xs text-gray-500">{resume.name || "No name provided"}</div>
                                            </td>
                                            <td className="py-4 px-6">{resume.email || "N/A"}</td>
                                            <td className="py-4 px-6">
                                                {Array.isArray(resume.skills) && resume.skills.length > 0
                                                    ? resume.skills.join(", ")
                                                    : "N/A"}
                                            </td>
                                            <td className="py-4 px-6">{resume.matchPercentage ? `${resume.matchPercentage}%` : "N/A"}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleOpenModal(resume)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    ) : (
                        unfilteredResumes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <img src={defaultResumeImg} alt="No Resume" className="w-28 h-28 object-contain mb-4" />
                                <p className="text-gray-600">No unfiltered resumes available</p>
                            </div>
                        ) : (
                            <table className="min-w-full text-sm text-gray-700">
                                <thead className="bg-gray-200 text-gray-700">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Candidate Name</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Email</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Skills</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Experience</th>
                                        <th className="py-4 px-6 text-left font-semibold uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unfilteredResumes.map((resume, index) => (
                                        <tr
                                            key={index}
                                            className={`transition duration-200 ease-in-out hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                        >
                                            <td className="py-4 px-6 font-medium">
                                                <div>{resume.fileName || "Unnamed File"}</div>
                                                <div className="text-xs text-gray-500">{resume.name || "No name provided"}</div>
                                            </td>
                                            <td className="py-4 px-6">{resume.email || "N/A"}</td>
                                            <td className="py-4 px-6">
                                                {Array.isArray(resume.skills) && resume.skills.length > 0
                                                    ? resume.skills.join(", ")
                                                    : "N/A"}
                                            </td>
                                            <td className="py-4 px-6">{resume.experience || "N/A"}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleOpenModal(resume)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    )}
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        onClick={() => navigate("/generate-test", { state: { jdId: id } })}
                        className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Generate Assessment
                    </button>
                </div>
            </main>

            {openModal && (
                <ResumeModal
                    onClose={handleCloseModal}
                    resume={selectedResume}

                />
            )}
        </>


    );
};

export default JDDetails;

