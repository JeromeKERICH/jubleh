import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await addToCart(product, 1);
    setTimeout(() => setAddingToCart(false), 500);
  };

  const isProductInCart = isInCart(product._id);
  const cartQuantity = getItemQuantity(product._id);

  // Safely get category name - handle both string and object formats
  const getCategoryName = () => {
    if (!product.category) return null;
    
    if (typeof product.category === 'string') {
      return product.category;
    }
    
    if (typeof product.category === 'object' && product.category.name) {
      return product.category.name;
    }
    
    return null;
  };

  const categoryName = getCategoryName();

  // Safely get product title/name
  const getProductTitle = () => {
    return product.title || product.name || 'Unnamed Product';
  };

  // Safely get product description
  const getProductDescription = () => {
    const desc = product.description || '';
    return desc.length > 80 ? `${desc.slice(0, 80)}...` : desc;
  };

  // Safely get product price
  const getProductPrice = () => {
    return product.price || 0;
  };

  // Safely get product stock
  const getProductStock = () => {
    return product.stock || 0;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img 
          src={product.images?.[0] || '/api/placeholder/300/300'} 
          alt={getProductTitle()} 
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Category Badge */}
        {categoryName && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="bg-black/80 text-amber-400 text-xs px-2 py-1 rounded-full font-medium">
              {categoryName}
            </span>
          </div>
        )}

        {/* Stock Status */}
        {getProductStock() === 0 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Product Title */}
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 leading-tight">
          {getProductTitle()}
        </h3>
        
        {/* Product Description */}
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
          {getProductDescription()}
        </p>

        {/* Price and Add to Cart - Responsive Layout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          {/* Price Section */}
          <div className="flex flex-col">
            <p className="font-bold text-amber-600 text-sm sm:text-xs">
              KES {getProductPrice().toLocaleString()}
            </p>
            {getProductStock() > 0 && getProductStock() <= 10 && (
              <p className="text-xs text-amber-600 font-medium">
                Only {getProductStock()} left!
              </p>
            )}
          </div>
          
          {/* Add to Cart Button - Responsive */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || getProductStock() === 0}
            className={`flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-sm min-w-0 ${
              isProductInCart
                ? "bg-amber-400 text-black hover:bg-amber-300"
                : getProductStock() === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            } ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {addingToCart ? (
              <>
                <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="whitespace-nowrap">Adding...</span>
              </>
            ) : isProductInCart ? (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="whitespace-nowrap">
                  In Cart <span className="hidden xs:inline">({cartQuantity})</span>
                </span>
              </>
            ) : getProductStock() === 0 ? (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="whitespace-nowrap">Out of Stock</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="whitespace-nowrap">Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          {product.featured && (
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="hidden xs:inline">Featured</span>
            </span>
          )}
          
          {getProductStock() > 10 && (
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs">In Stock</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}