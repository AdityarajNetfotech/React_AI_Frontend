import React, { useState } from "react";
import { User } from "lucide-react";
import axios from "axios";
import { baseUrl } from "../../utils/ApiConstants";
 
const EntryPage = ({ onContinue }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
 
  const handleSubmit = async() => {
    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Enter a valid email address");
      return;
    }
    try {
       const response = await axios.post(`${baseUrl}/api/jd/get-filteredCandidateByEmail`,{email})
     if(response.status === 200){
console.log("response aaya ----> ", response.data);
      const id = await response.data.filteredResumes[0]?._id;
      console.log("Here is your id--->",id);
      
       onContinue({ name, email, id });
       setErrorMsg("")
     }else if (response.status === 404){
      
     }
    } catch (error) {
      console.error("something went wrong", error)
      setErrorMsg(error.response.data.message)
    }
    
    
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-7 h-7 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">Enter Your Details</h1>
        </div>
 
        {errorMsg && (
          <div className="mb-4 text-red-600 font-medium">{errorMsg}</div>
        )}
 
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
 
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default EntryPage;