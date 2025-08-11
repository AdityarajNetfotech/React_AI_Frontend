import React, { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";

const Questions = () => {
    const [selectedJD, setSelectedJD] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const jd = localStorage.getItem("selectedJD");
        if (jd) {
            setSelectedJD(JSON.parse(jd));
        }
    }, []);

    if (!selectedJD) {
        return (
            <div className="p-6 text-center text-lg font-semibold text-red-500 bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-md max-w-xl mx-auto mt-16 border border-red-200">
                ⚠ No Job Description selected!
            </div>
        );
    }

    const totalPages = Math.ceil(selectedJD.questions.length / itemsPerPage);
    const currentData = selectedJD.questions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    📋 Questions for{" "}
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                        {selectedJD.jobTitle}
                    </span>
                    <span className="text-gray-500 text-base ml-1 font-normal">
                        ({selectedJD.jobId})
                    </span>
                </h1>
                <div className="px-4 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold rounded-full shadow border border-indigo-200 text-sm">
                    Total: {selectedJD.questions.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-left border-b border-gray-200">
                        <tr>
                            <th className="px-5 py-2 w-[30%] font-semibold">Q. ID</th>
                            <th className="px-5 py-2 w-[70%] font-semibold">Question & Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((q) => (
                            <tr
                                key={q.id}
                                className="border-t hover:bg-gradient-to-r from-indigo-50 to-purple-50 transition-all duration-200"
                            >
                                <td className="px-5 py-3 font-medium text-indigo-600">{q.id}</td>
                                <td className="px-5 py-3 text-gray-700">
                                    <p className="font-semibold text-gray-900 mb-1">{q.question}</p>
                                    <ul className="list-disc ml-5 space-y-0.5">
                                        {q.options.map((opt, idx) => (
                                            <li
                                                key={idx}
                                                className={`${
                                                    opt === q.answer
                                                        ? "text-green-600 font-semibold"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {opt}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 inline-block px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200 shadow-sm">
                                        ✅ Correct: {q.answer}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        if (page >= 1 && page <= totalPages) {
                            setCurrentPage(page);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Questions;
