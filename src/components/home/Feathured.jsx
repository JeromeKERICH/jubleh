import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Fashion & Apparel",
      slug: "fashion-apparel",
      description: "Trendy clothing and accessories to elevate your everyday style",
      image: "assets/3.jpg",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Kitchen & Dining",
      slug: "kitchen-dining",
      description: "High-quality kitchen appliances and dining sets",
      image: "/assets/4.jpg",
      cta: "Explore Now"
    },
    {
      id: 3,
      title: "Commercial Equipment",
      slug: "commercial-equipment",
      description: "Robust equipment for businesses of all sizes",
      image: "/assets/2.jpg",
      cta: "View More"
    },
    {
      id: 4,
      title: "Office Supplies",
      slug: "office-supply",
      description: "Durable and functional office essentials",
      image: "/assets/5.jpg",
      cta: "Shop Now"
    },
    {
      id: 5,
      title: "Home Decor",
      slug: "home-decor",
      description: "Beautiful pieces to transform your living spaces",
      image: "/assets/6.jpg",
      cta: "Explore Now"
    },
    {
      id: 6,
      title: "Electronics",
      slug: "electronics",
      description: "Cutting-edge gadgets for work and play",
      image: "/assets/8.PNG",
      cta: "Shop Now"
    },
    {
      id: 7,
      title: "Outdoor & Garden",
      slug: "outdoor-garden",
      description: "Quality outdoor furniture and garden tools",
      image: "/assets/1.jpg",
      cta: "Explore Now"
    },
    {
      id: 8,
      title: "Bedding & Bath",
      slug: "bedding-and-bath",
      description: "Soft, high-quality essentials for a cozy home",
      image: "/assets/7.jpg",
      cta: "Shop Now"
    }
  ];
  

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Shop with us
          </h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            Curated categories for modern living
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
              <Link 
                to={`/category/${category.slug}`} 
                key={category.id}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer block"
              >
          
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
                {/* Title */}
                <h3 className="text-sm md:text-base font-medium mb-1 group-hover:text-amber-400 transition-colors duration-300">
                  {category.title}
                </h3>
                
                {/* Description - Hidden on mobile, shows on hover */}
                <p className="text-xs md:text-sm text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100 leading-relaxed">
                  {category.description}
                </p>

                {/* CTA Button - Shows on hover */}
                <button className="mt-2 bg-amber-400 text-black px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-amber-300">
                  {category.cta}
                </button>
              </div>

              {/* Border Effect */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-amber-400/30 rounded-lg transition-all duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/products" className="border border-amber-400 text-amber-400 px-8 py-3 rounded font-light hover:bg-amber-400 hover:text-black transition-all duration-300">
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;