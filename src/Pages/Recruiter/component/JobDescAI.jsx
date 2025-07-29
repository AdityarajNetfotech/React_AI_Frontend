import { Download, Upload } from 'lucide-react'
import React from 'react'

function JobDescAI({jdData, isTyping, showButtons, onDownload}) {
    return (
        <>
            <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(59,_130,_246,_0.5)] p-6 transition-shadow duration-300 h-full flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-100 pb-2">Job Description</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[100vh]">
                        {jdData && (
                            <div className="prose prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
                                    {jdData}
                                    {isTyping && <span className="animate-pulse">|</span>}
                                </pre>
                            </div>
                        )}

                        {!jdData && !isTyping && (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <p>Job description will appear here after creation</p>
                            </div>
                        )}
                    </div>



                    {showButtons && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onDownload}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
                                >
                                    <Download className="w-4 h-4" />
                                    Download JD
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default JobDescAI
