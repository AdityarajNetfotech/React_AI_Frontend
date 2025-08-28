import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../Components/Images/Frame.png"
import axios from "axios"
import { baseUrl } from "../../utils/ApiConstants";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            setError("Session expired. Please request a password reset again.");
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(`${baseUrl}/api/recruiter/reset-password`, { email, newPassword: password, confirmPassword });
            console.log(response.data)

            setSuccessMessage("Password reset successfully. Redirecting...");
            setTimeout(() => {
                localStorage.removeItem("resetEmail");
                navigate("/RecruiterLogin");
            }, 2000);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }

    };

    return (


        <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center px-4">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="text-4xl md:text-4xl font-bold animate-bounce">
                        Welcome to <br />
                        <span className="text-blue-600 animate-bounce ">Our Platform</span>
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

                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-bold text-3xl text-blue-700">
                            <p>Change Password</p>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

                    <div>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">
                                        I accept the{" "}
                                        <a className="font-medium text-primary-600 hover:underline" href="#">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>




    );
};

export default ChangePassword;
