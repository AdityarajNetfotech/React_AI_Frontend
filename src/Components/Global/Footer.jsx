import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">RecruitAI</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Smarter hiring with AI-powered interviews.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <p className="text-gray-500 text-sm">© 2025 RecruitAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
