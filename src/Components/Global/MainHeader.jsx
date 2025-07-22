import React, { useState, useEffect } from 'react';
import { Brain, Menu, X } from 'lucide-react';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              AIRecruit
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-violet-600 transition-colors font-medium">Contact</a>
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block py-2 text-gray-700 hover:text-violet-600 transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-violet-600 transition-colors font-medium">How It Works</a>
            <a href="#testimonials" className="block py-2 text-gray-700 hover:text-violet-600 transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-violet-600 transition-colors font-medium">Contact</a>
            <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2.5 rounded-lg mt-3 font-medium shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainHeader;