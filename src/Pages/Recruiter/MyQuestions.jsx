import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Pagination from "../../Components/Pagination/Pagination";
 
const MyQuestion = () => {
  const navigate = useNavigate();
 
  const [jdData, setJdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingQuestionId, setLoadingQuestionId] = useState(null);
 
  const itemsPerPage = 7;
 
  useEffect(() => {
    const fetchJDs = async () => {
      setLoading(true);
      setFetchError(null);
 
      try {
        const token = localStorage.getItem("recruiterAuthToken");
        if (!token) throw new Error("No token found. Please login again.");
 
        const res = await axios.get(
"http://localhost:5000/api/jd/get-all-jd-by-recruiter",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
 
        console.log("GET /get-all-jd-by-recruiter response:", res.data);
 
        const payload = res.data;
        let jds = [];
 
        if (Array.isArray(payload)) jds = payload;
        else if (Array.isArray(payload.data)) jds = payload.data;
        else if (Array.isArray(payload.jds)) jds = payload.jds;
else if (Array.isArray(payload.jobs)) jds = payload.jobs;
        else if (Array.isArray(payload.result)) jds = payload.result;
        else if (payload && payload.jd) {
          jds = Array.isArray(payload.jd) ? payload.jd : [payload.jd];
        } else {
          jds = [];
        }
 
        setJdData(jds);
      } catch (err) {
        console.error(err);
        setFetchError(err.response?.data?.message ?? err.message);
        setJdData([]); // ensure it's an array
      } finally {
        setLoading(false);
      }
    };
 
    fetchJDs();
  }, []);
 
  const totalPages = Math.ceil(jdData.length / itemsPerPage);
  const currentData = Array.isArray(jdData)
    ? jdData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
 
  const handleNavigate = async (jd) => {
    setLoadingQuestionId(jd._id);
    console.log("hard id-->", jd._id);
    
 
    try {
 
      const res = await axios.get(
`https://back-3-s1d4.onrender.com/api/hr/questions/${jd._id}`
      );
 
      console.log(`GET /questions/${jd.jobId} response:`, res.data);
 
      const payload = res.data;
      let questions = [];
 
      if (Array.isArray(payload)) questions = payload;
      else if (Array.isArray(payload.data)) questions = payload.data;
      else if (Array.isArray(payload.questions)) questions = payload.questions;
      else if (Array.isArray(payload.result)) questions = payload.result;
      else if (payload && payload.data?.questions)
        questions = payload.data.questions;
      else questions = [];
 
      const selected = { ...jd, questions };
      console.log("selected", selected);
      
      navigate("Questions",{state:{selected}});
    } catch (err) {
      console.error(err);
      alert(
          (err.response?.data?.detail ?? err.message)
      );
    } finally {
      setLoadingQuestionId(null);
    }
  };
 
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Question</h1>
 
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : fetchError ? (
        <div className="text-center py-10 text-red-500">{fetchError}</div>
      ) : jdData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No Job Descriptions found.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
            <table
              className="w-full table-auto text-sm"
              style={{ tableLayout: "fixed" }}
            >
              <thead className="bg-gray-50 text-gray-700 text-left">
                <tr>
                  <th className="px-6 py-3 w-1/4">Job ID</th>
                  <th className="px-6 py-3 w-1/4">Job Title</th>
                  <th className="px-6 py-3 w-1/4">Created On</th>
                  <th className="px-6 py-3 w-1/4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((jd) => (
                  <tr
                    key={jd.jobId ?? jd._id ?? JSON.stringify(jd)}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 truncate">
                      {jd.jobId ?? jd._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
{jd.jobTitle ?? jd.title ?? jd.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {(() => {
                        const rawDate =
                          jd.createdAt ||
                          jd.createdOn ||
                          jd.created_at ||
                          jd.created;
                        try {
                          return rawDate
                            ? new Date(rawDate).toLocaleDateString("en-IN")
                            : "-";
                        } catch {
                          return rawDate ?? "-";
                        }
                      })()}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleNavigate(jd)}
                        className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200"
                        disabled={loadingQuestionId !== null}
                      >
                        {loadingQuestionId === jd._id ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            <span>Loading</span>
                          </>
                        ) : (
                          "My Question"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page >= 1 && page <= totalPages) setCurrentPage(page);
            }}
          />
        </>
      )}
    </div>
  );
};
 
export default MyQuestion;