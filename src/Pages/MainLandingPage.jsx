import {
    BrainCircuit,
    Search,
    Handshake,
    Calendar,
    BarChart3,
    Mail,
    Phone,
    MessageSquare,
    Twitter,
    Instagram,
    Linkedin,
    UserCheck,
    PieChart,
    CalendarClock,
    FileSearch,
    Mic
} from 'lucide-react';

import { Brain, Monitor, Check, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import Footer from '../Components/Global/Footer';
import Contact from '../Components/Global/Contact';
import MainHeader from '../Components/Global/MainHeader';

const LandingPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const features = [
        {
            icon: <Search className="w-8 h-8" />,
            title: 'AI Resume Screening',
            description: 'Automatically analyze and rank candidates based on job requirements.'
        },
        {
            icon: <Handshake className="w-8 h-8" />,
            title: 'Smart Matching',
            description: 'Our algorithm finds the perfect candidate-job fit with 95% accuracy.'
        },
        {
            icon: <UserCheck className="w-8 h-8" />,
            title: 'Candidate Insights',
            description: 'Understand candidate behavior, engagement, and readiness with AI-driven insights.'
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: 'Advanced Analytics',
            description: 'Get actionable insights into your hiring pipeline and candidate quality.'
        }
    ];

    const steps = [
        {
            number: '1',
            title: 'Upload Job Details',
            description: 'Provide the job description and requirements.'
        },
        {
            number: '2',
            title: 'AI Processes Applications',
            description: 'Our system screens and ranks candidates automatically.'
        },
        {
            number: '3',
            title: 'Review Top Candidates',
            description: 'Get a shortlist of the best matches for your position.'
        }
    ];

    const testimonials = [
        {
            quote: "This platform reduced our hiring time by 70% and improved candidate quality significantly.",
            author: "Sarah Johnson",
            role: "HR Director, TechCorp",
            rating: 4.8,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            quote: "The AI matching is incredibly accurate. We've hired our best team members through this system.",
            author: "Michael Chen",
            role: "CEO, StartupX",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            quote: "As a small business, this gave us access to enterprise-level recruiting tools at an affordable price.",
            author: "Emma Rodriguez",
            role: "Founder, GreenSolutions",
            rating: 4.5,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            quote: "As a small business, this gave us access to enterprise-level recruiting tools at an affordable price.",
            author: "Emma Rodriguez",
            role: "Founder, GreenSolutions",
            rating: 4.5,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        }
    ];



    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="">
            <MainHeader />

            <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-cyan-100 overflow-hidden">
                <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-300 opacity-30 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-cyan-400 opacity-20 rounded-full filter blur-2xl"></div>

                <div className="relative container mx-auto flex flex-col-reverse md:flex-row items-center z-10">
                    <div className="md:w-1/2 text-center md:text-left mt-10 md:mt-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                            Hire Smarter{' '}
                            <span className="text-blue-600 relative inline-block after:block after:h-1 after:bg-blue-500 after:mt-1 after:w-0 hover:after:w-full after:transition-all after:duration-500">
                                with AI
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
                            Revolutionize your hiring process with our AI-powered platform. Find, match, and hire top talent faster than ever before.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:scale-105">
                                Get Started
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition duration-300 px-8 py-3 rounded-xl font-semibold shadow-sm hover:scale-105">
                                See Demo
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center">
                        <div className="text-center p-6 rounded-3xl">
                            <img src="https://www.eklavvya.com/wp-content/uploads/2023/10/video-interview.webp" alt="" />
                            <p className="mt-6 text-base">
                                Our intelligent system analyzes resumes, predicts candidate-job fit, and provides real-time hiring analytics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="container max-w-3xl mx-auto px-6">
                    <p className="text-center mb-8">
                        Trusted by leading companies worldwide
                    </p>

                    <marquee behavior="scroll" direction="left" scrollamount="6">
                        <div className="flex gap-12 items-center justify-center">
                            {[
                                "LinkedIn",
                                "Indeed",
                                "Glassdoor",
                                "Fast Company",
                                "Bloomberg",
                                "McKinsey",
                                "Sequoia Capital",
                                "Google for Startups",
                                "TechCrunch",
                                "MIT Technology Review"
                            ].map((company, index) => (
                                <span key={index} className="text-2xl font-bold text-gray-600 whitespace-nowrap">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </marquee>

                </div>
            </section>


            <section id="features" className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Powerful <span className="text-blue-600">AI Features</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform leverages cutting-edge artificial intelligence to streamline your hiring process.
                        </p>
                    </div>

                    <div className="grid cursor-default grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:ring-2 hover:ring-blue-400"
                            >
                                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section id="how-it-works" className="py-20 bg-gray-50 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Simple <span className="text-cyan-600">3-Step Process</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get started in minutes and transform your hiring today.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="group cursor-default flex-1 bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-cyan-500 transition-all duration-300 ease-in-out"
                            >
                                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center group-hover:text-cyan-600 transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-center">{step.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section>
                <div className="text-center pt-16 pb-12 px-4">
                    <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        Product Features
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Designed for <span className="text-blue-500">Success</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Our platform is built with cutting-edge technology to help both candidates and employers succeed.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-16">

                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <div className="bg-purple-500 p-3 rounded-xl mr-4">
                                    <FileSearch className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Smart</h3>
                                    <p className="text-gray-600">Resume Screening</p>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Automatically filter and shortlist candidates with AI that reads between the lines and understands real talent.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Contextual keyword analysis</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Skill and experience scoring</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Auto-rejection of irrelevant resumes</span>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-500 p-3 rounded-xl mr-4">
                                    <Mic className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">AI Interview</h3>
                                    <p className="text-gray-600">Automation</p>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our intelligent AI system conducts automated interviews to make the hiring process faster, unbiased, and more efficient.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Real-time video and voice analysis</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Instant scoring and feedback</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Pre-set questions for consistent evaluation</span>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-600 p-3 rounded-xl mr-4">
                                    <PieChart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Real-time</h3>
                                    <p className="text-gray-600">Analytics</p>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Make data-backed hiring decisions using deep insights on candidates, job roles, and funnel efficiency.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Hiring funnel drop-off tracking</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Candidate quality score</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">Role-based performance dashboards</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="">
                    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 py-8 rounded-xl max-w-6xl mx-auto text-center px-4">
                        <div className="flex justify-center items-center gap-4">
                            <span className="bg-orange-500 p-4 rounded-2xl">
                                <Rocket className="w-8 h-8 text-white" />
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Hire Better. Faster. Smarter.
                            </h2>
                        </div>

                        <p className="text-white text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            Discover a smarter way to recruit. Let UserPitch streamline your hiring process with intelligent matching, data-driven insights, and seamless automation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="bg-white hover:bg-gray-50 text-gray-700 px-[150px] py-3 rounded-xl font-semibold text-lg border border-gray-200 transition-colors duration-200 shadow-sm hover:shadow-md">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>

            </section>

            <section id="testimonials" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our <span className="text-blue-600">Clients Say</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Trusted by HR professionals and hiring managers across industries.
                        </p>
                    </div>

                    <div className="relative max-w-3xl mx-auto flex items-center">
                        <button
                            onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                            className="absolute left-0 -translate-x-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-blue-100 transition"
                        >
                            ‹
                        </button>

                        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg transition-all duration-500 ease-in-out transform hover:scale-[1.02] mx-8 flex flex-col justify-between h-[300px]"
                        >
                            <div className="flex justify-center mb-4">
                                <img
                                    src={testimonials[activeIndex].image}
                                    alt={testimonials[activeIndex].author}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>

                            <div className="flex justify-center mb-4 text-yellow-400 text-xl">
                                {'★'.repeat(testimonials[activeIndex].rating)}
                                {'☆'.repeat(5 - testimonials[activeIndex].rating)}
                            </div>

                            <p className="text-gray-700 italic text-center mb-6">
                                "{testimonials[activeIndex].quote}"
                            </p>
                            <div className="text-center">
                                <div className="font-bold text-gray-900">{testimonials[activeIndex].author}</div>
                                <div className="text-blue-600 text-sm">{testimonials[activeIndex].role}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                            className="absolute right-0 translate-x-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-blue-100 transition"
                        >
                            ›
                        </button>
                    </div>

                    <div className="flex justify-center mt-6 gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                                    }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </section>


            <Contact />

            <Footer />
        </div>
    );
};

export default LandingPage;