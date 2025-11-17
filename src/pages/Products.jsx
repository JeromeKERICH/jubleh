import { useEffect, useState } from "react";
import { api } from "../api/apiClient";
import ProductCard from "../components/products/ProductCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        const productsData = Array.isArray(res.data) ? res.data : 
                           Array.isArray(res.data.products) ? res.data.products : 
                           Array.isArray(res.data.data) ? res.data.data : [];
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract unique categories safely
  const categories = ["all", ...new Set(
    products
      .map(p => p?.category)
      .filter(cat => cat && typeof cat === 'string')
  )];

  // Filter and sort products safely
  const filteredProducts = products
    .filter(product => {
      if (!product || typeof product !== 'object') return false;
      return selectedCategory === "all" || product.category === selectedCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "name":
          return (a.name || '').localeCompare(b.name || '');
        default: // newest
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Skeleton Header */}
          <div className="animate-pulse mb-6">
            <div className="h-6 bg-gray-300 rounded w-40 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-56"></div>
          </div>
          
          {/* Skeleton Filters */}
          <div className="animate-pulse flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-300 rounded-full w-20"></div>
            ))}
          </div>

          {/* Skeleton Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-2 sm:p-3">
                <div className="h-32 sm:h-40 bg-gray-300 rounded mb-2 sm:mb-3"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded mb-1 sm:mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/4 mb-1 sm:mb-2"></div>
                <div className="h-4 sm:h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
      {/* Floating Cart Icon - Responsive */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-amber-400 hover:bg-amber-300 text-black p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-amber-400"
      >
        <div className="relative">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 13m-7.5 5.5V21a1 1 0 001 1h4a1 1 0 001-1v-2.5" />
          </svg>
          {getCartItemsCount() > 0 && (
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-black text-amber-400 text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold text-[10px] sm:text-xs border border-amber-400">
              {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
            </span>
          )}
        </div>
      </button>

      {/* Header Banner - Responsive */}
      <div className="bg-white text-black py-2 sm:py-3 border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              
            
              <div className="text-xs mt-1 text-amber-400">
                Free Shipping Over KES 10,000
              </div>
            </div>
            <div className="text-xs text-black rounded self-end sm:self-auto font-semibold">
              🔥 Hot Deals
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Breadcrumb and Results - Responsive */}
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <div className="mb-2 sm:mb-0">
            <nav className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
              <span>Home</span> &gt; <span>Products</span>
              {selectedCategory !== "all" && <span> &gt; <span className="text-gray-900 font-semibold">{selectedCategory}</span></span>}
            </nav>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              {selectedCategory === "all" ? "Our Products" : selectedCategory}
              <span className="text-xs sm:text-sm text-gray-500 font-normal ml-1 sm:ml-2">
                ({filteredProducts.length} products)
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label htmlFor="sort" className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent w-full sm:w-auto bg-white"
            >
              <option value="newest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Category Filters - Responsive */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/25"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
           All
            </button>
            {categories.filter(cat => cat !== "all").map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-amber-400 text-black shadow-md shadow-amber-400/25"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category.length > 12 ? `${category.substring(0, 12)}...` : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Responsive */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 sm:py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 px-4">Try selecting a different category or check back later.</p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="bg-amber-400 text-black px-4 sm:px-6 py-2 rounded-lg text-sm font-medium hover:bg-amber-300 transition-colors duration-200 shadow-sm"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product} 
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-6 sm:mt-8">
            <button className="bg-white border border-amber-400 text-amber-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors duration-200 shadow-sm">
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Trust Badges Footer - Responsive */}
      <div className="bg-white border-t border-gray-200 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}