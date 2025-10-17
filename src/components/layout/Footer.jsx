import { HomeIcon, MessageCircleIcon, PhoneCallIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Overview */}
          <div className="lg:col-span-1">
            <img src="/assets/logo.PNG" alt="Jubleh Logo" className="h-10 mb-4" />
            <p className="text-gray-300 leading-relaxed">
              Transforming spaces, styles, and lifestyles with premium quality essentials 
              and curated collections for every aspect of modern living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          {/* Business Units */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4 text-lg">Business Units</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  JUBLEH HOME ESSENTIALS
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  JUBLEH ENTERPRISE SUPPLIES
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  JUBLEH COLLECTION
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Socials */}
          <div>
            <h4 className="text-amber-400 font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <span className="text-amber-400 mt-1">
                    <HomeIcon className="w-5 h-5" />
                </span>
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-400">
                    <MessageCircleIcon className="w-5 h-5" />
                </span>
                <a href="mailto:info@jublehhaven.co.ke" className="hover:text-amber-400 transition-colors duration-200">
                  info@jublehhaven.co.ke
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-400">
                    <PhoneCallIcon className="w-5 h-5" />
                </span>
                
                <a href="tel:+254700000000" className="hover:text-amber-400 transition-colors duration-200">
                  +254 7XX XXX XXX
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="text-amber-400 font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 12.017 0z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border & Copyright */}
        <div className="border-t border-amber-400/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} JUBLEH HAVEN. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;