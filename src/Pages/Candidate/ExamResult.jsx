import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExamResult = () => {
  const navigate = useNavigate();

  const [candidateResults, setCandidateResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [candidateEmail, setCandidateEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidateResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("candidateAuthToken");
        if (!token) throw new Error("No token found");

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const email = decodedToken.id?.email || decodedToken.email;
        setCandidateEmail(email);
        console.log("Decoded Email:", email);

        const res = await axios.get(
          `https://kshitij-11.onrender.com/candidate_results?email=${encodeURIComponent(email)}`
        );

        console.log("API Response:", res.data);
        setCandidateResults(res.data || []);
      } catch (err) {
        console.error("Error fetching candidate results:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateResults();
  }, []);

  const formatValue = (value) => {
    return value !== null && value !== undefined ? value : 'N/A';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: 'N/A', time: 'N/A' };
    const date = new Date(dateString);

    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return { date: dateStr, time: timeStr };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading exam results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Results</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Exam Results</h1>
            <p className="text-indigo-100 text-lg">
              <span className="font-medium">Candidate:</span> {candidateEmail}
            </p>
          </div>
        </div>

        {candidateResults.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exam results found</h3>
            <p className="text-gray-600">No results found for this candidate.</p>
          </div>
        ) : (
          <>
            {/* Summary Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {candidateResults.length}
                  </div>
                  <div className="text-sm text-blue-700">Total Exams</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {candidateResults.filter(r => r.status?.toLowerCase() === 'pass').length}
                  </div>
                  <div className="text-sm text-green-700">Passed</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {candidateResults.filter(r => r.status?.toLowerCase() === 'fail').length}
                  </div>
                  <div className="text-sm text-red-700">Failed</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {candidateResults.filter(r => r.status?.toLowerCase() === 'pending').length}
                  </div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Exam Results</h2>
                <p className="text-sm text-gray-600 mt-1">Total Exams: {candidateResults.length}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Job Info
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Max Score
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Monitoring
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {candidateResults.map((result, index) => {
                      const { date, time } = formatDateTime(result.evaluated_at);
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {result.jobTitle || 'Job Title N/A'}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {result.jd_id ? result.jd_id.substring(0, 8) + '...' : 'N/A'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-600">{date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-600">{time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {result.score}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm text-gray-600">
                              {result.maxScore}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.percentage >= 70 ? 'bg-green-100 text-green-800' :
                                  result.percentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {result.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="grid grid-cols-1 gap-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Face Issues:</span>
                                <span className={`ml-2 px-2 py-0.5 rounded ${result['face not visible'] > 10
                                    ? 'bg-red-100 text-red-800'
                                    : result['face not visible'] > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}>
                                  {result['face not visible']}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Tab Switches:</span>
                                <span className={`ml-2 px-2 py-0.5 rounded ${result['tab switches'] > 5
                                    ? 'bg-red-100 text-red-800'
                                    : result['tab switches'] > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'}`}>
                                  {result['tab switches']}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">Inactivities:</span>
                                <span className={`ml-2 px-2 py-0.5 rounded ${result.inactivities > 5
                                    ? 'bg-red-100 text-red-800'
                                    : result.inactivities > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}>
                                  {result.inactivities}
                                </span>
                              </div>
                              {result.copies !== null && (
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Copies:</span>
                                  <span className={`ml-2 px-2 py-0.5 rounded ${result.copies > 0
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-green-100 text-green-800'
                                    }`}>
                                    {result.copies}
                                  </span>
                                </div>
                              )}
                              {result.pastes !== null && (
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Pastes:</span>
                                  <span className={`ml-2 px-2 py-0.5 rounded ${result.pastes > 0
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-green-100 text-green-800'
                                    }`}>
                                    {result.pastes}
                                  </span>
                                </div>
                              )}
                              {result['right clicks'] !== null && (
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Right Clicks:</span>
                                  <span className={`ml-2 px-2 py-0.5 rounded ${result['right clicks'] > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                    }`}>
                                    {result['right clicks']}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExamResult;