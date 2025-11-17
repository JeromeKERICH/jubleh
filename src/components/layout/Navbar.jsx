import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('nav')) {
        setIsMenuOpen(false);
        setIsHelpOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img className="h-6 w-auto" src="/assets/log1.png" alt="Jubleh Logo" />
              
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium">Home</Link>
            <Link to='/products' className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium">Products</Link>
            
            {/* Help Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium flex items-center space-x-1"
              >
                <span>Help</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Help Dropdown Menu */}
              {isHelpOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link 
                    to="/faq" 
                    className="block px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsHelpOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>FAQ & Help Center</span>
                    </div>
                  </Link>
                  
                  
                  
                  
                  
                  <Link 
                    to="/contact" 
                    className="block px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsHelpOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Contact Support</span>
                    </div>
                  </Link>
                  
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <a 
                      href="mailto:support@jublehhaven.co.ke"
                      className="block px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>support@jublehhaven.co.ke</span>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
            

          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-300 hover:text-amber-400 transition-colors duration-200 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5V21a1 1 0 001 1h4a1 1 0 001-1v-2.5" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <Link to="/cart" className="relative text-gray-300 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5V21a1 1 0 001 1h4a1 1 0 001-1v-2.5" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
                </span>
              )}
            </Link>

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
            <Link 
              to="/" 
              className="text-gray-300 hover:text-amber-400 transition-colors duration-200 py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/products" 
              className="text-gray-300 hover:text-amber-400 transition-colors duration-200 py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            
            {/* Mobile Help Section */}
            <div className="py-2">
              <div className="text-gray-300 font-medium mb-2">Help & Support</div>
              <div className="pl-4 space-y-2 border-l border-gray-600">
                <Link 
                  to="/faq" 
                  className="block text-gray-400 hover:text-amber-400 transition-colors py-1 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ & Help Center
                </Link>
                
                
                <Link 
                  to="/contact" 
                  className="block text-gray-400 hover:text-amber-400 transition-colors py-1 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Support
                </Link>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;