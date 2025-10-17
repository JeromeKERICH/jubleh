import React from 'react';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Fashion & Apparel",
      subtitle: "Stylish Living",
      description: "Trendy clothing and accessories to elevate your everyday style",
      image: "assets/3.jpg",
      gradient: "from-blue-500/20 to-purple-600/20",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Kitchen & Dining",
      subtitle: "Culinary Elegance",
      description: "High-quality kitchen appliances and dining sets for gourmet experiences",
      image: "/assets/4.jpg",
      gradient: "from-amber-500/20 to-orange-600/20",
      cta: "Explore Now"
    },
    {
      id: 3,
      title: "Commercial Equipment",
      subtitle: "Machinery & Tools",
      description: "Robust commercial equipment for businesses of all sizes",
      image: "/assets/2.jpg",
      gradient: "from-emerald-500/20 to-teal-600/20",
      cta: "View More"
    },
    {
      id: 4,
      title: "Office Supplies",
      subtitle: "Workspace Essentials",
      description: "Durable and functional office supplies to enhance productivity",
      image: "/assets/5.jpg",
      gradient: "from-slate-500/20 to-gray-600/20",
      cta: "Shop Now"
    }, 
    {
        id: 5,
        title: "Home Decor",
        subtitle: "Elegant Interiors",
        description: "Beautiful decor pieces to transform your living spaces",
        image: "/assets/6.jpg",
        gradient: "from-pink-500/20 to-red-600/20",
        cta: "Explore Now"
    }, 

    {
        id: 6,
        title: "Electronics",
        subtitle: "Latest Gadgets",
        description: "Cutting-edge electronics for work and play",
        image: "/assets/8.PNG",
        gradient: "from-cyan-500/20 to-blue-600/20",
        cta: "Shop Now"
    }, 
    {
        id: 7,
        title: "Outdoor & Garden",
        subtitle: "Nature's Touch",
        description: "Quality outdoor furniture and garden tools for your green space",
        image: "/assets/1.jpg",
        gradient: "from-lime-500/20 to-green-600/20",
        cta: "Explore Now"
    }, 
    {
        id: 8,
        title: "Bedding & Bath",
        subtitle: "Comfort & Luxury",
        description: "Soft, high-quality bedding and bath essentials for a cozy home",
        image: "/assets/7.jpg",
        gradient: "from-purple-500/20 to-pink-600/20",
        cta: "Shop Now"
    }
  ];

  return (
    <section className="py-5 sm:py-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Featured Collections
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Discover our curated categories designed to elevate every aspect of your lifestyle
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative h-60 sm:h-86 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-70 sm:opacity-80 sm:group-hover:opacity-60 transition-opacity duration-500`}></div>
                
                {/* Dark Overlay - More visible on mobile */}
                <div className="absolute inset-0 bg-black/50 sm:bg-black/40 sm:group-hover:bg-black/20 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8 text-white">
                {/* Title - Always Visible */}
                <div className="transform transition-all duration-500 sm:group-hover:-translate-y-2">
                  <h3 className="text-l sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  {/* Subtitle - Always visible on mobile, animated on desktop */}
                  <div className="overflow-hidden">
                    <p className="text-black-400 font-semibold text-sm sm:text-lg transform sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-200">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description - Always visible on mobile, animated on desktop */}
                

                {/* CTA Button - Always visible on mobile, animated on desktop */}
                <div className="overflow-hidden mt-3 sm:mt-6">
                  <button className="bg-amber-400 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transform sm:translate-y-12 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-400 hover:bg-amber-300 hover:scale-105 w-full sm:w-auto">
                    {category.cta}
                  </button>
                </div>

                {/* Hover Border Effect - Desktop only */}
                <div className="absolute inset-0 border-2 border-transparent sm:group-hover:border-amber-400/50 rounded-xl sm:rounded-2xl transition-all duration-500 sm:group-hover:scale-[1.02]"></div>
              </div>

              {/* Shine Effect - Desktop only */}
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Mobile Touch Indicator */}
              <div className="sm:hidden absolute top-4 right-4 bg-amber-400/20 backdrop-blur-sm rounded-full p-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <button className="border-2 border-amber-400 text-amber-400 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-amber-400 hover:text-black transition-all duration-300 transform hover:scale-105">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;