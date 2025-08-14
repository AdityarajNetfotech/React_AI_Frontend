import React from "react";

const NewRegisterAdmin = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border-2 border-blue-300">
        
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Register Admin
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name*
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              type="email"
              placeholder="Enter Your email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Mobile Number*
            </label>
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter Your mobile number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password*
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
            px-5 py-2.5 mt-4 text-center transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRegisterAdmin;
