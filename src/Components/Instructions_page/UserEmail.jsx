import React, { useState } from "react";

export default function UserEmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please input name and email");
      return;
    }
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-10 rounded-2xl shadow-lg bg-white border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Enter Details
        </h1>

        <label htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition mb-3"
        />

        <label htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition mb-2"
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl px-4 py-3 font-semibold bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
