import { Download, Upload, Edit, Save, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { baseUrl } from '../../../utils/ApiConstants';

function JobDescAI({ jdData, fullJD, currentJdId, isTyping, showButtons, onDownload, onJDUpdate, loader, setLoader }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableJD, setEditableJD] = useState("");

    useEffect(() => {
        if (fullJD) {
            setEditableJD(fullJD);
        }
    }, [fullJD]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateClick = async () => {
        if (editableJD.trim() === "") {
            alert("Job description cannot be empty");
            return;
        }

        if (!currentJdId) {
            alert("No JD ID available for update");
            return;
        }

        setLoader(true);

        try {
            const token = localStorage.getItem("recruiterAuthToken");

            const res = await fetch(`${baseUrl}/api/jd/update/${currentJdId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullJD: editableJD
                })
            });

            const data = await res.json();
            console.log("res", data);

            if (res.ok) {
                onJDUpdate(editableJD);
                setIsEditing(false);
                alert("JD updated successfully!");
            } else {
                alert(data.message || "Error updating JD");
            }
        } catch (error) {
            console.error("Error updating JD:", error);
            alert("Error updating JD");
        } finally {
            setLoader(false);
        }
    };

    const handleCancelClick = () => {
        setEditableJD(fullJD); 
        setIsEditing(false);
    };

    const cleanJDText = (text) => {
        if (!text) return "";

        let lines = text.split('\n');
        return lines
            .map(line => {
                line = line.replace(/^#+\s*/, '');
                line = line.replace(/\*\*/g, '');
                line = line.replace(/^\s*\*\s+/, '• ');
                if (line.trim() === '---') return '';
                return line.trim();
            })
            .filter(line => line !== '')
            .join('\n');
    };


    return (
        <>
            <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] p-6 transition-shadow duration-300 h-full flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-100 pb-2">Job Description</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[100vh]">
                        {isEditing ? (
                            <textarea
                                value={editableJD}
                                onChange={(e) => setEditableJD(e.target.value)}
                                className="w-full h-full min-h-[500px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm leading-relaxed"
                                placeholder="Edit your job description here..."
                            />
                        ) : (
                            <>
                                {jdData && !isTyping && (
                                    <div className="prose prose-sm max-w-none font-sans text-sm leading-relaxed text-gray-700">
                                        {jdData}
                                    </div>
                                )}

                                {jdData && isTyping && (
                                    <div className="prose prose-sm max-w-none font-sans text-sm leading-relaxed text-gray-700">
                                        {jdData}
                                        <span className="animate-pulse">|</span>
                                    </div>
                                )}

                                {!jdData && !isTyping && (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <p>Job description will appear here after creation</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {showButtons && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className="flex flex-col gap-3">
                                {isEditing ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleUpdateClick}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
                                        >
                                            <Save className="w-4 h-4" />
                                            Update JD
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={onDownload}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download JD
                                        </button>
                                        <button
                                            onClick={handleEditClick}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit JD
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default JobDescAI