import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../Components/Images/Frame.png"
import axios from "axios"
import { baseUrl } from "../../utils/ApiConstants";

const EmailOtpPage = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    
    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value.substring(0, 1); 
        setOtp(newOtp);

        
        if (value && index < otp.length - 1) {
            document.getElementById(`digit-${index + 1}`).focus();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            setError("Please enter a 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(`${baseUrl}/api/recruiter/verify-otp`, { otp: enteredOtp });

            console.log(response.data)

            setSuccessMessage("OTP verified successfully. Redirecting...");
            setTimeout(() => {
                navigate("/ChangePasswordPage");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
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

                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-bold text-3xl text-blue-700">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-row items-center justify-around mx-auto w-full max-w-xs">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`digit-${index}`}
                                            className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>

                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                                >
                                     {loading ? "Verifying..." : "Verify Account"}
                                </button>

                                <div className="flex flex-row items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                                    <p>Didn't receive code?</p>
                                    <button
                                        type="button"
                                        className="text-blue-600"
                                        onClick={() => window.location.reload()} // Reload to resend OTP
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>




    );
};

export default EmailOtpPage;
