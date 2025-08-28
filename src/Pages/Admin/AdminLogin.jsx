import React, { useState } from "react";
import Frame from "../../Components/Images/Frame.png"
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from "../../utils/ApiConstants";


const AdminLogin = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", email, password);
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/api/admin/login`, { email, password });
            console.log(response.data);
            setLoading(false);

            if (response.data.token) {
                localStorage.setItem("adminAuthToken", response.data.token);
            }
              toast.success("Login Successful!", {
                            position: "top-right",
                            autoClose: 3000,
                            className: "bg-gradient-to-r from-green-500 to-green-600 text-white font-medium px-6 py-4 rounded-xl shadow-lg border border-green-700",
                            bodyClassName: "text-sm",
                            progressClassName: "bg-green-200",
                            onClose: () => navigate("/AdminDashboard"),
                        });
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || "Login failed");
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
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Admin Login</h2>
                    </div>
                     {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <label className="flex items-center text-sm text-gray-600">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={loading}
                        > {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
