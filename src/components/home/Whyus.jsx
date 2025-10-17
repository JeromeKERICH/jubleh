import React from 'react';

const BrandPromise = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Quality & Craftsmanship",
      description: "Every product is meticulously crafted with premium materials and exceptional attention to detail, ensuring lasting beauty and functionality.",
      gradient: "from-amber-400 to-amber-600"
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Delivery",
      description: "Experience swift nationwide delivery with real-time tracking. Your premium products arrive promptly, right when you need them.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1m6-8h.01M12 16h.01" />
        </svg>
      ),
      title: "Personalized Support",
      description: "Our dedicated team provides tailored assistance, helping you find the perfect solutions for your unique space and style preferences.",
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure Payments",
      description: "Shop with confidence using our bank-level encrypted payment system. Your financial information is always protected and secure.",
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <section className="py-5 sm:py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
            Why Choose Jubleh Haven
          </h2>
          <p className="text-l md:text-xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're committed to delivering exceptional experiences through quality craftsmanship, 
            reliable service, and personalized care that transforms your vision into reality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-500 border border-gray-700 hover:border-amber-400/30 hover:transform hover:scale-105"
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Icon Container */}
              <div className="relative mb-6">
               
                
                {/* Animation Line */}
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:w-full transition-all duration-700 delay-200"></div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              </div>

              {/* Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-400 text-black rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">1K+</div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">3+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-400/25">
            Experience the Difference
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;