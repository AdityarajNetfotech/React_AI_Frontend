import React, { useState, useEffect, useRef, useContext } from 'react';
import { FilePlus, X, Download, Upload } from 'lucide-react';
import JobDescAI from './component/JobDescAI';
import jsPDF from "jspdf";
import { AuthContext } from '../../Components/Context/RecruiterContext';

const CreateJDAI = () => {
    const [formData, setFormData] = useState({
        title: "",
        domain: "",
        qualification: "",
        location: "",
        employmentType: "",
        experience: "",
        positions: 1,
        salaryRange: ""
    });

    const [inputValue, setInputValue] = useState("");
    const [skillsList, setSkillsList] = useState([]);
    const [fullJD, setFullJD] = useState("");
    const [displayedJD, setDisplayedJD] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const typingIntervalRef = useRef(null);
    const [loader, setLoader] = useState(false);
    const fileInputRef = useRef(null);

    const { recruiterData } = useContext(AuthContext);
    const companyName = recruiterData?.companyName || "";
    useEffect(() => {
        console.log("Recruiter Data from Context:", recruiterData);
    }, [recruiterData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!skillsList.includes(inputValue.trim())) {
                setSkillsList([...skillsList, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const removeSkill = (index) => {
        setSkillsList(skillsList.filter((_, i) => i !== index));
    };

    const cleanJDText = (text) => {
        let lines = text.split('\n');

        return lines
            .map(line => {
                line = line.replace(/^#+\s*/, '');
                line = line.replace(/\*\*/g, '');
                line = line.replace(/^\s*\*\s+/, '• ');
                if (line.trim() === '---') return '';
                return line.trim();
            })
            .join('\n');
    };

    const startTypingEffect = (text) => {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

        const cleanedText = cleanJDText(text);
        const lines = cleanedText.split(/\n/);
        let lineIndex = 0, charIndex = 0;
        let typedLines = [];
        let completedLines = [];

        setDisplayedJD([]);
        setIsTyping(true);
        setShowButtons(false);

        const roleTitle = `Role: ${formData.title}`;

        typingIntervalRef.current = setInterval(() => {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];

                if (!typedLines[lineIndex]) typedLines[lineIndex] = '';

                typedLines[lineIndex] += currentLine[charIndex] || '';

                if (charIndex >= currentLine.length - 1) {
                    completedLines[lineIndex] = true;
                }

                const jsxContent = (
                    <>
                        <div className="mb-5 text-lg">
                            <strong>{roleTitle}</strong>
                        </div>
                        {typedLines.map((line, i) => {
                            if (line.trim() === '') return null;

                            const isCompleted = completedLines[i];
                            const originalLine = lines[i] || '';
                            const isHeading = /^[0-9]+\./.test(originalLine) || originalLine.endsWith(':') || (originalLine.length < 60 && /^[A-Z]/.test(originalLine));

                            if (isHeading) {
                                return (
                                    <h4 key={i} className="font-bold text-lg mt-6 mb-2 text-gray-900">
                                        {line}
                                    </h4>
                                );
                            } else if (originalLine.startsWith('•')) {
                                return (
                                    <div key={i} className="mb-2 ml-4 text-gray-700 leading-relaxed">
                                        {line}
                                    </div>
                                );
                            } else {
                                return (
                                    <p key={i} className="mb-5 leading-relaxed text-gray-700">
                                        {line}
                                    </p>
                                );
                            }
                        })}
                    </>
                );
                setDisplayedJD(jsxContent);

                charIndex++;
                if (charIndex >= currentLine.length) {
                    charIndex = 0;
                    lineIndex++;
                }
            } else {
                clearInterval(typingIntervalRef.current);
                setIsTyping(false);
                setShowButtons(true);
            }
        }, 10);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file only');
            return;
        }

        setLoader(true);

        try {
            const token = localStorage.getItem("recruiterAuthToken");
            const formData = new FormData();
            formData.append('jdPdf', file);

            const res = await fetch("http://localhost:5000/api/jd/upload-pdf", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            const data = await res.json();
            // console.log("first", data);


            if (res.ok) {
                setFormData({
                    title: data.jd.title || "",
                    domain: data.jd.domain || "",
                    Qualification: data.jd.qualification || "",
                    location: data.jd.location || "",
                    employmentType: data.jd.employmentType || "",
                    experience: data.jd.experience || "",
                    positions: formData.positions,
                    salaryRange: data.jd.salaryRange || ""
                });

                setSkillsList(data.jd.skills || []);

                setFullJD(data.jd.fullJD);
                console.log("second", fullJD);

                startTypingEffect(data.jd.fullJD);

                alert("JD uploaded and processed successfully!");
            } else {
                alert(data.message || "Error uploading JD");
            }
        } catch (error) {
            console.error("Error uploading JD:", error);
            alert("Error uploading JD");
        } finally {
            setLoader(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.location || skillsList.length === 0) {
            alert("Please fill all required fields and add at least one skill");
            return;
        }

        setLoader(true);

        try {
            const token = localStorage.getItem("recruiterAuthToken");

            const res = await fetch("http://localhost:5000/api/jd/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: `${formData.title} at ${companyName}`,
                    domain: formData.domain,
                    Qualification: formData.qualification,
                    experience: parseInt(formData.experience),
                    skills: skillsList,
                    location: formData.location,
                    employmentType: formData.employmentType,
                    salaryRange: formData.salaryRange
                })
            });

            const data = await res.json();
            // console.log("output", data);

            setFullJD(data.jd.fullJD);
            startTypingEffect(data.jd.fullJD);
        } catch (error) {
            console.error(error);
            alert("Error creating JD");
        } finally {
            setLoader(false);
        }
    };

    const downloadJDAsPDF = () => {
        if (!fullJD) return;

        const plainJD = cleanJDText(fullJD);
        const doc = new jsPDF();
        const margin = 15;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width - margin * 2;

        const lines = doc.splitTextToSize(plainJD, pageWidth);

        let y = 20;
        lines.forEach((line) => {
            if (y > pageHeight - 20) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, margin, y);
            y += 10;
        });

        doc.save(`${formData.title || 'JobDescription'}.pdf`);
    };

    return (
        <div className="">
            {loader && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                        </div>
                        <h1 className='font-bold'>Processing JD</h1>
                    </div>
                </div>
            )}

            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 min-h-screen">
                    <div className="lg:col-span-3 ">
                        <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] px-8 py-12 space-y-2 transition-shadow duration-300 h-full">

                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                    placeholder="Enter position title"
                                />
                                <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                        placeholder="Enter domain"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Domain
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                        placeholder="Enter qualification"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Qualification
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                        placeholder="Enter location"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                        placeholder="Enter employment type"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Employment Type
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                        placeholder="Enter experience"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Experience (Years)
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="positions"
                                        value={formData.positions}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        No of Positions
                                    </label>
                                </div>
                            </div>

                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    name="salaryRange"
                                    value={formData.salaryRange}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                    placeholder="e.g., 5-8 LPA"
                                />
                                <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                    Salary Range
                                </label>
                            </div>

                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Enter a skill and press Enter"
                                    className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                />
                                <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                    Add Skills <span className="text-red-500">*</span>
                                </label>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8 max-h-[200px] overflow-y-auto">
                                {skillsList.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center shadow-sm border border-blue-200"
                                    >
                                        <span className="font-medium">{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            className="ml-2 text-blue-600 hover:text-red-500 transition-colors duration-200"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row justify-evenly mt-6 gap-4 sm:gap-0">
                                <div className="flex justify-center pt-6">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-gray-800 text-white px-8 py-3 sm:px-12 sm:py-4 rounded-xl font-semibold hover:bg-gray-900 transform hover:shadow-lg transition-all duration-200 cursor-pointer"
                                    >
                                        Create JD
                                    </button>
                                </div>
                                <div className="flex justify-center pt-6">
                                    <label className="flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md shadow-red-400/20 hover:shadow-lg hover:shadow-red-400/30 cursor-pointer transition-all duration-300">
                                        <FilePlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Upload JD From Computer
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <JobDescAI
                        jdData={displayedJD}
                        isTyping={isTyping}
                        showButtons={showButtons}
                        onDownload={downloadJDAsPDF}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateJDAI;