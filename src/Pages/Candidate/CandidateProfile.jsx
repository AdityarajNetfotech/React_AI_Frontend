import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaUser, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone, FiGlobe } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { RiBuilding4Line } from "react-icons/ri";
import { baseUrl } from "../../utils/ApiConstants";

const CandidateProfilePage = () => {
   
  // 👉 replace this with candidateId from context/auth
  
  const [candidateData, setCandidateData] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    linkedInProfile: "",
    skills: [],
    currentCTC: "",
    expectedCTC: "",
    relocation: "",
    currentLocation:"",
    noticePeriod:"",

  });

  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAdditional, setIsEditingAdditional] = useState(false);
  const [error, setError] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const getCandidateDetails = async() => {
    const token = localStorage.getItem('candidateAuthToken')
    console.log("token--->",token);
    
    try {
      const response = await axios.get(`${baseUrl}/api/candidate/getcandidate-profile`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if (response.status === 200 ){
        console.log(response.data.candidate);
        setCandidateData(response.data.candidate)
        setFormData({
           name: response.data.candidate.name,
    email: response.data.candidate.email,
    number: response.data.candidate.number,
    linkedInProfile: response.data.candidate.linkedInProfile,
    skills: response.data.candidate.candidateAdditiondetails.skills,
    currentCTC: response.data.candidate.candidateAdditiondetails.currentCTC,
    expectedCTC: response.data.candidate.candidateAdditiondetails.expectedCTC,
    relocation: response.data.candidate.candidateAdditiondetails.relocation,
    currentLocation:response.data.candidate.candidateAdditiondetails.currentLocation,
    noticePeriod:response.data.candidate.candidateAdditiondetails.noticePeriod,

        })
        
      }
    } catch (error) {
      console.error("something went wrong",error)
    }
  }

  useEffect(()=>{
getCandidateDetails()
  },[])


  

  // ====== API CALLS ======
  const handleSaveBasic = async () => {
    try {
      await axios.put(
        `${baseUrl}/api/candidate/update-candidate-basic-details/${candidateData._id}`,
        {
          name: formData.name,
          email: formData.email,
          number: formData.number,
          linkedInProfile: formData.linkedInProfile,
        }
      );
      setIsEditingBasic(false);
    } catch (err) {
      setError("Failed to update basic details");
    }
  };

  const handleSaveAdditional = async () => {
    try {
      await axios.put(
        `${baseUrl}/api/candidate/update-candidate-additional-details/${candidateData._id}`,
        {
          skills: formData.skills,
          currentCTC: formData.currentCTC,
          expectedCTC: formData.expectedCTC,
          currentLocation: formData.currentLocation,
          noticePeriod:formData.noticePeriod,
          relocation:formData.relocation

        }
      );
      setIsEditingAdditional(false);
    } catch (err) {
      setError("Failed to update additional details");
    }
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 max-[555px]:p-5">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
          <img
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            src="https://i.pravatar.cc/300"
            alt="User Avatar"
          />
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800">{formData.name}</h2>
            <p className="text-md text-indigo-600 font-medium mt-1">
              {formData.email}
            </p>
            <p className="text-md text-indigo-600 font-medium mt-1">
              {formData.number}
            </p>
            <p className="text-sm text-gray-500 mt-1">{formData.companyName}</p>
          </div>
        </div>

        {/* BASIC DETAILS */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">
             Personal & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              {isEditingBasic ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.name}
                  name="name"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <FaUser />
                  </span>
                  {formData.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              {isEditingBasic ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.email}
                  name="email"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <HiOutlineMail />
                  </span>
                  {formData.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              {isEditingBasic ? (
                <input
                  onChange={handleChange}
                  type="tel"
                  maxLength={10}
                  value={formData.number}
                  name="number"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <FiPhone />
                  </span>
                  {formData.number}
                </div>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                LinkedIn Profile
              </label>
              {isEditingBasic ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.linkedInProfile}
                  name="linkedInProfile"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <FaLinkedin />
                  </span>
                  {formData.linkedInProfile}
                </div>
              )}
            </div>
          </div>

          {/* Buttons for Basic */}
          <div className="mt-6 flex gap-3 justify-end">
            {!isEditingBasic ? (
              <button
                onClick={() => setIsEditingBasic(true)}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-300"
              >
                ✏️ Edit Basic
              </button>
            ) : (
              <button
                onClick={handleSaveBasic}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-700 transition duration-300"
              >
                💾 Save Basic
              </button>
            )}
            {isEditingBasic && (
              <button
                onClick={() => setIsEditingBasic(false)}
                className="px-6 py-2 bg-red-100 text-red-800 rounded-md shadow hover:bg-red-200 transition duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* ADDITIONAL DETAILS */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">
             Additional Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Resume */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Skills</label>
              {isEditingAdditional ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.skills}
                  name="skills"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <BsBuildings />
                  </span>
                  {formData.skills}
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Location</label>
              {isEditingAdditional ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.currentLocation}
                  name="currentLocation"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <FiGlobe />
                  </span>
                  {formData.currentLocation}
                </div>
              )}
            </div>

            {/* Current CTC */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Current CTC
              </label>
              {isEditingAdditional ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.currentCTC}
                  name="currentCTC"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <RiBuilding4Line />
                  </span>
                  {formData.currentCTC}
                </div>
              )}
            </div>

            {/* Expected CTC */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Expected CTC
              </label>
              {isEditingAdditional ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.expectedCTC}
                  name="expectedCTC"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <MdWorkOutline />
                  </span>
                  {formData.expectedCTC}
                </div>
              )}
            </div>

             <div>
              <label className="block text-sm text-gray-600 mb-1">
                Realocation
              </label>
              {isEditingAdditional ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.relocation}
                  name="relocation"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <MdWorkOutline />
                  </span>
                  {formData.relocation}
                </div>
              )}
            </div>

             <div>
              <label className="block text-sm text-gray-600 mb-1">
                Notice Period
              </label>
              {isEditingAdditional ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.noticePeriod}
                  name="noticePeriod"
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3">
                    <MdWorkOutline />
                  </span>
                  {formData.noticePeriod}
                </div>
              )}
            </div>
          </div>

          {/* Buttons for Additional */}
          <div className="mt-6 flex gap-3 justify-end">
            {!isEditingAdditional ? (
              <button
                onClick={() => setIsEditingAdditional(true)}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-300"
              >
                ✏️ Edit Additional
              </button>
            ) : (
              <button
                onClick={handleSaveAdditional}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-700 transition duration-300"
              >
                💾 Save Additional
              </button>
            )}
            {isEditingAdditional && (
              <button
                onClick={() => setIsEditingAdditional(false)}
                className="px-6 py-2 bg-red-100 text-red-800 rounded-md shadow hover:bg-red-200 transition duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
