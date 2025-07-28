import React from 'react';
import { useState } from 'react';
import { Upload, X, FileText, Users, Clock, Building2, Briefcase, MapPin, Globe, GraduationCap, FilePlus } from 'lucide-react';

const CreateJDAI = () => {

    return (
        <>
            <div className="">
                <div className="px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        <div className="lg:col-span-2 h-full">
                            <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] p-8 space-y-2 transition-shadow duration-300 h-full">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-3">
                                        Job Title <span className="text-red-500">*</span>
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200"
                                            placeholder="Enter position title"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Domain</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200">
                                            <option>IT</option>
                                            <option>Marketing</option>
                                            <option>Sales</option>
                                            <option>HR</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Qualification</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200">
                                            <option>Bachelor's Degree</option>
                                            <option>Master's Degree</option>
                                            <option>PhD</option>
                                            <option>Diploma</option>
                                            <option>High School</option>
                                            <option>Professional Certification</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Location</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200"
                                            placeholder="Enter location"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Employment Type</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Experience</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200"
                                        >
                                            <option>1 Year</option>
                                            <option>2 Years</option>
                                            <option>3 Years</option>
                                            <option>4 Years</option>
                                            <option>5+ Years</option>
                                            <option>10+ Years</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">No of Positions</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-3">
                                        Add Skills
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Skills"
                                        className="w-full px-4 py-3 bg-gray-50 outline-2 outline-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500  transition-all duration-200 mb-3"
                                    />
                                </div>

                                <div className="flex justify-evenly mt-6">
                                    <div className="flex justify-center pt-6">
                                        <button
                                            className="bg-gray-800 text-white px-12 py-4 rounded-xl font-semibold hover:bg-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer"
                                        >
                                            Create JD
                                        </button>
                                    </div>
                                    <div className="flex justify-center pt-6">
                                        <label className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md shadow-red-400/20 hover:shadow-lg hover:shadow-red-400/30 cursor-pointer transition-all duration-300">
                                            <FilePlus className="w-5 h-5" />
                                            Upload JD
                                            <input type="file" accept=".pdf" className="hidden" />
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 h-full">
                            <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] p-6 top-8 transition-shadow duration-300 h-full">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-100 pb-2">Job Description</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateJDAI;