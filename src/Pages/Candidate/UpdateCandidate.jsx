import React, { useState } from 'react';
import axios from 'axios';
import {
    User,
    MapPin,
    DollarSign,
    Calendar,
    Briefcase,
    Home,
    Linkedin,
    Plus,
    X,
    Check,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { baseUrl } from '../../utils/ApiConstants';

const UpdateCandidate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        skills: [],
        currentCTC: '',
        expectedCTC: '',
        currentLocation: '',
        relocation: '',
        noticePeriod: '',
        linkedInProfile: ''
    });

    const [currentSkill, setCurrentSkill] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addSkill = () => {
        if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, currentSkill.trim()]
            }));
            setCurrentSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const token = localStorage.getItem('candidateAuthToken');

            const response = await axios.post(
                `${baseUrl}/api/candidate/add-additionalDetails`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            setMessage({ type: 'success', text: response.data.message });

            setFormData({
                skills: [],
                currentCTC: '',
                expectedCTC: '',
                currentLocation: '',
                relocation: '',
                noticePeriod: '',
                linkedInProfile: ''
            });
            setCurrentSkill('');
            alert("Profile Updated Successfully!")
            navigate('/Candidate-Dashboard');

        } catch (error) {
            console.error('Axios error:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || error.message || 'Network error. Please try again.'
            });
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Update Your Profile</h1>
                    <p className="text-lg text-gray-600">Add additional information to complete your profile</p>
                </div>

                {/* Alert Messages */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 transition-all duration-300 ${message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                        {message.type === 'success' ? (
                            <Check className="w-5 h-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <p className="font-medium">{message.text}</p>
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Skills Section */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Briefcase className="w-4 h-4 text-gray-500" />
                                Skills
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    placeholder="Add a skill (e.g., React, Node.js)"
                                />
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="hover:text-blue-900 transition-colors duration-200"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTC Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                    Current CTC
                                </label>
                                <input
                                    type="text"
                                    name="currentCTC"
                                    value={formData.currentCTC}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    placeholder="e.g., 10 LPA"
                                />
                            </div>
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                    Expected CTC
                                </label>
                                <input
                                    type="text"
                                    name="expectedCTC"
                                    value={formData.expectedCTC}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    placeholder="e.g., 15 LPA"
                                />
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    Current Location
                                </label>
                                <input
                                    type="text"
                                    name="currentLocation"
                                    value={formData.currentLocation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    placeholder="e.g., Mumbai, India"
                                />
                            </div>
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                    <Home className="w-4 h-4 text-gray-500" />
                                    Open to Relocation
                                </label>
                                <input
                                    type="text"
                                    name="relocation"
                                    value={formData.relocation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    placeholder="e.g., Yes / No / Depends on opportunity"
                                />
                            </div>
                        </div>

                        {/* Notice Period */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                Notice Period
                            </label>
                            <input
                                type="text"
                                name="noticePeriod"
                                value={formData.noticePeriod}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder="e.g., 30 days / 2 months / Immediate"
                            />
                        </div>

                        {/* LinkedIn Profile */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Linkedin className="w-4 h-4 text-gray-500" />
                                LinkedIn Profile
                            </label>
                            <input
                                type="url"
                                name="linkedInProfile"
                                value={formData.linkedInProfile}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    'Update Profile Details'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCandidate;