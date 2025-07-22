import React, { useContext, useState } from "react";
import Frame from "../../Components/Images/Frame.png"
import { useNavigate } from "react-router";
import axios from "axios"
import { AuthContext } from "../../Components/Context/RecruiterContext";

const RecriuterRegister = () => {

    const navigate = useNavigate();

    const { recruiterData, setRecruiterData } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        companyName: "",
        companyWebsite: "",
        designation: "",
        industry: "",
        linkedInProfile: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.number ||
            !formData.companyName ||
            !formData.designation

        ) {
            setError("Please provide all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/recruiter/register", formData);

            console.log(response.data)

            if (response.data && response.status === 201) {
                alert("Registration Successfull!! Please Login")
                setRecruiterData(response.data);
            }

        } catch (error) {
            console.error("Error registering recruiter:", error);
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center px-4">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="text-4xl md:text-4xl font-bold animate-bounce">
                        Welcome to <br />
                        <span className="text-blue-600 animate-bounce">Our Platform</span>
                    </h1>
                    <p className="text-gray-600">
                        We are delighted to offer a modern and user-friendly service to
                        ensure you have the best experience.
                    </p>
                    <img
                        src={Frame}
                        alt="Illustration"
                        className="w-full max-w-md"
                    />
                </div>


                <div className="flex flex-col border-2 border-blue-300 justify-center bg-white p-8 rounded-xl shadow-md space-y-6 mt-4 mb-4">

                    <div className="flex justify-center space-x-4 text-sm">
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Create Recruiter Account</h2>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your Name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email*
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Mobile Number*
                            </label>
                            <input
                                type="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="Enter Your mobile number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Password*
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Company Name*
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter Your Company name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Company Website
                            </label>
                            <input
                                type="text"
                                name="companyWebsite"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                placeholder="Enter Your Company website"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Designation*
                            </label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Enter Your designation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Industry
                            </label>
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="Enter Your industry"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                LinkedIn Profile
                            </label>
                            <input
                                type="text"
                                name="linkedInProfile"
                                value={formData.linkedInProfile}
                                onChange={handleChange}
                                placeholder="Enter Your LinkedIn Profile URL"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/RecruiterLogin")}
                            className="w-full text-white bg-[#131313] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                    </form>



                </div>
            </div>
        </div>
    );
};

export default RecriuterRegister;
