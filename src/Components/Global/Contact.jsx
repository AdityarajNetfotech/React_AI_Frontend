import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
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
                        <form className="bg-white p-8 rounded-xl shadow-[0px_0px_8px_3px_rgba(0,_0,_0,_0.2)]">
                            <div className="mb-5">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                                <input
                                    type="text"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
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
