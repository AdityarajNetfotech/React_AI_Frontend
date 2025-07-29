import React from 'react';
import { useState } from 'react';
import { Upload, X, FileText, Users, Clock, Building2, Briefcase, MapPin, Globe, GraduationCap, FilePlus } from 'lucide-react';
// import Sidebar from './component/Sidebar';
import { useNavigate } from 'react-router';

const CreateJDManually = () => {
    const [isJDCreated, setIsJDCreated] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [points, setPoints] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        positionTitle: '',
        domain: 'IT',
        minExperience: '1 Year',
        noOfPositions: '',
        location: '',
        qualification: 'Bachelor\'s Degree',
        employmentType: 'Full-time',
        jobDescription: ''
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            setPoints([...points, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removePoint = (index) => {
        const updated = [...points];
        updated.splice(index, 1);
        setPoints(updated);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateJD = () => {
        setIsJDCreated(true);
    };

    const handleUploadJD = () => {
        alert("JD Created Successfully")
        navigate('/Recruiter-Dashboard/JDlist', { state: formData })
        console.log(jdData);
    };

    return (
        <>
            <div className="">
                <div className="px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        <div className="lg:col-span-2 h-full">
                            <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] px-8 py-12 space-y-2 transition-shadow duration-300 h-full">

                                <div className="relative mb-8">
                                    <input
                                        type="text"
                                        value={formData.positionTitle}
                                        onChange={(e) => handleInputChange('positionTitle', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                        placeholder="Enter position title"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Job Title <span className="text-red-500">*</span>
                                    </label>
                                </div>

                                <div className="relative mb-8">
                                    <textarea
                                        value={formData.jobDescription}
                                        onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 resize-none"
                                        placeholder="Enter job description"
                                        rows={4}
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Job Description
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="relative">
                                        <select
                                            value={formData.domain}
                                            onChange={(e) => handleInputChange('domain', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300">
                                            <option>IT</option>
                                            <option>Marketing</option>
                                            <option>Sales</option>
                                            <option>HR</option>
                                        </select>
                                        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                            Domain
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={formData.qualification}
                                            onChange={(e) => handleInputChange('qualification', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300">
                                            <option>Bachelor's Degree</option>
                                            <option>Master's Degree</option>
                                            <option>PhD</option>
                                            <option>Diploma</option>
                                            <option>High School</option>
                                            <option>Professional Certification</option>
                                        </select>
                                        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                            Qualification
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                            placeholder="Enter location"
                                        />
                                        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                            Location
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={formData.employmentType}
                                            onChange={(e) => handleInputChange('employmentType', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300">
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                            Employment Type
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="relative">
                                        <select
                                            value={formData.minExperience}
                                            onChange={(e) => handleInputChange('minExperience', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300">
                                            <option>1 Year</option>
                                            <option>2 Years</option>
                                            <option>3 Years</option>
                                            <option>4 Years</option>
                                            <option>5+ Years</option>
                                            <option>10+ Years</option>
                                        </select>
                                        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                            Experience
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={formData.noOfPositions}
                                            onChange={(e) => handleInputChange('noOfPositions', e.target.value)}
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
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter Skills"
                                        className="w-full px-4 py-3 bg-white/70 border border-gray-400 rounded-xl shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
                                    />
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-blue-600">
                                        Add Skills
                                    </label>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {points.map((point, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center shadow-sm border border-blue-200"
                                        >
                                            <span className="font-medium">{point}</span>
                                            <button
                                                onClick={() => removePoint(index)}
                                                className="ml-2 text-blue-600 hover:text-red-500 transition-colors duration-200"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center pt-6">
                                    <button
                                        onClick={handleCreateJD}
                                        className="bg-gray-800 text-white px-12 py-4 rounded-xl font-bold hover:bg-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                    >
                                        Create JD
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-1 h-full">
                            <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] p-6 top-8 transition-shadow duration-300 h-full">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-100 pb-2">Job Description</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-gray-700">Job Title:</span>
                                            <span className="text-indigo-600 font-semibold">
                                                {isJDCreated ? (formData.positionTitle || 'NA') : 'NA'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex flex-col space-y-2">
                                            <span className="font-bold text-gray-700">Job Description:</span>
                                            <div className='border-2 border-gray-200 p-3 h-40 overflow-y-auto rounded-lg bg-gray-50'>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {isJDCreated ? (formData.jobDescription || 'NA') : 'NA'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 text-sm">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                                            <Users className="w-4 h-4 mr-2 text-indigo-600" /> Skills Requirement:
                                        </h4>
                                        {isJDCreated && points.length > 0 ? (
                                            <ul className="space-y-2 list-disc list-inside ml-4">
                                                {points.map((skill, index) => (
                                                    <li key={index} className="text-emerald-600 font-medium">{skill}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 italic">NA</p>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 flex space-x-2">
                                            <span className='flex items-center'>
                                                <Users className="w-4 h-4 mr-2 text-indigo-600" /> Open Positions:
                                            </span>
                                            <span className="text-emerald-600 font-semibold">{isJDCreated ? (formData.noOfPositions || 'NA') : 'NA'}</span>
                                        </h4>
                                    </div>

                                    <div>
                                        <div className="space-y-3">
                                            <div className="flex space-x-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                                                <span className="flex items-center font-medium text-gray-700">
                                                    <Building2 className="w-4 h-4 mr-2 text-gray-500" /> Domain:
                                                </span>
                                                <span className="text-purple-600 font-semibold">{isJDCreated ? formData.domain : 'NA'}</span>
                                            </div>
                                            <div className="flex space-x-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                                                <span className="flex items-center font-medium text-gray-700">
                                                    <GraduationCap className="w-4 h-4 mr-2 text-gray-500" /> Qualification:
                                                </span>
                                                <span className="text-purple-600 font-semibold">{isJDCreated ? formData.qualification : 'NA'}</span>
                                            </div>
                                            <div className="flex space-x-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                                                <span className="flex items-center font-medium text-gray-700">
                                                    <MapPin className="w-4 h-4 mr-2 text-gray-500" /> Location:
                                                </span>
                                                <span className="text-purple-600 font-semibold">{isJDCreated ? (formData.location || 'NA') : 'NA'}</span>
                                            </div>
                                            <div className="flex space-x-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                                                <span className="flex items-center font-medium text-gray-700">
                                                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" /> Employment Type:
                                                </span>
                                                <span className="text-purple-600 font-semibold">{isJDCreated ? formData.employmentType : 'NA'}</span>
                                            </div>
                                            <div className="flex space-x-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                                                <span className="flex items-center font-medium text-gray-700">
                                                    <Clock className="w-4 h-4 mr-2 text-gray-500" /> Experience:
                                                </span>
                                                <span className="text-orange-600 font-semibold">
                                                    {isJDCreated ? `${formData.minExperience}` : 'NA'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isJDCreated && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={handleUploadJD}
                                            className="mx-auto bg-indigo-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-indigo-700 transform hover:scale-103 transition-all duration-200 shadow-lg flex items-center justify-center cursor-pointer"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Post JD
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateJDManually;