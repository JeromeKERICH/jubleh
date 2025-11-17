import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/apiClient";
import { useCart } from "../context/CartContext";

export default function CategoryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        }, []);
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products?category=${slug}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "name":
        return (a.name || '').localeCompare(b.name || '');
      default:
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  const categoryName = slug ? slug.replace(/-/g, " ") : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4">
                  <div className="h-40 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 pb-12">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gray-700">Products</Link>
            <span>/</span>
            <span className="text-gray-900 capitalize">{categoryName}</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900 capitalize">
                {categoryName}
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">There are no products in this category yet.</p>
            <Link
              to="/products"
              className="inline-block bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map(product => (
              <div key={product._id} className="group">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <Link to={`/product/${product.slug || product._id}`}>
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={product.images?.[0] || '/api/placeholder/400/400'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-3">
                    <Link to={`/product/${product.slug || product._id}`}>
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        KES {(product.price || 0).toLocaleString()}
                      </span>
                      
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-black text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-800 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>

                    {product.stock === 0 && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More (if needed) */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-8">
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}