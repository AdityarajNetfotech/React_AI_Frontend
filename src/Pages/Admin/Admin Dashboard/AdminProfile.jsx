import React, { useState } from "react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Mohit Kumar",
    email: "admin@netfotech.com",
    phone: "+91 9876543210",
    username: "admin_mohit",
    password: "********",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Optionally: perform save logic here (e.g., API call)
      console.log("Saved data:", formData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 max-[555px]:p-5">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
          <img
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            src="https://i.pravatar.cc/300"
            alt="Admin Avatar"
          />
          <div className="mt-6 md:mt-0 text-center md:text-left">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-bold text-gray-800 bg-gray-100 rounded-md px-3 py-1 shadow-sm"
              />
            ) : (
              <h2 className="text-3xl font-extrabold text-gray-800">{formData.name}</h2>
            )}
            <p className="text-sm text-indigo-600 font-medium mt-1">Admin</p>
            <p className="text-sm text-gray-500 mt-1">Netfotech Solutions</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">📞 Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="truncate"> {formData.email} </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                 <div className="bg-gray-100 flex items-center p-3 rounded-md shadow-inner text-gray-800">
                  <span className="truncate"> {formData.phone} </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-6">🔐 Security</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 p-3 rounded-md shadow-inner text-gray-800">
                  {formData.username}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              {isEditing ? (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white border rounded-md px-3 py-2 shadow-sm"
                />
              ) : (
                <div className="bg-gray-100 p-3 rounded-md shadow-inner text-gray-800 tracking-wider">
                  ********
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={toggleEdit}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            {isEditing ? "💾 Save Changes" : "✏️ Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
