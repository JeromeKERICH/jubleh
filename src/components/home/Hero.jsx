import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const slides = [
    {
      id: 1,
      title: "JUBLEH",
      highlight: "Home",
      description: "Where modern living meets timeless elegance",
      cta: "Discover Home",
      image: "/assets/7.jpg"
    },
    {
      id: 2,
      title: "JUBLEH",
      highlight: "Enterprise", 
      description: "Redefining workspace sophistication",
      cta: "Explore Business",
      image: "/assets/5.jpg"
    },
    {
      id: 3,
      title: "JUBLEH",
      highlight: "Collection",
      description: "Curated pieces for the discerning individual",
      cta: "View Collection", 
      image: "/assets/17.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const navigateSlide = (direction) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + direction + slides.length) % slides.length);
      setIsVisible(true);
    }, 300);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Background with Smooth Transition */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className={`text-center text-white transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          
          {/* Main Title with Highlight */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-2">
              {slides[currentSlide].title}
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-px bg-amber-400" />
              <span className="text-amber-400 text-lg md:text-xl font-light tracking-wider">
                {slides[currentSlide].highlight}
              </span>
              <div className="w-8 h-px bg-amber-400" />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-12 max-w-md mx-auto leading-relaxed font-light">
            {slides[currentSlide].description}
          </p>

          {/* CTA Button */}
          <Link to="/products" className="border border-amber-400 text-amber-400 px-8 py-3 rounded-sm font-light tracking-wide hover:bg-amber-400 hover:text-black transition-all duration-300">
            {slides[currentSlide].cta}
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        {/* Slide Indicators */}
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsVisible(true);
                }, 300);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-400' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigateSlide(-1)}
            className="text-white/60 hover:text-amber-400 transition-colors duration-300 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => navigateSlide(1)}
            className="text-white/60 hover:text-amber-400 transition-colors duration-300 p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;