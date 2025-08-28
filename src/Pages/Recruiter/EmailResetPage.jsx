import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../Components/Images/Frame.png"
import axios from "axios"
import { baseUrl } from "../../utils/ApiConstants";


export default function EmailResetPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        try {
            const response = await axios.post(`${baseUrl}/api/recruiter/forgot-password`,{ email });
            console.log(response.data)

            localStorage.setItem("resetEmail", email);

            setSuccessMessage("An OTP has been sent to your email.");
            setTimeout(() => {
                navigate('/EmailOtpPage');
            }, 2000);
        } catch (err) {
            setError(err.message);
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

                    <div className="flex justify-center space-x-4 text-sm">
                        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Enter Your Email</h2>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                     {successMessage && <p className="text-green-500 text-sm text-center mb-4">{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                        >
                           {loading ? "Processing..." : "Submit"}
                        </button>
                    </form>

                </div>
            </div>
        </div>



    );
}
