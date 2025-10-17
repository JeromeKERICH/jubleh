import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-8 w-auto" src="/assets/logo.PNG" alt="Jubleh Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium">Home</a>

            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center">
                Our Categories
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors">Classy Home Essentials</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors">Enterprise Supplies</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors">Collection</a>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium">Contact</Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <button className="relative text-gray-300 hover:text-amber-400 transition-colors duration-200 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5V21a1 1 0 001 1h4a1 1 0 001-1v-2.5" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">0</span>
            </button>
            
            {/* Login Button */}
            <button className="bg-amber-400 text-black px-4 py-2 rounded-md hover:bg-amber-300 transition-colors duration-200 font-medium text-sm">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <button className="relative text-gray-300 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5V21a1 1 0 001 1h4a1 1 0 001-1v-2.5" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">0</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-amber-400 transition-colors duration-200 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-3 border-t border-gray-700 pt-4">
            <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 py-2 font-medium">Home</Link>
           
            
            {/* Mobile Categories */}
            <div className="py-2">
              <div className="text-gray-300 font-medium mb-2">Our Categories</div>
              <div className="pl-4 space-y-2 border-l border-gray-600">
                <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors py-1 text-sm">Classy Home Essentials</a>
                <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors py-1 text-sm">Enterprise Supplies</a>
                <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors py-1 text-sm">Collection</a>
              </div>
            </div>
            
            <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 py-2 font-medium">Contact</Link>
            
            {/* Mobile Login Button */}
            <button className="bg-amber-400 text-black px-4 py-2 rounded-md hover:bg-amber-300 transition-colors duration-200 font-medium text-sm mt-2 w-full">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;