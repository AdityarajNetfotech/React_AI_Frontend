import React, { useEffect, useState } from "react";
import { X, Briefcase, Code, Palette, Search, Filter, Building2, Upload } from "lucide-react";
import axios from "axios";
import Pagination from "../../Components/Pagination/Pagination";
import { baseUrl } from "../../utils/ApiConstants";

const CandidateJd = () => {
    const [showModal, setShowModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJD, setSelectedJD] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [jdData, setJdData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [candidate, setCandidate] = useState(null);
const [appliedJobIds, setAppliedJobIds] = useState([]);

    const [applicationData, setApplicationData] = useState({
        skills: '',
        currentCTC: '',
        expectedCTC: '',
        currentLocation: '',
        relocation: false,
        noticePeriod: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchJD = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/admin/getAllJD`);
                console.log("all jd", res.data);

                setJdData(res.data?.Jd || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchJD();
    }, []);

   useEffect(() => {
    const fetchAppliedJobs = async () => {
        try {
            const token = localStorage.getItem("candidateAuthToken");
            if (!token) throw new Error("Authentication token not found");

            const response = await axios.get(
                `${baseUrl}/api/candidate/get-all-applied-jobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("applied jd", response.data);
            
            const appliedIds = response.data.specificItems.map(item => item.jobId);
            setAppliedJobIds(appliedIds);
            
        } catch (err) {
            console.log("Error fetching applied jobs:", err);
        }
    };

    fetchAppliedJobs();
}, []);


    useEffect(() => {
        const fetchCandidateProfile = async () => {
            try {
                const token = localStorage.getItem("candidateAuthToken");
                if (!token) throw new Error("No token found");

                const res = await axios.get(
                    `${baseUrl}/api/candidate/getcandidate-profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // console.log("logged in candidate", res.data.candidate);


                setCandidate(res.data.candidate);
            } catch (err) {
                console.error("Error fetching candidate profile:", err);
            }
        };

        fetchCandidateProfile();
    }, []);


    const uniqueTitles = [...new Set(jdData.map(jd => jd.title))];
    const uniqueCompanies = [...new Set(jdData.map(jd => jd.company))];
    const allSkills = [...new Set(jdData.flatMap(jd => jd.skills || []))];

    const filteredData = jdData.filter(jd => {
        const matchesSearch =
            jd.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            jd.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (jd.skills || []).some(skill =>
                skill.toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesTitle = selectedTitle === "" || jd.title === selectedTitle;
        const matchesCompany = selectedCompany === "" || jd.company === selectedCompany;
        const matchesSkill =
            selectedSkill === "" || (jd.skills || []).includes(selectedSkill);

        return matchesSearch && matchesTitle && matchesCompany && matchesSkill;
    });

    const handleViewJD = (jd) => {
        setSelectedJD(jd);
        setShowModal(true);
    };

    const handleApplyJD = (jd) => {
        setSelectedJD(jd);
        setShowApplyModal(true);

        if (candidate && candidate.candidateAdditiondetails) {
            const additionalDetails = candidate.candidateAdditiondetails;
            setApplicationData({
                skills: additionalDetails.skills ? additionalDetails.skills.join(', ') : '',
                currentCTC: additionalDetails.currentCTC || '',
                expectedCTC: additionalDetails.expectedCTC || '',
                currentLocation: additionalDetails.currentLocation || '',
                relocation: additionalDetails.relocation === 'yes' || additionalDetails.relocation === true,
                noticePeriod: additionalDetails.noticePeriod || '',
            });
        } else {
            setApplicationData({
                skills: '',
                currentCTC: '',
                expectedCTC: '',
                currentLocation: '',
                relocation: false,
                noticePeriod: '',
            });
        }
        setResumeFile(null);
    };





    const closeModal = () => {
        setSelectedJD(null);
        setShowModal(false);
    };

    const closeApplyModal = () => {
        setSelectedJD(null);
        setShowApplyModal(false);
        setApplicationData({
            skills: '',
            currentCTC: '',
            expectedCTC: '',
            currentLocation: '',
            relocation: false,
            noticePeriod: '',
        });
        setResumeFile(null);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedTitle("");
        setSelectedSkill("");
        setSelectedCompany("");
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setApplicationData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should not exceed 5MB');
                return;
            }
            setResumeFile(file);
        }
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        if (!resumeFile) {
            alert('Please upload your resume');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('resume', resumeFile);

            const skillsArray = applicationData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

            skillsArray.forEach(skill => {
                formData.append('skills[]', skill);
            });

            formData.append('currentCTC', applicationData.currentCTC);
            formData.append('expectedCTC', applicationData.expectedCTC);
            formData.append('currentLocation', applicationData.currentLocation);
            formData.append('relocation', applicationData.relocation);
            formData.append('noticePeriod', applicationData.noticePeriod);

            const token = localStorage.getItem('candidateAuthToken');

            if (!token) {
                alert('Please login to apply for jobs');
                setIsSubmitting(false);
                return;
            }

            const response = await axios.post(
                `${baseUrl}/api/candidate/jobs/${selectedJD._id}/apply`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);


            if (response.status === 201) {
                alert('Application submitted successfully!');
                closeApplyModal();
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert(error.response?.data?.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const stats = [
        {
            label: "Total Jobs",
            value: filteredData.length,
            icon: Briefcase,
            color: "bg-blue-100 text-blue-700",
        },
        {
            label: "Companies",
            value: uniqueCompanies.length,
            icon: Building2,
            color: "bg-green-100 text-green-700",
        },
        {
            label: "Tech Jobs",
            value: filteredData.filter((jd) =>
                jd.title?.toLowerCase().includes("developer")
            ).length,
            icon: Code,
            color: "bg-purple-100 text-purple-700",
        },
        {
            label: "Design Jobs",
            value: filteredData.filter((jd) =>
                jd.title?.toLowerCase().includes("designer")
            ).length,
            icon: Palette,
            color: "bg-pink-100 text-pink-700",
        },
    ];
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const start = (currentPage - 1) * rowsPerPage;
    const currentData = filteredData.slice(start, start + rowsPerPage);

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Job Descriptions</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow border border-gray-100 p-6 flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                    </h2>
                    {(searchTerm || selectedTitle || selectedSkill || selectedCompany) && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-red-600 hover:text-red-700 transition"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <select
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Titles</option>
                        {uniqueTitles.map((title, index) => (
                            <option key={`title-${index}`} value={title}>{title}</option>
                        ))}
                    </select>

                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Skills</option>
                        {allSkills.sort().map((skill, index) => (
                            <option key={`skill-${index}`} value={skill}>{skill}</option>
                        ))}
                    </select>

                    <select
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Companies</option>
                        {uniqueCompanies.map((company, index) => (
                            <option key={`company-${index}`} value={company}>{company}</option>
                        ))}
                    </select>

                    <div className="flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-800">{filteredData.length}</span> results
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100 pb-4">
                <div className="overflow-x-auto">
                    <table className="min-w-[1000px] w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 text-left">
                            <tr>
                                <th className="px-6 py-3">Id</th>
                                <th className="px-6 py-3">Job Title</th>
                                <th className="px-6 py-3">Company</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Skills</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((jd, index) => (
                                    <tr
                                        key={jd._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {(currentPage - 1) * rowsPerPage + index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {jd.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{jd.company}</td>
                                        <td className="px-6 py-4 text-gray-600">{jd.location}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(jd.skills || []).slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {(jd.skills || []).length > 3 && (
                                                    <span className="text-gray-500 text-xs px-2 py-1">
                                                        +{jd.skills.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApplyJD(jd)}
                                                    disabled={appliedJobIds.includes(jd._id)}
                                                    className={`px-3 py-1.5 text-white text-sm rounded-lg transition ${appliedJobIds.includes(jd._id)
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-green-500 hover:bg-green-600'
                                                        }`}
                                                >
                                                    {appliedJobIds.includes(jd._id) ? 'Applied' : 'Apply'}
                                                </button>
                                                <button
                                                    onClick={() => handleViewJD(jd)}
                                                    className="px-3 py-1.5 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        No jobs found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>

            {showApplyModal && selectedJD && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={closeApplyModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Apply for {selectedJD.title}</h2>
                            <p className="text-gray-600">{selectedJD.company} • {selectedJD.location}</p>
                        </div>

                        <form onSubmit={handleSubmitApplication} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resume <span className="text-red-500">*</span>
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <div className="text-sm text-gray-600">
                                        <label htmlFor="resume-upload" className="cursor-pointer">
                                            <span className="text-indigo-600 hover:text-indigo-500 font-medium">
                                                Click to upload
                                            </span>
                                            <span> or drag and drop</span>
                                        </label>
                                        <input
                                            id="resume-upload"
                                            name="resume"
                                            type="file"
                                            className="sr-only"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 5MB</p>
                                    {resumeFile && (
                                        <div className="mt-3 text-sm text-green-600 font-medium">
                                            ✓ {resumeFile.name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="skills"
                                    value={applicationData.skills}
                                    onChange={handleInputChange}
                                    placeholder="Enter your relevant skills (comma separated)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current CTC (LPA)
                                    </label>
                                    <input
                                        type="number"
                                        name="currentCTC"
                                        value={applicationData.currentCTC}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 5.5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        step="0.1"
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current CTC <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="currentCTC"
                                        value={applicationData.currentCTC}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4lpa,"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expected CTC (LPA) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="expectedCTC"
                                        value={applicationData.expectedCTC}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 8.0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        step="0.1"
                                        required
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current CTC <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="currentCTC"
                                        value={applicationData.currentCTC}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4lpa,"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="currentLocation"
                                        value={applicationData.currentLocation}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mumbai, Maharashtra"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Notice Period <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="noticePeriod"
                                        value={applicationData.noticePeriod}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 30 days, Immediate, 2 months"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="relocation"
                                        checked={applicationData.relocation}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        I am willing to relocate for this position
                                    </span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeApplyModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View JD Modal */}
            {showModal && selectedJD && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{selectedJD.title}</h2>
                        <p className="text-gray-600 mb-2"><strong>Company:</strong> {selectedJD.company}</p>
                        <p className="text-gray-600 mb-2">
                            <strong>Required Skills:</strong>{" "}
                            {selectedJD.skills && selectedJD.skills.join(", ")}
                        </p>
                        <p className="text-gray-600 mb-2"><strong>Location:</strong> {selectedJD.location}</p>
                        <div className="mt-4 text-gray-700 whitespace-pre-line">
                            {selectedJD.fullJD}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateJd;