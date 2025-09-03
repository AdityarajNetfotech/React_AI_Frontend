import React, { useState } from "react";
import { X, Briefcase, Layers, Code, Palette, Search, Filter, Building2 } from "lucide-react";

const CandidateJd = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJD, setSelectedJD] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    const jdData = [
        {
            _id: "JD001",
            title: "Frontend Developer",
            company: "Tech Solutions Pvt Ltd",
            createdAt: "2025-08-01",
            jobSummary: "We are looking for a skilled Frontend Developer with React.js experience.",
            skills: ["React", "JavaScript", "CSS", "TailwindCSS", "Git"],
        },
        {
            _id: "JD002",
            title: "Backend Developer",
            company: "InnovateTech India",
            createdAt: "2025-07-28",
            jobSummary: "Looking for a Backend Developer skilled in Node.js and Express.",
            skills: ["Node.js", "Express", "MongoDB", "API Development"],
        },
        {
            _id: "JD003",
            title: "UI/UX Designer",
            company: "Creative Studios",
            createdAt: "2025-07-20",
            jobSummary: "Creative designer with knowledge of Figma and user flows.",
            skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
        },
        {
            _id: "JD004",
            title: "DevOps Engineer",
            company: "Cloud Matrix Solutions",
            createdAt: "2025-07-15",
            jobSummary: "Hiring DevOps Engineer with cloud and CI/CD pipeline expertise.",
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
        },
        {
            _id: "JD005",
            title: "Frontend Developer",
            company: "WebCraft Technologies",
            createdAt: "2025-07-10",
            jobSummary: "Looking for Frontend Developer with Vue.js expertise.",
            skills: ["Vue.js", "JavaScript", "HTML", "CSS", "Webpack"],
        },
        {
            _id: "JD006",
            title: "Full Stack Developer",
            company: "Tech Solutions Pvt Ltd",
            createdAt: "2025-07-05",
            jobSummary: "Need Full Stack Developer proficient in MERN stack.",
            skills: ["React", "Node.js", "MongoDB", "Express", "Redux"],
        },
    ];

    const uniqueTitles = [...new Set(jdData.map(jd => jd.title))];
    const uniqueCompanies = [...new Set(jdData.map(jd => jd.company))];
    const allSkills = [...new Set(jdData.flatMap(jd => jd.skills))];

    const filteredData = jdData.filter(jd => {
        const matchesSearch = jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             jd.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             jd.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesTitle = selectedTitle === "" || jd.title === selectedTitle;
        const matchesCompany = selectedCompany === "" || jd.company === selectedCompany;
        const matchesSkill = selectedSkill === "" || jd.skills.includes(selectedSkill);
        
        return matchesSearch && matchesTitle && matchesCompany && matchesSkill;
    });

    const handleViewJD = (jd) => {
        setSelectedJD(jd);
        setShowModal(true);
    };

    const handleApplyJD = (jdId) => {
        alert(`Applied to JD: ${jdId}`);
    };

    const closeModal = () => {
        setSelectedJD(null);
        setShowModal(false);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedTitle("");
        setSelectedSkill("");
        setSelectedCompany("");
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
            value: filteredData.filter((jd) => jd.title.toLowerCase().includes("developer")).length,
            icon: Code,
            color: "bg-purple-100 text-purple-700",
        },
        {
            label: "Design Jobs",
            value: filteredData.filter((jd) => jd.title.toLowerCase().includes("designer")).length,
            icon: Palette,
            color: "bg-pink-100 text-pink-700",
        },
    ];

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
                        {uniqueTitles.map((title) => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>

                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Skills</option>
                        {allSkills.sort().map((skill) => (
                            <option key={skill} value={skill}>{skill}</option>
                        ))}
                    </select>

                    <select
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Companies</option>
                        {uniqueCompanies.map((company) => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>

                    <div className="flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-800">{filteredData.length}</span> results
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-[1000px] w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 text-left">
                            <tr>
                                <th className="px-6 py-3">Id</th>
                                <th className="px-6 py-3">Job Title</th>
                                <th className="px-6 py-3">Company</th>
                                <th className="px-6 py-3">Created On</th>
                                <th className="px-6 py-3">Skills</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((jd, index) => (
                                    <tr key={jd._id} className="border-t hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{jd.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700 font-medium">{jd.company}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(jd.createdAt).toLocaleDateString("en-IN")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {jd.skills.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {jd.skills.length > 3 && (
                                                    <span className="text-gray-500 text-xs px-2 py-1">
                                                        +{jd.skills.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApplyJD(jd._id)}
                                                    className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
                                                >
                                                    Apply
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
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No jobs found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
                        <div className="space-y-3 mb-4">
                            <p className="text-gray-600">
                                <strong>Company:</strong> {selectedJD.company}
                            </p>
                            <p className="text-gray-600">
                                <strong>Created On:</strong>{" "}
                                {new Date(selectedJD.createdAt).toLocaleDateString("en-IN")}
                            </p>
                        </div>
                        <p className="text-gray-700 mb-4">
                            <strong>Job Summary:</strong> {selectedJD.jobSummary}
                        </p>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Required Skills:</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedJD.skills.map((skill, idx) => (
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
                </div>
            )}
        </div>
    );
};

export default CandidateJd;