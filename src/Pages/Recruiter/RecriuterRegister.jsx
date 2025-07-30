import React, { useContext, useState } from "react";
import Frame from "../../Components/Images/Frame.png"
import { useNavigate } from "react-router";
import axios from "axios"
import { AuthContext } from "../../Components/Context/RecruiterContext";
import SpinLoader from "../../Components/SpinLoader/SpinLoader";
import { toast, ToastContainer } from "react-toastify"

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setError("");
        setLoading(true);

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.number ||
            !formData.companyName ||
            !formData.designation

        ) {
            setError("Please provide all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/recruiter/register", formData);

            console.log(response.data)

            if (response.data && response.status === 201) {
              
                setRecruiterData(response.data);
               

                toast.success("Registration Successfull!! Please Login", {
                    position: "top-right",
                    autoClose: 3000,
                    className: "bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-lg border border-green-700",
                    bodyClassName: "text-sm",
                    progressClassName: "bg-green-200",
                    onClose: () => navigate("/RecruiterLogin"),
                });

            }

        } catch (error) {
            console.error("Error registering recruiter:", error);
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center px-4">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center space-y-6 p-10">
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

                <div className="max-w-4xl mx-auto border border-blue-300 bg-white p-8 rounded-2xl shadow-xl mt-6 mb-6">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Create Recruiter Account</h2>
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Name*</label>
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
                            <label className="block mb-1 text-sm font-medium text-gray-700">Email*</label>
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
                            <label className="block mb-1 text-sm font-medium text-gray-700">Mobile Number*</label>
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
                            <label className="block mb-1 text-sm font-medium text-gray-700">Password*</label>
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


                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Company Name*</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>


                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Company Website</label>
                            <input
                                type="text"
                                name="companyWebsite"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                placeholder="Company website"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                            />
                        </div>


                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Designation*</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Enter your designation"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>


                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Industry</label>
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="Enter your industry"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                            />
                        </div>


                        <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium text-gray-700">LinkedIn Profile</label>
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
                                disabled={loading}
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-full hover:bg-blue-700 transition duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <SpinLoader />
                                        Registering...
                                    </div>
                                ) : "Register"
                                }
                            </button>
                        </div>


                        <div className="md:col-span-2 text-center">
                            <p className="text-sm text-gray-700 mt-1">
                                Already have an account?{" "}
                                <span
                                    onClick={() => navigate("/RecruiterLogin")}
                                    className="text-blue-600 hover:underline cursor-pointer font-medium"
                                >
                                    Login
                                </span>
                            </p>
                        </div>
                    </form>
                    <ToastContainer />
                </div>

            </div>
        </div>
    );
};

export default RecriuterRegister;
