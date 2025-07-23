import React, { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import axios from "axios";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setError("");

        if (!formData.name || !formData.email || !formData.message) {
            setError("Please provide all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/getInTouch/message", formData);

            console.log(response.data)

            if (response.data && response.status === 201) {
                alert("Message Sent")
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            }

        } catch (error) {
            console.error("Error sending message", error);
            setError(
                error.response?.data?.message ||
                "Failed to send message. Please try again."
            );
        }
    }


    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-start">

                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            Have questions about our platform? Our team is here to help you find the right solution for your hiring needs.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white shadow-md p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-lg">Sales</div>
                                    <div className="text-blue-600">+1 (555) 123-4567</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white shadow-md p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-lg">Email</div>
                                    <div className="text-blue-600">hello@recruitai.com</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white shadow-md p-3 rounded-full">
                                    <MessageSquare className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-lg">Live Chat</div>
                                    <div className="text-blue-600">Available 24/7</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 w-full">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-[0px_0px_8px_3px_rgba(0,_0,_0,_0.2)]">
                            <div className="mb-5">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    id="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
