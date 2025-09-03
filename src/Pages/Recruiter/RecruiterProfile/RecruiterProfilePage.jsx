import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone, FiGlobe } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { RiBuilding4Line } from "react-icons/ri";
import axios from "axios";
import { AuthContext } from '../../../Components/Context/RecruiterContext';
import { baseUrl } from '../../../utils/ApiConstants';



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


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }
  const token = localStorage.getItem("recruiterAuthToken");

  const { recruiterData } = useContext(AuthContext)

  console.log("RecruiterData from context Api", recruiterData)

  useEffect(() => {
    if (recruiterData) {
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
  }

  const handleSave = async () => {
    try {
      const response = await axios.put(`${baseUrl}/api/recruiter/update`, {
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
    } catch (error) {
      console.log("Error updating recruiter details:", error.response ? error.response.data : error.message);
      setError("Failed to update Recruiter Details")
    }

  }

  const handleCancel = () => {
    setIsEditing(false);
  }

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (

    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-10 px-4">
     <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 max-[555px]:p-5">

        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
          <img
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            src="https://i.pravatar.cc/300"
            alt="User Avatar"
          />
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800">{formData.name}</h2>
            <p className="text-md text-indigo-600 font-medium mt-1">{formData.designation}</p>
            <p className="text-sm text-gray-500 mt-1">{formData.companyName}</p>
          </div>
        </div>


        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">👤 Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.name}
                  name='name'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><FaUser /></span>
                  {formData.name}
                </div>

              )}


            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.email}
                  name='email'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><HiOutlineMail /></span>
                  <span className="truncate">{formData.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">📞 Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="tel"
                  maxLength={10}
                  value={formData.number}
                  name='number'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><FiPhone /></span>
                  {formData.number}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">LinkedIn Profile</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.linkedInProfile}
                  name='linkedInProfile'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><FaLinkedin /></span>
                  <span className="truncate">{formData.linkedInProfile}</span>

                </div>
              )}
            </div>
          </div>
        </div>


        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">🏢 Company Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Company Name</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.companyName}
                  name='companyName'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><BsBuildings /></span>
                  {formData.companyName}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Company Website</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.companyWebsite}
                  name='companyWebsite'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><FiGlobe /></span>
                  <span className="truncate">{formData.companyWebsite}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Industry</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.industry}
                  name='industry'

                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 p-3 flex items-center rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><RiBuilding4Line /></span>
                  {formData.industry}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Designation</label>
              {isEditing ? (
                <input
                  onChange={handleChange}
                  type="text"
                  value={formData.designation}
                  name='designation'
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 p-3 flex items-center rounded-md shadow-inner text-gray-800">
                  <span className="text-gray-400 text-lg mr-3"><MdWorkOutline /></span>
                  {formData.designation}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-300">
              ✏️ Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-700 transition duration-300">
              💾 Save Changes
            </button>
          )}

          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-red-100 text-red-800 rounded-md shadow hover:bg-red-200 transition duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>





  );
};

export default RecruiterProfilePage;

