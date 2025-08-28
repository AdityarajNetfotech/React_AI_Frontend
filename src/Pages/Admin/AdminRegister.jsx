import React, { useState } from "react";
import Frame from "../../Components/Images/Frame.png"
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"
import { baseUrl } from "../../utils/ApiConstants";

const AdminRegister = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
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
            !formData.number
        ) {
            setError("Please provide all fields.");
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/api/admin/register`, formData);

            console.log(response.data)

            if (response.data && response.status === 201) {
                toast.success("Registration Successfull!! Please Login", {
                    position: "top-right",
                    autoClose: 3000,
                    className: "bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-lg border border-green-700",
                    bodyClassName: "text-sm",
                    progressClassName: "bg-green-200",
                    onClose: () => navigate("/AdminLogin"),
                });

            }
        } catch (error) {
            console.error("Error registering admin:", error);
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
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Create Admin Account</h2>
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
                                type="tel"
                                maxLength={10}
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
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center"
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/AdminLogin")}
                            className="w-full text-white bg-[#131313] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
