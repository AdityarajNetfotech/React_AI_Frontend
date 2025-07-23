import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone, FiGlobe } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { RiBuilding4Line } from "react-icons/ri";
import axios from "axios";
import { AuthContext } from '../../../Components/Context/RecruiterContext';



const RecruiterProfilePage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    companyName: "",
    companyWebsite: "",
    designation: "",
    industry: "",
    linkedInProfile: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }
  const token = localStorage.getItem("recruiterAuthToken");

  const { recruiterData } = useContext(AuthContext)

  console.log("RecruiterData from context Api", recruiterData)

  useEffect(() => {
    if(recruiterData) {
    setFormData({
      name: recruiterData.name,
      email: recruiterData.email,
      number: recruiterData.number,
      companyName: recruiterData.companyName,
      companyWebsite: recruiterData.companyWebsite,
      designation: recruiterData.designation,
      industry: recruiterData.industry,
      linkedInProfile: recruiterData.linkedInProfile,
    })
  }
  }, [recruiterData])

  if (!recruiterData)
    return <div className="text-center text-lg font-semibold">Loading...</div>;


  const handleEdit = () => {
    setIsEditing(true);
    setIsDisabled(false);
  }

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/recruiter/update", {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        designation: formData.designation,
        industry: formData.industry,
        linkedInProfile: formData.linkedInProfile
      },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Updated details:", response.data);
      setIsEditing(false);
      setIsDisabled(true);
    } catch (error) {
      console.log("Error updating recruiter details:", error.response ? error.response.data : error.message);
      setError("Failed to update Recruiter Details")
    }

  }

  const handleCancel = () => {
    setIsEditing(false);
    setIsDisabled(true);
  }

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100 py-10 px-4">
      <div className="absolute top-[-100px] left-[-100px]  h-[400px] bg-blue-300 opacity-30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] bg-cyan-400 opacity-20 rounded-full filter blur-2xl"></div>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 border-2 border-blue-600">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-700 text-center">Account Details</h2>
          <p className="text-sm text-gray-500 text-center mt-5">View and manage your recruiter information</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><FaUser /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.name}
                name='name'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><HiOutlineMail /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.email}
                name='email'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><FiPhone /></span>
              <input
                onChange={handleChange}
                type="tel"
                maxLength={10}
                value={formData.number}
                name='number'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Company Name</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><BsBuildings /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.companyName}
                name='companyName'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Company Website</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><FiGlobe /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.companyWebsite}
                name='companyWebsite'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>


          <div>
            <label className="text-sm text-gray-500">Designation</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><MdWorkOutline /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.designation}
                name='designation'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>


          <div>
            <label className="text-sm text-gray-500">Industry</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><RiBuilding4Line /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.industry}
                name='industry'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>


          <div>
            <label className="text-sm text-gray-500">LinkedIn Profile</label>
            <div className="mt-1 flex items-center border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              <span className="text-gray-400 text-lg mr-3"><FaLinkedin /></span>
              <input
                onChange={handleChange}
                type="text"
                value={formData.linkedInProfile}
                name='linkedInProfile'
                disabled={disabled}
                className="bg-transparent w-full text-gray-700 font-medium focus:outline-none cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          {!isEditing ? (<button
            onClick={handleEdit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Edit
          </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
          )}

          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
     
    </div>
    
    
  );
};

export default RecruiterProfilePage;

