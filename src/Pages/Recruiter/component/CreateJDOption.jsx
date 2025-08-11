import React from "react";
import { Sparkles, PenLine } from "lucide-react";
import { useNavigate } from "react-router";

function CreateJDOption () {
    const navigate = useNavigate();

    return ( 
        <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-lg p-12 bg-white rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">

                <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-pink-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>

                <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 mb-4">
                    Create Job Description
                </h2>
                <p className="text-center text-gray-500 mb-10 text-lg">
                    Choose the way you want to craft your next JD
                </p>

                <div className="space-y-5">
                    <button onClick={()=>navigate("/Recruiter-Dashboard/CreateJDOption/CreateJDAI")} className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:shadow-indigo-200 transform transition duration-300">
                        <Sparkles className="w-5 h-5" /> Create JD by AI
                    </button>
                    <button onClick={()=>navigate("/Recruiter-Dashboard/CreateJDOption/CreateJDManually")} className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold rounded-2xl shadow-md hover:scale-105 hover:shadow-gray-300 transform transition duration-300">
                        <PenLine className="w-5 h-5" /> Create JD Manually
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default CreateJDOption
