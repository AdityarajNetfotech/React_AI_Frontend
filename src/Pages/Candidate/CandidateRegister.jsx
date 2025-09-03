import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Frame from "../../Components/Images/Frame.png";

function CandidateRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        linkedInProfile: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await axios.post(
                "http://localhost:5000/api/candidate/register-candidate",
                formData
            );

            setSuccess("Candidate registered successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                number: "",
                linkedInProfile: "",
            });

            setTimeout(() => navigate("/CandidateLogin"), 1500);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Something went wrong");
            } else {
                setError("Server not responding, try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center px-4">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="flex flex-col justify-center space-y-6 p-10">
                    <h1 className="text-4xl md:text-4xl font-bold animate-bounce">
                        Welcome to <br />
                        <span className="text-blue-600 animate-bounce">Our Platform</span>
                    </h1>
                    <p className="text-gray-600">
                        We are delighted to offer a modern and user-friendly service to
                        ensure you have the best experience.
                    </p>
                    <img src={Frame} alt="Illustration" className="w-full max-w-md" />
                </div>

                {/* Right Section (Form) */}
                <div className="max-w-4xl mx-auto border border-blue-300 bg-white p-8 rounded-2xl shadow-xl mt-6 mb-6">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                        Create Candidate Account
                    </h2>

                    {/* Show messages */}
                    {error && (
                        <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-600 text-center mb-4 font-medium">
                            {success}
                        </p>
                    )}

                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Email*
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Mobile Number*
                            </label>
                            <input
                                type="tel"
                                maxLength={10}
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="Mobile number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Password*
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                LinkedIn Profile
                            </label>
                            <input
                                type="text"
                                name="linkedInProfile"
                                value={formData.linkedInProfile}
                                onChange={handleChange}
                                placeholder="Enter your LinkedIn profile URL"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-full hover:bg-blue-700 transition duration-200"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>

                        <div className="md:col-span-2 text-center">
                            <p className="text-sm text-gray-700 mt-1">
                                Already have an account?{" "}
                                <span
                                    onClick={() => navigate("/CandidateLogin")}
                                    className="text-blue-600 hover:underline cursor-pointer font-medium"
                                >
                                    Login
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CandidateRegister;
