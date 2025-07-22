import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../Components/Images/Frame.png"
import axios from "axios";
import { AuthContext } from "../../Components/Context/RecruiterContext";


const RecruiterLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { recruiterData, setRecruiterData } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", email, password);
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/recruiter/login", { email, password });
            console.log(response.data);
            setLoading(false);

            if (response.data.token) {
                localStorage.setItem("recruiterAuthToken", response.data.token);
                setRecruiterData(response.data);
            }

            alert("Login Successfull!")
            navigate("/RecruiterMainLandingPage")
        } catch (error) {
             setLoading(false);
            setError(error.response?.data?.message || "Login failed");
        }

    };

    const handleForgotPassword = () => {
        setShowPopup(true);
    };

    const handlePopupResponse = (confirmed) => {
        setShowPopup(false);
        if (confirmed) {
            navigate("/EmailResetPage");
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
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Recruiter Login</h2>
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
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                             disabled={loading}
                        >  {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                </div>


                {showPopup && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full px-8 py-6 text-center transform transition-all duration-300 scale-100 hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <svg
                                    className="w-12 h-12 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Reset Password?
                            </h2>

                            <p className="text-sm text-gray-600 mb-6">
                                Are you sure you want to reset your password?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => navigate("/EmailResetPage")}
                                    className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => handlePopupResponse(false)}
                                    className="px-5 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RecruiterLogin;
