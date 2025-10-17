import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "JUBLEH HOME ESSENTIALS",
      subtitle: "Elevate Your Living Space",
      description: "Premium home essentials that blend style with functionality for modern living",
      cta: "Shop Home Essentials",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80",
      category: "home"
    },
    {
      id: 2,
      title: "JUBLEH ENTERPRISE SUPPLIES",
      subtitle: "Empower Your Business",
      description: "Professional workspace solutions designed for productivity and success",
      cta: "Explore Business Supplies",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "enterprise"
    },
    {
      id: 3,
      title: "JUBLEH COLLECTION",
      subtitle: "Express Your Style",
      description: "Curated fashion and lifestyle pieces that define contemporary elegance",
      cta: "Discover Fashion & Lifestyle",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "collection"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[500px] md:h-screen overflow-hidden">
      {/* Background Carousel */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-6">
            
          </div>

          {/* Main Title */}
          

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-amber-400 font-light mb-6">
            {slides[currentSlide].subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-amber-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-400/25">
              {slides[currentSlide].cta}
            </button>
            
          </div>
        </div>
      </div>

      
      

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-amber-400 scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce text-white/70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;