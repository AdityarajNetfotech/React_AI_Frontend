import React from 'react'

const ResumeModal = ({ resume, onClose }) => {

    if (!resume) return null;


    return (
        <div className='fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50'>
            <div className='bg-white w-full max-w-xl mx-auto p-6 rounded-lg shadow-lg relative animate-fadeIn' >
                <button onClick={onClose}
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
                > ✖
                </button>

                <h2 className='text-2xl font-bold text-blue-700 mb-2'>Resume Summary</h2>
                <div className='mt-6'>
                    <p className='font-semibold text-gray-700 mb-2 text-lg'>Match Percentage</p>
                    <div className='w-full bg-gray-200 rounded-full h-4'>
                        <div className={`h-4 rounded-full ${resume.matchPercentage >= 75
                            ? "bg-green-500"
                            : resume.matchPercentage >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${resume.matchPercentage}%` }} />
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>{resume.matchPercentage}%</p>
                </div>

                <div className='mt-6'>
                    <p className="font-semibold text-gray-700 mb-2 text-lg">Key Matching skills</p>
                    <div className="flex flex-wrap gap-2">
                        {resume.keyMatchingSkills.map((skill, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold text-gray-700 mb-2 text-lg">Good Fit</p>
                    <p className="text-gray-600">{resume.goodFit}</p>
                </div>

                <div className="mt-6">
                    <p className="font-semibold text-gray-700 mb-2 text-lg">Reasoning</p>
                    <p className="text-gray-600">{resume.reasoning}</p>
                </div>

            </div>

        </div>
    )
}

export default ResumeModal
