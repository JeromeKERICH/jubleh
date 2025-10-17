import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      details: "+254 712 345 678",
      subtitle: "Mon-Fri from 8am to 5pm",
      action: "tel:+254700000000"
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      details: "info@jublehhaven.co.ke",
      subtitle: "We'll respond within 24 hours",
      action: "mailto:info@jublehhaven.co.ke"
    }
  ];

  const businessUnits = [
    {
      title: "Home Essentials",
      email: "homes@jublehhaven.co.ke",
      description: "For residential furniture and home decor inquiries"
    },
    {
      title: "Enterprise Supplies",
      email: "enterprise@jublehhaven.co.ke",
      description: "For corporate and business furniture solutions"
    },
    {
      title: "Jubleh Collection",
      email: "collection@jublehhaven.co.ke",
      description: "For fashion and lifestyle product inquiries"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4x font-semibold text-white mb-4 sm:mb-6">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">.We're here to assist you. Whether you have questions about our products, need support, or want to discuss a custom project, our team is ready to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Contact Methods & Info */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            
            {/* Contact Methods */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Contact Methods</h2>
              <div className="space-y-4 sm:space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-amber-400/10 rounded-lg sm:rounded-xl flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base truncate">
                        {method.title}
                      </h3>
                      <p className="text-amber-400 font-medium text-sm sm:text-base truncate">{method.details}</p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">{method.subtitle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Units */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Business Units</h2>
              <div className="space-y-4 sm:space-y-6">
                {businessUnits.map((unit, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/50 border border-gray-700">
                    <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{unit.title}</h3>
                    <a 
                      href={`mailto:${unit.email}`}
                      className="text-amber-400 hover:text-amber-300 transition-colors duration-200 block mb-2 text-sm sm:text-base truncate"
                    >
                      {unit.email}
                    </a>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{unit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Follow Us</h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {['Facebook', 'Instagram', 'LinkedIn'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="bg-gray-800 hover:bg-amber-400 hover:text-black text-gray-300 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-center font-medium transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Send us a Message</h2>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Fill out the form below and we'll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300 text-sm sm:text-base"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="products">Product Information</option>
                      <option value="order">Order Support</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="custom">Custom Project</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 text-black py-3 sm:py-4 px-6 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-400/25 text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Preview */}
            <div className="mt-6 sm:mt-8 bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Quick Answers</h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    q: "What are your delivery times?",
                    a: "Standard delivery takes 3-5 business days within Nairobi, 5-7 days nationwide."
                  },
                  {
                    q: "Do you offer installation services?",
                    a: "Yes, we provide professional installation for all furniture and enterprise solutions."
                  },
                  {
                    q: "Can I visit your showroom?",
                    a: "We do country wide delivery"
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3 sm:pb-4 last:border-b-0">
                    <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">{faq.q}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;