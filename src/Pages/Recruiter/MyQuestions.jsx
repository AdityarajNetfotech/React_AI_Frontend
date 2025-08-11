import React, { useState } from "react";
import { useNavigate } from "react-router";
import Pagination from "../../Components/Pagination/Pagination";

const MyQuestion = () => {
    const navigate = useNavigate();

    const jdData = [
        {
            jobId: "687f78395eb49db9c41cc272",
            jobTitle: "Python Developer",
            createdOn: "2025-08-08",
            questions: [
                {
                    id: "ba6c2c0d-a60e-4499-904c-78ec9aefdd6f",
                    question: "Which programming language is primarily used in this Python developer role?",
                    options: ["Java", "C++", "Python", "JavaScript"],
                    answer: "Python"
                },
                {
                    id: "dcd8a1b6-f0c3-4101-94da-daa2955e211d",
                    question: "What area does the Python developer role focus on mainly?",
                    options: ["Mobile App Development", "UI/UX Design", "Web Development", "Data Analysis"],
                    answer: "Web Development"
                },
                {
                    id: "e1f4f7cf-e835-4c34-81ee-8b37b3f13a71",
                    question: "Which skill is least likely to be required in this Python developer role?",
                    options: ["HTML", "Python", "SQL", "Cascading Style Sheets (CSS)"],
                    answer: "UI/UX Design"
                },
                {
                    id: "a0afe8b3-6fae-4484-922b-84ffc0070063",
                    question: "The Python developer role requires a strong understanding of which data analysis tool?",
                    options: ["Microsoft Excel", "Power BI", "Tableau", "Pandas and NumPy libraries in Python"],
                    answer: "Pandas and NumPy libraries in Python"
                },
                {
                    id: "0dea43f5-7add-4b24-b744-22eda4a3ba7c",
                    question: "This Python developer role doesn't require expertise in which field?",
                    options: ["Data Visualization", "Front-end Development", "Data Cleaning", "Database Management"],
                    answer: "Front-end Development"
                },
                {
                    id: "02dc6029-16a2-416e-b4ae-f8c53f996a6e",
                    question: "In which programming language is this Python developer role likely to require fluency?",
                    options: ["JavaScript", "Python", "C++", "Java"],
                    answer: "Python"
                },
                {
                    id: "d81e9f70-4281-4dfc-82d3-e88e9a5362f4",
                    question: "What skill in the job summary suggests that this role may involve handling and analyzing data?",
                    options: ["Web Design", "Data Analysis", "Agile Methodologies", "Project Management"],
                    answer: "Data Analysis"
                },
                {
                    id: "f17136d6-e776-45dd-a754-9860084a5f30",
                    question: "Which technology area is a Python developer role in a company most likely to work with regarding web development?",
                    options: ["Frontend Development", "Backend Development", "Full Stack Development", "Mobile App Development"],
                    answer: "Backend Development"
                },
                {
                    id: "55a06899-be05-4c3d-bb68-39ed7f665a2d",
                    question: "True or False: A Python developer role may require knowledge of React, Angular, or Vue for the frontend development part of the job.?",
                    options: ["True", "False"],
                    answer: "False"
                },
                {
                    id: "eb7510f0-52aa-4889-a5a9-6651617b0ec0",
                    question: "What skill in the job summary suggests that this Python role may involve building web applications or services?",
                    options: ["Data Analysis", "Web Design", "Database Management", "Web Development"],
                    answer: "Web Development"
                },
                {
                    id: "537d32e7-a1b5-4f16-8484-981940ccceb1",
                    question: "Which of the following is a key responsibility mentioned in the Python developer job summary?",
                    options: ["Database administration", "Web development", "Graphic design", "Network security"],
                    answer: "Web development"
                },
                {
                    id: "d6bde7c6-9075-4d4c-95ca-7944fcb9c23c",
                    question: "What skill is required for the Python developer role according to the job summary?",
                    options: ["Mobile app testing", "Data analysis", "Video editing", "Cloud architecture"],
                    answer: "Data analysis"
                }
            ]
        },
        {
            jobId: "a92f1f39-5c3d-4f27-92c2-abc1d87e7f44",
            jobTitle: "Java Developer",
            createdOn: "2025-08-08",
            questions: [
                {
                    id: "b7123cc4-12d3-4c49-944d-4ffb5b9056f8",
                    question: "Which programming language is primarily used in this Java developer role?",
                    options: ["Java", "C#", "Python", "Go"],
                    answer: "Java"
                },
                {
                    id: "89c1b444-d3c6-4a8d-a6b0-f38a5fce3dfb",
                    question: "What type of applications are Java developers most commonly responsible for building?",
                    options: ["Web and Enterprise Applications", "Mobile Games", "Embedded Systems", "Blockchain Apps"],
                    answer: "Web and Enterprise Applications"
                },
                {
                    id: "a8d79cb4-38f2-4a87-932d-b3f5bbec0212",
                    question: "Which Java framework is often used for enterprise-level backend development?",
                    options: ["Spring", "Django", "Laravel", "Ruby on Rails"],
                    answer: "Spring"
                },
                {
                    id: "92a96a85-16a1-4e0e-b315-92b62b7b146b",
                    question: "True or False: Java developers commonly use MySQL or PostgreSQL for database management.",
                    options: ["True", "False"],
                    answer: "True"
                },
                {
                    id: "58cb6a4f-4f9c-41fb-9960-8f0ab12317d2",
                    question: "Which tool is commonly used for build automation in Java projects?",
                    options: ["Maven", "npm", "Webpack", "Gradle"],
                    answer: "Maven"
                }
            ]
        }
    ];


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(jdData.length / itemsPerPage);
    const currentData = jdData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNavigate = (jd) => {
        localStorage.setItem("selectedJD", JSON.stringify(jd));
        navigate("Questions");
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📁 My Question</h1>

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                <table className="w-full table-auto text-sm" style={{ tableLayout: "fixed" }}>
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
                            <tr key={jd.jobId} className="border-t hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">{jd.jobId}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">{jd.jobTitle}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(jd.createdOn).toLocaleDateString("en-IN")}
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleNavigate(jd)}
                                        className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200"
                                    >
                                        My Question
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
                    if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                    }
                }}
            />
        </div>
    );
};

export default MyQuestion;
